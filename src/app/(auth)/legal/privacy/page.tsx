
export default function PrivacyPage() {

  // Tinta Link es una aplicación web que permite a los usuarios compartir enlaces de forma rápida y sencilla.
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-10 mt-5">Política de Privacidad de Tinta Link</h1>

      <h2 className="text-xl font-bold mb-2">Introducción</h2>
      <p>Bienvenidos a Tinta Link. Esta Política de Privacidad tiene como objetivo informar a los usuarios sobre cómo recopilamos, 
        usamos y protegemos su información personal.</p>

        <h2 className="text-xl font-bold mb-2 mt-8">¿Qué información recopilamos?</h2>
      <p>Cuando te registras en Tinta Link, recopilamos información como tu nombre(Opcional), dirección de correo electrónico.</p>
      <p>Una vez crada tu cuenta en Tinta Link, puedes agregar enlaces a tu perfil. Estos enlaces pueden ser de dos tipos:</p>
      <ul className="ml-5">
        <li className="mt-2">- <span className="italic">Enlaces a redes sociales</span>: Facebook, Twitter, Instagram, etc.</li>
        <li className="mb-2">- <span className="italic">Enlaces a sitios web</span>: Sitio web personal, Tiendas, Blogs, etc.</li>
      </ul>
      <p>Al crear tu cuenta y elegir tu idenificador en Tinta Link, se creará un enlace personalizado para tu perfil. Este enlace
        es único, todos tus links pueden ser accedidos a través de este enlace.</p>
      <p>Este enlace es público y una vez que lo compartas, cualquier persona podrá acceder a tu perfil y ver los enlaces que has agregado.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">¿Cómo usamos tu información?</h2>
      <p>La información que recopilamos se usa para:</p>
      <ul className="ml-5">
        <li className="mt-2">- <span className="italic">Identificarte</span>: Tu correo electrónico se usan para identificarte en Tinta Link.</li>
        <li>- <span className="italic">Compartir tus enlaces</span>: Tus enlaces son públicos y pueden ser accedidos a través de tu enlace personalizado.</li>
        <li className="bt-2">- <span className="italic">Contactarte</span>: Tu correo electrónico puede ser usado para contactarte en caso de que sea necesario.</li>
      </ul>

      <h2 className="text-xl font-bold mb-2 mt-8">¿Cómo protegemos tu información?</h2>
      <p>Tinta Link se compromete a proteger la información personal de sus usuarios. Para ello, se utilizan los siguientes métodos:</p>
      <ul className="ml-5">
        <li className="mt-2">- <span className="italic">Cifrado de datos</span>: Toda la información que se envía a través de la aplicación se cifra.</li>
      </ul>

      <div className="max-w-xl rounded-md border mt-7 p-3">
        <p className="text-2xl font-bold">Importante:</p>
        <p>Dado que nuestros métodos de autenticación son a través de Google o de un link de acceso enviado a tu casilla de correo, no almacenamos contraseñas.
          Por lo tanto, siempre que tengas acceso a tu casiila de correo, podrás acceder a tu cuenta de Tinta Link.</p>
      </div>

      <h2 className="text-xl font-bold mb-2 mt-8">Cookies y tecnologías similares</h2>
      <p>Utilizamos cookies para mejorar tu experiencia de usuario y recopilar estadísticas que nos ayuden a mejorar nuestro servicio.</p>

      <h2 className="text-xl font-bold mb-2 mt-8">Contacto</h2>
      <p>Si tienes alguna duda sobre esta Política de Privacidad, puedes contactarte con nosotros a través de <a href="mailto:hola@tinta.wine" className="font-bold">hola@tinta.wine</a>.</p>
        



      
    </div>
  )
}
