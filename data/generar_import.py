import json, csv, unicodedata

with open('/projects/sandbox/data/respaldo-inventario.json', encoding='utf-8') as f:
    data = json.load(f)
products = data['products']

def norm(s):
    s = (s or '').strip().lower()
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

# Mapa de categoria cruda -> categoria canonica (nombre bonito para mostrar)
CAT_MAP = {
    'jabon': 'Jabones',
    'crema': 'Cremas',
    'cremas': 'Cremas',
    'repuesto': 'Repuestos',
    'cabello': 'Cabello',
    'shampoo': 'Shampoo',
    'desodorante': 'Desodorantes',
    'colonia': 'Colonias',
    'colonias': 'Colonias',
    'fragancia': 'Fragancias',
    'maquillaje': 'Maquillaje',
    'cuerpo': 'Cuerpo',
    'perfumeria': 'Perfumeria',
    'aceites': 'Aceites',
    'skincare': 'Cuidado Facial',
    'accesorio': 'Accesorios',
    'accesorios': 'Accesorios',
    '': 'Jabones',   # unico producto sin categoria es un jabon en barra
}

def categoria(p):
    return CAT_MAP.get(norm(p.get('category','')), 'Otros')

def sql_str(s):
    return "'" + str(s).replace("'", "''") + "'"

rows = []
for p in products:
    rows.append({
        'legacy_id': p['id'],
        'nombre': p['name'].strip(),
        'categoria': categoria(p),
        'precio': int(p['price']),
        'stock': int(p['qty']),
        'min_stock': int(p.get('minStock', 1)),
        'activo': True,
    })

# ---------- SQL ----------
lines = []
lines.append("-- ============================================================")
lines.append("--  IMPORTACION DE PRODUCTOS - TIENDA NATURA JACQUY")
lines.append(f"--  {len(rows)} productos. Ejecutar DESPUES de 01_schema.sql")
lines.append("--  Categorias normalizadas. Precios preservados tal cual del respaldo.")
lines.append("-- ============================================================")
lines.append("")
lines.append("insert into public.productos (legacy_id, nombre, categoria, precio, stock, min_stock, activo, descripcion) values")
values = []
for r in rows:
    values.append(
        f"  ({sql_str(r['legacy_id'])}, {sql_str(r['nombre'])}, {sql_str(r['categoria'])}, "
        f"{r['precio']}, {r['stock']}, {r['min_stock']}, {str(r['activo']).lower()}, '')"
    )
lines.append(",\n".join(values))
lines.append("on conflict (legacy_id) do update set")
lines.append("  nombre = excluded.nombre,")
lines.append("  categoria = excluded.categoria,")
lines.append("  precio = excluded.precio,")
lines.append("  stock = excluded.stock,")
lines.append("  min_stock = excluded.min_stock;")
lines.append("")

with open('/projects/sandbox/supabase/02_import_productos.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

# ---------- CSV ----------
with open('/projects/sandbox/supabase/productos.csv', 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['legacy_id','nombre','descripcion','precio','categoria','stock','min_stock','activo'])
    for r in rows:
        w.writerow([r['legacy_id'], r['nombre'], '', r['precio'], r['categoria'], r['stock'], r['min_stock'], 'true'])

# Resumen
from collections import Counter
cc = Counter(r['categoria'] for r in rows)
print(f"Generados {len(rows)} productos")
print("Categorias finales:")
for c,n in sorted(cc.items(), key=lambda x:(-x[1],x[0])):
    print(f"  {n:3d}  {c}")
print("Total categorias:", len(cc))
