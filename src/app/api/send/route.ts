// app/api/send-email/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: `${process.env.SMTP_HOST}`,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: `${process.env.SMTP_EMAIL}`,
    pass: `${process.env.SMTP_PASSWORD}`,
  },
  tls: {
    // no usar rejectUnauthorized: false en producción a menos que entiendas el riesgo.
    // ciphers: 'TLSv1.2' // opcional si tu servidor lo requiere
    
    requireTLS: true,
    tls: { minVersion: "TLSv1.2" },
  },
});

const TO_INFO = [
  { name: 'Oscar Infante', email: 'oinfante@bnext.mx' },
  { name: 'Juan Cortina', email: 'jcortina@bnext.mx' },
  { name: 'Abdiel González', email: 'amartinez@bnext.mx' }
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, msg } = body;

    for (const to of TO_INFO) {

      await transporter.sendMail({
        from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_EMAIL}>`,
        to: `${to.name} <${to.email}>`,
        subject: `Solicitud de Información sobre Bnext Observe`, // asunto
        //text: 'Hola, este es un correo de prueba desde la landing de Bnext Observe.', // texto plano
        html: getTemplate(name, company, email, phone, msg, to.name), // html body
        attachments: [
          { filename: 'Logo Bnext Blanco', path: './public/bnext.png', cid: 'logo' },
          { filename: 'Logo Bnext Negro', path: './public/bnext-black.png', cid: 'logo-black' },
          { filename: 'Logo Facebook', path: './public/social/facebook.png', cid: 'facebook' },
          { filename: 'Logo Instagram', path: './public/social/instagram.png', cid: 'instagram' },
          { filename: 'Logo LinkedIn', path: './public/social/linkedin.png', cid: 'linkedin' },
        ],
      });

    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("send error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

function getTemplate(name: string, company: string, email: string, phone: string, comments: string, to_name: string) {
  return `
  
    <!doctype html>
    <html lang="es" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="utf-8">
      <title>Bnext Observe | Solicitud de Información</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <!-- Evita que iOS/Apple cambie colores de links/teléfonos -->
      <meta name="x-apple-disable-message-reformatting">
    
      <style>
        /* Estilos normales */
        .logo-light { display: block !important; }
        .logo-dark { display: none !important; }

        /* Si el cliente soporta modo oscuro */
        @media (prefers-color-scheme: dark) {
          .logo-light { display: none !important; }
          .logo-dark { display: block !important; }
        }

        [data-ogsc] .logo-light { display: none !important; }
        [data-ogsc] .logo-dark { display: block !important; }
      </style>
    </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8;">
    <!-- Preheader (texto de vista previa en la bandeja) -->
    <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#f4f6f8;">
      Bienvenido(a) a nuestra comunidad. Consejos de salud, historias y eventos — todo en tu bandeja.
    </div>

    <!-- Contenedor principal -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f4f6f8">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <!--[if mso]>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600">
            <tr><td>
          <![endif]-->

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- Header / Logo -->
            <tr>
              <td align="left" style="padding:24px 28px 8px 28px; background:#ffffff;">
                <a href="https://bnext.mx" target="_blank" style="text-decoration:none;">
                  <img src="cid:logo"
                      width="120" height="40"
                      alt="Logo"
                      class="logo-dark"
                      style="display:block; border:0;">
                  <!-- Versión para modo oscuro (oculta por defecto) -->
                  <img src="cid:logo-black"
                      width="120" height="40"
                      alt="Logo"
                      class="logo-light"
                      style="display:none; border:0;">
                </a>
              </td>
            </tr>

            <!-- Título / Saludo -->
            <tr>
              <td style="padding:8px 28px 0 28px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#111111;">
                <div style="font-size:24px; line-height:32px; font-weight:700; margin:0 0 12px 0;">
                  Hola, ${to_name.split(' ')[0]} 👋
                </div>
              </td>
            </tr>

            <!-- Introducción -->
            <tr>
              <td style="padding:0 28px 8px 28px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#444444;">
                <p style="margin:0; font-size:16px; line-height:24px; mso-line-height-rule:exactly;">
                  Nos alegra notificarte que han solicitado más información sobre <strong>Bnext Observe</strong>.
                </p>
                <p style="margin:16px 0 0 0; font-size:16px; line-height:24px; mso-line-height-rule:exactly;">
                  Aquí están los detalles proporcionados por el interesado desde nuestra landing page:
                </p>
              </td>
            </tr>

            <!-- Sección: Qué esperar -->
            <tr>
              <td style="padding:20px 28px 8px 28px; background:#ffffff; font-family:Arial, Helvetica, sans-serif;">
                <div style="font-size:18px; line-height:26px; font-weight:700; color:#111111; margin:0 0 8px 0;">
                  Detalles del interesado:
                </div>
                <!-- Lista con bullets -->
                <ul style="padding-left:20px; margin:12px 0 0 0; font-size:16px; line-height:24px; color:#444444;">
                  <li style="margin:0 0 10px 0;">
                    <strong>Nombre</strong> — ${name ? name : 'No se proporcionó nombre'}.
                  </li>
                  <li style="margin:0 0 10px 0;">
                    <strong>Empresa</strong> — ${company ? company : 'No se proporcionó empresa'}.
                  </li>
                  <li style="margin:0 0 10px 0;">
                    <strong>Correo</strong> — ${email ? email : 'No se proporcionó correo'}.
                  </li>
                  <li style="margin:0 0 0 0;">
                    <strong>Teléfono</strong> — ${phone ? phone : 'No se proporcionó teléfono'}.
                  </li>
                  <li style="margin:0 0 0 0;">
                    <strong>Comentarios</strong> — ${comments ? comments : 'No se proporcionaron comentarios'}.
                  </li>
                </ul>
              </td>
            </tr>

            <!-- Recordatorio -->
            <tr>
              <td style="padding:16px 28px 8px 28px; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#444444;">
                <p style="margin:0; font-size:16px; line-height:24px; mso-line-height-rule:exactly;">
                  Te recomendamos ponerte en contacto con el interesado a la brevedad para brindarle la información que necesita.
                </p>
              </td>
            </tr>

            <!-- Separador -->
            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border-top:1px solid #e9ecef; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer: redes + dirección + desuscripción -->
            <tr>
              <td align="center" style="padding:18px 28px 8px 28px; background:#ffffff;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding:0 6px;">
                      <a href="https://www.facebook.com/BlockNetworks" target="_blank">
                        <img src="cid:facebook" width="20" height="20" alt="Facebook" style="display:block; border:0;">
                      </a>
                    </td>
                    <td align="center" style="padding:0 6px;">
                      <a href="https://www.linkedin.com/company/bnextmx/" target="_blank">
                        <img src="cid:linkedin" width="24" height="24" alt="LinkedIn" style="display:block; border:0;">
                      </a>
                    </td>
                    <td align="center" style="padding:0 6px;">
                      <a href="https://instagram.com/bnextmx" target="_blank">
                        <img src="cid:instagram" width="20" height="20" alt="Instagram" style="display:block; border:0;">
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <br />

            <tr>
              <td align="center" style="padding:8px 28px 24px 28px; font-family:Arial, Helvetica, sans-serif; color:#8a8f98;">
                <p style="margin:0; font-size:12px; line-height:18px;">
                  &copy; ${new Date().getFullYear()} Bnext. Todos los derechos reservados. <br/>
                  Av. Eugenio Garza Sada 4570, Las Brisas. Monterrey, Nuevo León, México. C.P. 64780
                </p>
              </td>
            </tr>
          </table>

          <!--[if mso]>
            </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>

  `

}

