import { PaginaContenido } from '@/components/PaginaContenido';
import { STORE_NAME } from '@/lib/config';

export const metadata = { title: `Terminos y condiciones · ${STORE_NAME}` };

export default function TerminosPage() {
  return (
    <PaginaContenido
      titulo="Terminos y condiciones"
      bajada="Condiciones generales de contratacion, conforme a la legislacion vigente en Chile."
    >
      <p>
        <strong>Aviso:</strong> este documento fue elaborado conforme a la
        normativa chilena aplicable al comercio electronico y la proteccion del
        consumidor. Tiene caracter informativo y no constituye asesoria legal;
        ante situaciones particulares, recomendamos consultar a un(a) profesional.
      </p>

      <h2>1. Identificacion del proveedor</h2>
      <p>
        Este sitio es operado por {STORE_NAME} (en adelante, &quot;el
        Proveedor&quot; o &quot;la Tienda&quot;):
      </p>
      <ul>
        <li>Nombre: Ignacio Martinez Araya</li>
        <li>RUT: 20.776.107-9</li>
        <li>Domicilio: Williamson 392</li>
        <li>Correo de contacto: ifmartinezaraya@gmail.com</li>
        <li>Telefono / WhatsApp: +56 9 6374 3589</li>
      </ul>

      <h2>2. Ambito y aceptacion</h2>
      <p>
        Estos Terminos regulan el uso del sitio y la compra de productos
        ofrecidos por la Tienda. Al navegar, registrarte o realizar un pedido,
        declaras haber leido y aceptado estas condiciones, nuestra{' '}
        <a href="/politicas/privacidad">Politica de Privacidad</a> y la
        informacion de <a href="/envios">Envios y entregas</a>. Si no estas de
        acuerdo, te pedimos abstenerte de usar el sitio.
      </p>

      <h2>3. Productos, precios e impuestos</h2>
      <ul>
        <li>Los precios se expresan en pesos chilenos (CLP) e incluyen el IVA cuando corresponde.</li>
        <li>Los precios y la disponibilidad pueden actualizarse; rige el precio informado al confirmar el pedido.</li>
        <li>Las imagenes y descripciones son referenciales y pueden presentar variaciones respecto del producto real.</li>
        <li>Ante un error evidente de precio o de sistema, la Tienda podra no confirmar la compra, informandote oportunamente.</li>
      </ul>

      <h2>4. Proceso de compra y formacion del consentimiento</h2>
      <p>
        La compra se realiza seleccionando productos y enviando el pedido a
        traves de WhatsApp. El pedido queda sujeto a confirmacion de stock y de
        las condiciones de pago y entrega. Conforme al articulo 12 A de la Ley
        N&deg; 19.496, el consentimiento se entiende formado cuando recibes la
        confirmacion de la compra por un medio que te permita almacenarla o
        imprimirla. Guardaremos y podremos entregarte una copia del detalle de tu
        pedido. Los registros electronicos tienen valor conforme a la Ley
        N&deg; 19.799 sobre documentos y firma electronica.
      </p>

      <h2>5. Medios de pago</h2>
      <p>
        Los medios de pago disponibles (por ejemplo, efectivo, transferencia
        bancaria u otros) se acuerdan al confirmar el pedido. El producto se
        prepara y entrega segun las condiciones pactadas.
      </p>

      <h2>6. Despacho y entrega</h2>
      <p>
        Las modalidades, zonas, plazos y costos de entrega se detallan en{' '}
        <a href="/envios">Envios y entregas</a>. Los plazos son estimados y
        pueden variar por factores externos. Coordinaremos contigo la entrega.
      </p>

      <h2>7. Derecho a retracto</h2>
      <p>
        En las compras realizadas a distancia, tienes derecho a poner termino
        unilateralmente al contrato dentro del plazo de <strong>10 dias
        corridos</strong> contados desde la recepcion del producto o desde la
        celebracion del contrato en el caso de servicios, conforme al articulo
        3&nbsp;bis de la Ley N&deg; 19.496. Para ejercerlo, el producto debe
        encontrarse en las mismas condiciones en que lo recibiste. Este derecho
        no aplica en los casos exceptuados por la ley (por ejemplo, productos que
        por su naturaleza no puedan devolverse o que puedan deteriorarse con
        rapidez). Te reembolsaremos las sumas pagadas en el plazo legal.
      </p>

      <h2>8. Garantia legal</h2>
      <p>
        Todos los productos cuentan con la garantia legal establecida en la Ley
        N&deg; 19.496 (modificada por la Ley N&deg; 21.398). Si el producto
        presenta fallas o no corresponde a lo ofrecido, puedes optar por su
        reparacion, su reposicion (cambio) o la devolucion de lo pagado, dentro
        del plazo legal de <strong>6 meses</strong> desde la recepcion. Conserva
        tu comprobante de compra para agilizar el proceso.
      </p>

      <h2>9. Cambios y devoluciones</h2>
      <p>
        Para ejercer el retracto o la garantia legal, escribenos por nuestros
        canales de contacto indicando tu pedido y el motivo. Te informaremos el
        procedimiento para la devolucion o el cambio y los plazos aplicables.
      </p>

      <h2>10. Responsabilidad</h2>
      <p>
        La Tienda responde por sus obligaciones conforme a la ley. No sera
        responsable por interrupciones del servicio ajenas a su control ni por
        el uso indebido del sitio por parte de terceros. Nada de lo aqui
        senalado limita los derechos que la ley reconoce a los consumidores.
      </p>

      <h2>11. Propiedad intelectual</h2>
      <p>
        Los contenidos propios del sitio (textos, diseno, logotipo y marca
        {' '}{STORE_NAME}) pertenecen a la Tienda o se usan con autorizacion. Las
        marcas de los productos comercializados pertenecen a sus respectivos
        titulares y se muestran solo con fines de identificacion del producto.
      </p>

      <h2>12. Proteccion de datos personales</h2>
      <p>
        El tratamiento de tus datos se rige por nuestra{' '}
        <a href="/politicas/privacidad">Politica de Privacidad</a>, conforme a la
        Ley N&deg; 19.628 y demas normativa vigente sobre proteccion de datos.
      </p>

      <h2>13. Reclamos y SERNAC</h2>
      <p>
        Ante cualquier inconveniente, escribenos primero: buscaremos una
        solucion. Sin perjuicio de ello, puedes presentar tus reclamos ante el
        Servicio Nacional del Consumidor (SERNAC) a traves de sus canales
        oficiales.
      </p>

      <h2>14. Legislacion aplicable y jurisdiccion</h2>
      <p>
        Estos Terminos se rigen por las leyes de la Republica de Chile. Cualquier
        controversia se sometera a los tribunales competentes de Chile, sin
        perjuicio de los derechos y procedimientos especiales que la ley del
        consumidor establece a tu favor.
      </p>

      <h2>15. Modificaciones</h2>
      <p>
        La Tienda podra actualizar estos Terminos. La version vigente sera la
        publicada en esta pagina, con su fecha de actualizacion.
      </p>

      <h2>16. Contacto</h2>
      <p>
        Para consultas sobre estos Terminos, escribenos a
        ifmartinezaraya@gmail.com o por WhatsApp a +56 9 6374 3589.
      </p>

      <p><strong>Ultima actualizacion:</strong> 17 de julio de 2026.</p>
    </PaginaContenido>
  );
}
