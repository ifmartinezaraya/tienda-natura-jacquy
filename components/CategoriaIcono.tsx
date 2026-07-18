// Icono minimalista (line-art) segun la categoria.
// Mismo estilo para todas; cambia el motivo por categoria.

function paths(nombre: string) {
  switch (nombre) {
    case 'Colonias':
      return (
        <>
          <rect x="7.5" y="9" width="9" height="12" rx="2" />
          <path d="M10 9V6.5h4V9" />
          <path d="M10.5 4.5h3" />
        </>
      );
    case 'Perfumeria':
      return (
        <>
          <rect x="6.5" y="10" width="8" height="11" rx="2" />
          <path d="M8.5 10V7.5h4V10" />
          <path d="M9 5.5h3" />
          <path d="M17 7l2-1M17.5 9.5h2.5M17 12l2 1" />
        </>
      );
    case 'Fragancias':
      return (
        <>
          <rect x="7" y="10" width="8" height="11" rx="2" />
          <path d="M9 10V7.5h4V10" />
          <path d="M9.5 5.5h3" />
          <path d="M18 7h.01M19.5 9h.01M18 11h.01" />
        </>
      );
    case 'Jabones':
      return (
        <>
          <rect x="4.5" y="11" width="11" height="7" rx="2" />
          <path d="M17.5 9h.01M19.5 11h.01M18.5 13h.01" />
        </>
      );
    case 'Cremas':
      return (
        <>
          <rect x="7" y="6.5" width="10" height="3" rx="1" />
          <rect x="6" y="9.5" width="12" height="10" rx="2" />
        </>
      );
    case 'Repuestos':
      return (
        <>
          <path d="M8 8h8l-1 12H9z" />
          <path d="M10 8V6h4v2" />
        </>
      );
    case 'Cabello':
      return (
        <>
          <path d="M5 8.5h14v3H5z" />
          <path d="M7 11.5v6M10 11.5v6M13 11.5v6M16 11.5v6" />
        </>
      );
    case 'Shampoo':
      return (
        <>
          <rect x="8" y="9" width="8" height="12" rx="2" />
          <path d="M10 9V7h3v2" />
          <path d="M13 5h3v2" />
        </>
      );
    case 'Desodorantes':
      return (
        <path d="M8.5 9a3.5 3.5 0 0 1 7 0v10a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z" />
      );
    case 'Maquillaje':
      return (
        <>
          <rect x="9" y="12" width="6" height="9" rx="1" />
          <path d="M9 12V8l3-3 3 3v4" />
        </>
      );
    case 'Cuerpo':
      return (
        <>
          <path d="M9 8.5C9 7 15 7 15 8.5V21H9z" />
          <path d="M9.5 6.5h5" />
          <path d="M9 12.5h6" />
        </>
      );
    case 'Aceites':
      return (
        <path d="M12 3.5s5.5 6.5 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 10 12 3.5 12 3.5z" />
      );
    case 'Cuidado Facial':
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M9.5 14.5c1.3 1.2 3.7 1.2 5 0" />
          <path d="M9.5 10h.01M14.5 10h.01" />
        </>
      );
    case 'Accesorios':
      return (
        <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" />
      );
    default:
      return (
        <>
          <path d="M12 21V8" />
          <path d="M12 12c0-2.4 1.9-4.3 4.3-4.3C16.3 10.1 14.4 12 12 12z" />
          <path d="M12 9c0-2.4-1.9-4.3-4.3-4.3C7.7 7.1 9.6 9 12 9z" />
        </>
      );
  }
}

export function CategoriaIcono({
  nombre,
  color,
  size = 22,
  strokeWidth = 1.5,
}: {
  nombre: string;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths(nombre)}
    </svg>
  );
}
