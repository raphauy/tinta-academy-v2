
export default function LegalPage() {
  // Tinta Link es una aplicación web que permite a los usuarios compartir enlaces de forma rápida y sencilla.

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-10 mt-5">Términos y Condiciones de Tinta Link</h1>

      <h2 className="text-xl font-bold mb-2">Introducción</h2>
      <p>Al registrarte y utilizar los servicios de Tinta Link, aceptas cumplir con los siguientes Términos y Condiciones.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">¿Qué es Tinta Link?</h2>
      <p>Tinta Link es una aplicación web que permite a los usuarios compartir enlaces de forma rápida y sencilla.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">¿Cómo funciona Tinta Link?</h2>
      <p>Para utilizar Tinta Link, debes registrarte con tu cuenta de Google o con un link de acceso enviado a tu casilla de correo.</p>
      <p>Una vez registrado, puedes agregar enlaces a tu perfil. Estos enlaces pueden ser de dos tipos:</p>
      <ul className="ml-5">
        <li className="mt-2">- <span className="italic">Enlaces a redes sociales</span>: Facebook, Twitter, Instagram, etc.</li>
        <li className="mb-2">- <span className="italic">Enlaces a sitios web</span>: Sitio web personal, Tiendas, Blogs, etc.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2 mt-8">Limitación de responsabilidad</h2>
      <p>Tinta Link no se hace responsable por el contenido de los enlaces agregados por los usuarios.</p>
      <p>Los enlaces agregados por los usuarios son de su exclusiva responsabilidad.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">Modificaciones</h2>
      <p>Tinta Link se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.</p>
      <p>Si realizamos cambios en los Términos y Condiciones, te notificaremos a través de la aplicación.</p>
      <p>Si continúas utilizando Tinta Link luego de haber sido notificado, aceptas los cambios realizados.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">Cancelación y Terminación</h2>
      <p>Puedes cerrar tu cuenta en cualquier momento.</p>
      <p>Tinta se reserva el derecho de suspender o cancelar cuentas que violen estos Términos y Condiciones.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">Contacto</h2>
      <p>Si tienes alguna duda sobre estos Términos y Condiciones, puedes contactarte con nosotros a través de <a href="mailto:hola@tinta.wine" className="font-bold">hola@tinta.wine</a>.</p>
    </div>
  )
}
