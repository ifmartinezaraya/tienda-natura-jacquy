import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Sobre nosotros · ${STORE_NAME}` };

export default function NosotrosPage() {
  return (
    <PaginaContenido
      titulo="Sobre nosotros"
      bajada="Cosmetica natural, atencion cercana y productos en los que puedes confiar."
    >
      <p>
        En {STORE_NAME} ofrecemos productos de cosmetica natural para el cuidado
        de la piel, el cabello y el bienestar de toda la familia. Somos un
        emprendimiento cercano: cada pedido lo atendemos de forma personal para
        ayudarte a elegir lo que mejor se adapta a ti.
      </p>

      <h2>Nuestra historia</h2>
      <p>
        Nacimos con la idea de acercar productos de calidad a nuestra comunidad,
        con un trato humano y precios justos. Trabajamos con dedicacion para que
        tu experiencia de compra sea simple, confiable y agradable.
      </p>

      <h2 id="sustentabilidad">Compromiso con la sustentabilidad</h2>
      <p>
        Creemos en el cuidado responsable: promovemos el uso de repuestos para
        generar menos residuos, priorizamos formulas de origen natural y
        fomentamos el consumo consciente. Pequenas decisiones que, en conjunto,
        cuidan mejor nuestro entorno.
      </p>

      <h2>Por que elegirnos</h2>
      <ul>
        <li>Productos originales y de confianza.</li>
        <li>Atencion personalizada por WhatsApp.</li>
        <li>Entrega coordinada segun tu comodidad.</li>
        <li>Asesoria para encontrar lo que necesitas.</li>
      </ul>

      <p>
        Gracias por apoyar el comercio local y de cercania. Tu preferencia hace
        posible este proyecto.
      </p>
    </PaginaContenido>
  );
}
