import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
      to: 'microfunky@gmail.com', // Tu dirección de correo
      replyTo: email, // La dirección del remitente para respuestas
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nAsunto: ${asunto}\n\nMensaje:\n${mensaje}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
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
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar el correo' },
      { status: 500 }
    );
  }
}
