import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Politica de privacidad · ${STORE_NAME}` };

export default function PrivacidadPage() {
  return (
    <PaginaContenido
      titulo="Politica de privacidad"
      bajada="Como tratamos y protegemos tus datos personales, conforme a la ley chilena."
    >
      <p>
        <strong>Aviso:</strong> documento elaborado conforme a la Ley N&deg;
        19.628 sobre Proteccion de la Vida Privada y a la Ley N&deg; 21.719 que
        moderniza el regimen de proteccion de datos en Chile. Tiene caracter
        informativo y no constituye asesoria legal; ante situaciones
        particulares, recomendamos consultar a un(a) profesional.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es {STORE_NAME}:
      </p>
      <ul>
        <li>Nombre: Ignacio Martinez Araya</li>
        <li>RUT: 20.776.107-9</li>
        <li>Domicilio: Williamson 392</li>
        <li>Correo para asuntos de datos: ifmartinezaraya@gmail.com</li>
      </ul>

      <h2>2. Datos que tratamos</h2>
      <ul>
        <li>Datos de identificacion y contacto: nombre y numero de telefono.</li>
        <li>Datos del pedido: productos, cantidades, montos y fecha.</li>
        <li>Datos de entrega: direccion u otra informacion que nos entregues para coordinar el despacho.</li>
        <li>Comunicaciones que mantengas con nosotros (por ejemplo, por WhatsApp).</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <ul>
        <li>Gestionar, procesar y coordinar tus pedidos y su entrega.</li>
        <li>Comunicarnos contigo respecto de tu compra y responder consultas.</li>
        <li>Cumplir obligaciones legales, tributarias y contables.</li>
        <li>Enviarte novedades, ofertas o promociones, unicamente si nos autorizas.</li>
      </ul>

      <h2>4. Base de licitud</h2>
      <p>
        Tratamos tus datos sobre la base de tu consentimiento, de la ejecucion de
        la relacion de compra que solicitas y del cumplimiento de obligaciones
        legales. El envio de comunicaciones comerciales se realiza solo con tu
        autorizacion previa, la que puedes revocar en cualquier momento.
      </p>

      <h2>5. Comunicacion de datos a terceros</h2>
      <p>
        No vendemos ni comercializamos tus datos. Solo los comunicamos a quienes
        colaboran en la entrega de tu pedido o cuando una obligacion legal o una
        autoridad competente asi lo requiera. Quienes traten datos por encargo
        nuestro deben resguardar su confidencialidad.
      </p>

      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos servicios que utilizamos para operar la tienda pueden almacenar
        informacion en servidores ubicados fuera de Chile, adoptando resguardos
        de seguridad adecuados. [Ajusta o elimina esta seccion segun tus proveedores].
      </p>

      <h2>7. Conservacion</h2>
      <p>
        Conservamos tus datos mientras dure la relacion contigo y por los plazos
        que exijan las obligaciones legales aplicables. Cumplidos dichos plazos,
        los eliminamos o anonimizamos de forma segura.
      </p>

      <h2>8. Tus derechos</h2>
      <p>
        Como titular de los datos, la ley te reconoce los derechos de{' '}
        <strong>acceso, rectificacion, cancelacion (supresion) y oposicion</strong>,
        ademas de poder revocar tu consentimiento y oponerte al envio de
        comunicaciones comerciales. Para ejercerlos, escribenos a
        ifmartinezaraya@gmail.com indicando tu solicitud; podremos pedirte
        antecedentes para verificar tu identidad. Responderemos dentro de los
        plazos legales.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Adoptamos medidas razonables para proteger tus datos frente a accesos no
        autorizados, perdida o uso indebido. Ningun sistema es completamente
        infalible, pero trabajamos para resguardar tu informacion.
      </p>

      <h2>10. Cookies y tecnologias similares</h2>
      <p>
        El sitio puede utilizar cookies o tecnologias similares para su correcto
        funcionamiento y para mejorar tu experiencia. Puedes configurar tu
        navegador para gestionarlas o bloquearlas. [Ajusta segun las herramientas
        que efectivamente uses].
      </p>

      <h2>11. Menores de edad</h2>
      <p>
        Nuestros productos y compras estan dirigidos a personas mayores de edad.
        No recopilamos intencionadamente datos de menores sin autorizacion de su
        representante legal.
      </p>

      <h2>12. Cambios en esta politica</h2>
      <p>
        Podremos actualizar esta politica. La version vigente sera la publicada
        en esta pagina, con su fecha de actualizacion.
      </p>

      <h2>13. Contacto y reclamos</h2>
      <p>
        Para ejercer tus derechos o realizar consultas sobre el tratamiento de
        tus datos, escribenos a ifmartinezaraya@gmail.com. Tambien puedes recurrir
        a la autoridad competente en materia de proteccion de datos personales y,
        en materia de consumo, al Servicio Nacional del Consumidor (SERNAC).
      </p>

      <p><strong>Ultima actualizacion:</strong> 17 de julio de 2026.</p>
    </PaginaContenido>
  );
}
