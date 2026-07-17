import json, re, unicodedata
from collections import Counter, defaultdict

with open('/projects/sandbox/data/respaldo-inventario.json', encoding='utf-8') as f:
    data = json.load(f)

products = data['products']
print(f"TOTAL PRODUCTOS: {len(products)}\n")

# --- Categorias tal cual ---
cats = Counter(p.get('category','') for p in products)
print("=== CATEGORIAS (crudas) ===")
for c, n in sorted(cats.items(), key=lambda x: (-x[1], x[0])):
    label = repr(c) if c.strip()=='' or c!=c.strip() else c
    print(f"  {n:3d}  {label}")

# --- Normalizacion de categorias (detectar variantes) ---
def norm(s):
    s = (s or '').strip().lower()
    s = ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
    return s

groups = defaultdict(list)
for c in cats:
    groups[norm(c)].append(c)
print("\n=== VARIANTES DE CATEGORIA (mismo concepto, distinta escritura) ===")
for k, vs in groups.items():
    if len(set(vs)) > 1:
        print(f"  {k!r} -> {sorted(set(vs))}")

# --- Categorias vacias ---
print("\n=== PRODUCTOS SIN CATEGORIA ===")
for p in products:
    if not (p.get('category') or '').strip():
        print(f"  {p['id']}  {p['name']!r}  price={p['price']}")

# --- Precios sospechosos ---
print("\n=== PRECIOS SOSPECHOSOS (muy altos/bajos/atipicos) ===")
prices = [p['price'] for p in products]
for p in products:
    pr = p['price']
    flag = []
    if pr >= 50000: flag.append("MUY ALTO")
    if pr < 3000: flag.append("MUY BAJO")
    if pr % 100 != 0 and pr % 10 != 0: flag.append("no redondo")
    if flag:
        print(f"  {pr:>7}  [{', '.join(flag)}]  {p['name']!r}")

# --- Nombres duplicados (normalizados) ---
print("\n=== POSIBLES NOMBRES DUPLICADOS (normalizados) ===")
name_groups = defaultdict(list)
def normname(s):
    s = norm(s)
    s = re.sub(r'[“”"\'\(\)]', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s
for p in products:
    name_groups[normname(p['name'])].append(p)
for k, ps in name_groups.items():
    if len(ps) > 1:
        print(f"  '{k}':")
        for p in ps:
            print(f"      {p['id']}  {p['name']!r}  cat={p['category']!r} price={p['price']}")

# --- Stock ---
agotados = [p for p in products if p['qty'] <= 0]
print(f"\n=== STOCK ===")
print(f"  Agotados (qty=0): {len(agotados)}")
for p in agotados:
    print(f"      {p['name']!r}")

# --- Resumen categorias normalizadas propuestas ---
print("\n=== CONTEO POR CATEGORIA NORMALIZADA (propuesta) ===")
canon = {}
mapping = {
    'crema':'Cremas', 'cremas':'Cremas',
    'colonia':'Colonias', 'colonias':'Colonias',
    'accesorio':'Accesorios', 'accesorios':'Accesorios',
}
def canonical(c):
    n = norm(c)
    if n in mapping: return mapping[n]
    if not c.strip(): return 'Otros'
    return c.strip().capitalize() if c.strip().islower() else c.strip()
cc = Counter(canonical(p['category']) for p in products)
for c, n in sorted(cc.items(), key=lambda x:(-x[1],x[0])):
    print(f"  {n:3d}  {c}")
print(f"\n  Total categorias canonicas: {len(cc)}")
