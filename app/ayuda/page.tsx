import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME, WHATSAPP_NUMBER } from '@/lib/config';

export const metadata = { title: `Ayuda y contacto · ${STORE_NAME}` };

export default function AyudaPage() {
  return (
    <PaginaContenido
      titulo="Ayuda y contacto"
      bajada="Estamos para ayudarte. Aquí encontrarás respuestas a las dudas más comunes."
    >
      <h2>Cómo hacer un pedido</h2>
      <ul>
        <li>Explora el catálogo y agrega productos a tu carrito.</li>
        <li>Revisa tu carrito y toca "Finalizar pedido por WhatsApp".</li>
        <li>Se abrirá WhatsApp con el detalle listo para enviarnos.</li>
        <li>Coordinamos contigo el pago y la entrega.</li>
      </ul>

      <h2>Formas de pago</h2>
      <p>
        Aceptamos efectivo, transferencia bancaria y otros medios que acordemos
        al momento de coordinar tu pedido.
      </p>

      <h2>Contacto directo</h2>
      <p>
        La forma más rápida de comunicarte con nosotros es por WhatsApp:
      </p>
      <p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank">
          Escríbenos por WhatsApp
        </a>
      </p>
      <p>
        Horario de atención: lunes a sábado. Te responderemos a la brevedad.
      </p>

      <h2>Preguntas frecuentes</h2>
      <h3>¿Los productos son originales?</h3>
      <p>Sí, trabajamos únicamente con productos originales.</p>
      <h3>¿Puedo cambiar un producto?</h3>
      <p>
        Escríbenos y revisaremos tu caso según nuestra política de cambios y el
        estado del producto.
      </p>
    </PaginaContenido>
  );
}
