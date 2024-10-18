import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async (): Promise<nodemailer.Transporter> => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const accessToken = await oauth2Client
    .getAccessToken()
    .then((tokenResponse) => {
      if (typeof tokenResponse?.token === 'string') {
        return tokenResponse.token;
      } else {
        throw new Error('No se recibió token de acceso válido');
      }
    })
    .catch((error) => {
      throw new Error(`Error al crear el token de acceso: ${error.message}`);
    });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
  });

  return transporter;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;
    console.log(email);

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Tu dirección de correo
      replyTo: email, // La dirección del remitente para respuestas
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nAsunto: ${asunto}\n\nMensaje:\n${mensaje}`,
      html: `
        <h2>Mensaje de Fido</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <h3>Mensaje:</h3>
        <p>${mensaje}</p>
      `
    });

    return NextResponse.json(
      { message: 'Correo enviado con éxito' },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar el correo' },
      { status: 500 }
    );
  }
}
