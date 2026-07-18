import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Política de privacidad · ${STORE_NAME}` };

export default function PrivacidadPage() {
  return (
    <PaginaContenido
      titulo="Política de privacidad"
      bajada="Cómo tratamos y protegemos tus datos personales, conforme a la ley chilena."
    >
      <p>
        <strong>Aviso:</strong> documento elaborado conforme a la Ley N&deg;
        19.628 sobre Protección de la Vida Privada y a la Ley N&deg; 21.719 que
        moderniza el régimen de protección de datos en Chile. Tiene carácter
        informativo y no constituye asesoría legal; ante situaciones
        particulares, recomendamos consultar a un(a) profesional.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es {STORE_NAME}:
      </p>
      <ul>
        <li>Nombre: Ignacio Martínez Araya</li>
        <li>RUT: 20.776.107-9</li>
        <li>Domicilio: Williamson 392</li>
        <li>Correo para asuntos de datos: ifmartinezaraya@gmail.com</li>
      </ul>

      <h2>2. Datos que tratamos</h2>
      <ul>
        <li>Datos de identificación y contacto: nombre y número de teléfono.</li>
        <li>Datos del pedido: productos, cantidades, montos y fecha.</li>
        <li>Datos de entrega: dirección u otra información que nos entregues para coordinar el despacho.</li>
        <li>Comunicaciones que mantengas con nosotros (por ejemplo, por WhatsApp).</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <ul>
        <li>Gestionar, procesar y coordinar tus pedidos y su entrega.</li>
        <li>Comunicarnos contigo respecto de tu compra y responder consultas.</li>
        <li>Cumplir obligaciones legales, tributarias y contables.</li>
        <li>Enviarte novedades, ofertas o promociones, únicamente si nos autorizas.</li>
      </ul>

      <h2>4. Base de licitud</h2>
      <p>
        Tratamos tus datos sobre la base de tu consentimiento, de la ejecución de
        la relación de compra que solicitas y del cumplimiento de obligaciones
        legales. El envío de comunicaciones comerciales se realiza solo con tu
        autorización previa, la que puedes revocar en cualquier momento.
      </p>

      <h2>5. Comunicación de datos a terceros</h2>
      <p>
        No vendemos ni comercializamos tus datos. Solo los comunicamos a quienes
        colaboran en la entrega de tu pedido o cuando una obligación legal o una
        autoridad competente así lo requiera. Quienes traten datos por encargo
        nuestro deben resguardar su confidencialidad.
      </p>

      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos servicios que utilizamos para operar la tienda pueden almacenar
        información en servidores ubicados fuera de Chile, adoptando resguardos
        de seguridad adecuados. [Ajusta o elimina esta sección según tus proveedores].
      </p>

      <h2>7. Conservación</h2>
      <p>
        Conservamos tus datos mientras dure la relación contigo y por los plazos
        que exijan las obligaciones legales aplicables. Cumplidos dichos plazos,
        los eliminamos o anonimizamos de forma segura.
      </p>

      <h2>8. Tus derechos</h2>
      <p>
        Como titular de los datos, la ley te reconoce los derechos de{' '}
        <strong>acceso, rectificación, cancelación (supresión) y oposición</strong>,
        además de poder revocar tu consentimiento y oponerte al envío de
        comunicaciones comerciales. Para ejercerlos, escríbenos a
        ifmartinezaraya@gmail.com indicando tu solicitud; podremos pedirte
        antecedentes para verificar tu identidad. Responderemos dentro de los
        plazos legales.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Adoptamos medidas razonables para proteger tus datos frente a accesos no
        autorizados, pérdida o uso indebido. Ningún sistema es completamente
        infalible, pero trabajamos para resguardar tu información.
      </p>

      <h2>10. Cookies y tecnologías similares</h2>
      <p>
        El sitio puede utilizar cookies o tecnologías similares para su correcto
        funcionamiento y para mejorar tu experiencia. Puedes configurar tu
        navegador para gestionarlas o bloquearlas. [Ajusta según las herramientas
        que efectivamente uses].
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        Nuestros productos y compras están dirigidos a personas mayores de edad.
        No recopilamos intencionadamente datos de menores sin autorización de su
        representante legal.
      </p>

      <h2>12. Cambios en esta política</h2>
      <p>
        Podremos actualizar esta política. La versión vigente será la publicada
        en esta página, con su fecha de actualización.
      </p>

      <h2>13. Contacto y reclamos</h2>
      <p>
        Para ejercer tus derechos o realizar consultas sobre el tratamiento de
        tus datos, escríbenos a ifmartinezaraya@gmail.com. También puedes recurrir
        a la autoridad competente en materia de protección de datos personales y,
        en materia de consumo, al Servicio Nacional del Consumidor (SERNAC).
      </p>

      <p><strong>Última actualización:</strong> 17 de julio de 2026.</p>
    </PaginaContenido>
  );
}
