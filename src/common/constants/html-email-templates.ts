export const send_mail_active_account = (fullname: string) => {
    return `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Activa tu cuenta</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 20px 0;
              background-color: #007bff;
              color: #ffffff;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content h2 {
              color: #333333;
          }
          .content p {
              color: #666666;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #28a745;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
          }
          .button:hover {
              background-color: #218838;
          }
          .footer {
              text-align: center;
              padding: 20px;
              background-color: #f4f4f4;
              color: #666666;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>¡Bienvenido a Polígono! 🎉</h1>
          </div>
          <div class="content">
              <h2>¡Hola, ${fullname}! 😊</h2>
              <p>Gracias por registrarte con nosotros. Para completar tu registro, por favor haz clic en el botón de abajo para activar tu cuenta.</p>
              <a href="[Enlace de Activación]" class="button">Activar Cuenta</a>
          </div>
          <div class="footer">
              <p>Si no creaste una cuenta, por favor ignora este correo.</p>
              <p>&copy; ${new Date().getFullYear()} Polígono. Todos los derechos reservados.</p>
          </div>
      </div>
  </body>
  </html>`;
  };
  