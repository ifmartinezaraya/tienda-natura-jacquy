import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Terminos y condiciones · ${STORE_NAME}` };

export default function TerminosPage() {
  return (
    <PaginaContenido
      titulo="Terminos y condiciones"
      bajada="Condiciones de uso de nuestra tienda y del proceso de compra."
    >
      <p>
        <strong>Plantilla base:</strong> ajusta este contenido con tus datos y
        condiciones reales antes de publicarlo.
      </p>

      <h2>1. Generalidades</h2>
      <p>
        Al usar esta tienda y realizar pedidos, aceptas estas condiciones.
        {' '}{STORE_NAME} podra actualizarlas en cualquier momento.
      </p>

      <h2>2. Productos y precios</h2>
      <ul>
        <li>Los precios se muestran en pesos chilenos (CLP).</li>
        <li>Podemos actualizar precios y disponibilidad sin previo aviso.</li>
        <li>Las imagenes son referenciales y pueden variar del producto real.</li>
      </ul>

      <h2>3. Pedidos</h2>
      <p>
        El pedido se envia a traves de WhatsApp y queda sujeto a confirmacion de
        stock. Nos pondremos en contacto para coordinar pago y entrega. Un pedido
        se considera confirmado una vez que lo validamos contigo.
      </p>

      <h2>4. Pagos</h2>
      <p>
        Acordamos el medio de pago al confirmar el pedido (por ejemplo, efectivo
        o transferencia). El pedido se prepara segun las condiciones acordadas.
      </p>

      <h2>5. Entregas</h2>
      <p>
        Las condiciones de entrega se detallan en la seccion de{' '}
        <a href="/envios">Envios y entregas</a>. Los plazos son estimados y
        pueden variar por factores externos.
      </p>

      <h2>6. Cambios y devoluciones</h2>
      <p>
        Si tienes un problema con tu producto, escribenos. Evaluaremos cambios o
        devoluciones segun el estado del producto y la normativa de proteccion
        al consumidor vigente.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos terminos, escribenos por nuestros
        canales de contacto.
      </p>

      <p><strong>Ultima actualizacion:</strong> [completar fecha].</p>
    </PaginaContenido>
  );
}
