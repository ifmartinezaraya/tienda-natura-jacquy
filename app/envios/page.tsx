import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Envíos y entregas · ${STORE_NAME}` };

export default function EnviosPage() {
  return (
    <PaginaContenido
      titulo="Envíos y entregas"
      bajada="Coordinamos la entrega de forma simple y a tu comodidad."
    >
      <h2>Cómo funciona</h2>
      <p>
        Una vez recibido tu pedido por WhatsApp, coordinamos contigo el lugar,
        la fecha y el horario de entrega, así como el medio de pago.
      </p>

      <h2>Zonas de entrega</h2>
      <p>
        Realizamos entregas en nuestra zona de cobertura habitual. Si tu
        dirección está fuera de ella, escríbenos y buscaremos una alternativa.
      </p>

      <h2>Tiempos</h2>
      <p>
        Los tiempos de entrega dependen de la disponibilidad del producto y de
        tu ubicación. Te informaremos un plazo estimado al confirmar el pedido.
      </p>

      <h2>Costos</h2>
      <p>
        El costo de despacho, si aplica, se acuerda al momento de coordinar la
        entrega según la zona.
      </p>

      <p>
        <strong>Nota:</strong> revisa y ajusta esta información con tus datos
        reales (zonas, plazos y costos) antes de publicarla definitivamente.
      </p>
    </PaginaContenido>
  );
}
