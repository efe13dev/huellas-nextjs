import type { Metadata } from 'next';
import '@fontsource-variable/onest';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Protectora Huellas - Refugio de Animales en Murcia',
  description:
    'Protectora de animales Huellas en Murcia. Adopción, voluntariado y cuidado de mascotas abandonadas.',
  keywords:
    'protectora de animales, adopción, Murcia, perros, gatos, mascotas, refugio',
  authors: [
    { name: 'Protectora Huellas', url: 'https://fido-protectora.vercel.app/' }
  ],
  openGraph: {
    title: 'Protectora Huellas - Refugio de Animales en  Murcia',
    description:
      'Ayuda a animales necesitados. Adopta, apadrina o hazte voluntario en nuestra protectora, en Murcia.',
    url: 'https://fido-protectora.vercel.app/', // Asegúrate de cambiar esto a tu URL real
    siteName: 'Protectora Huellas',
    locale: 'es_ES',
    type: 'website'
  },
  robots: 'index, follow'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang='es'>
      <body className='flex flex-col min-h-screen '>
        <Header />
        <main className='flex-grow '>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
