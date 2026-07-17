import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Politica de privacidad · ${STORE_NAME}` };

export default function PrivacidadPage() {
  return (
    <PaginaContenido
      titulo="Politica de privacidad"
      bajada="Como cuidamos y usamos tus datos personales."
    >
      <p>
        <strong>Plantilla base:</strong> este texto es un punto de partida.
        Revisalo y ajustalo con tus datos e informacion real antes de publicarlo.
      </p>

      <h2>1. Responsable</h2>
      <p>
        {STORE_NAME} es responsable del tratamiento de los datos personales que
        nos entregas al realizar un pedido o al contactarnos. Para consultas
        sobre tus datos, escribenos por nuestros canales de contacto.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <ul>
        <li>Datos de contacto: nombre y numero de telefono.</li>
        <li>Datos del pedido: productos, cantidades y total.</li>
        <li>Datos de entrega que nos proporciones para coordinar el despacho.</li>
      </ul>

      <h2>3. Para que usamos tus datos</h2>
      <ul>
        <li>Gestionar y coordinar tus pedidos y entregas.</li>
        <li>Comunicarnos contigo sobre tu compra.</li>
        <li>Enviarte novedades o promociones, solo si lo autorizas.</li>
      </ul>

      <h2>4. Con quien compartimos tus datos</h2>
      <p>
        No vendemos ni cedemos tus datos a terceros. Solo los compartimos cuando
        es necesario para completar la entrega o cuando la ley lo exige.
      </p>

      <h2>5. Conservacion</h2>
      <p>
        Conservamos tus datos el tiempo necesario para gestionar tus pedidos y
        cumplir obligaciones legales. Luego los eliminamos o anonimizamos.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes solicitar acceder, rectificar o eliminar tus datos, u oponerte a
        recibir comunicaciones, escribiendonos por nuestros canales de contacto.
      </p>

      <h2>7. Cambios</h2>
      <p>
        Podemos actualizar esta politica. Publicaremos aqui cualquier cambio con
        su fecha de actualizacion.
      </p>

      <p><strong>Ultima actualizacion:</strong> [completar fecha].</p>
    </PaginaContenido>
  );
}
