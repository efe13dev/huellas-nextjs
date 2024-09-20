import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

function Header(): JSX.Element {
  return (
    <header className="w-full bg-gradient-to-r from-gray-0 to-gray-100 text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src="/fido-logo-grande.jpeg"
              alt="FIDO logo"
              width={80}
              height={80}
              className="rounded-full border-2 border-gray-200 shadow-sm"
            />
            <h1 className="text-4xl font-bold font-sans tracking-wide text-primary">FIDO</h1>
          </div>
          <nav className="flex items-center gap-6">
            <ul className="flex gap-6 text-lg">
              <li>
                <Link href="/" className="link hover:text-primary hover:underline transition-all duration-300 ease-in-out">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/adoptions" className="link hover:text-primary hover:underline transition-all duration-300 ease-in-out">
                  Adopciones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link hover:text-primary hover:underline transition-all duration-300 ease-in-out">
                  Contacto
                </Link>
              </li>
            </ul>
            <Button variant="outline" size="lg" className="ml-4 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
              <Link href="https://www.teaming.net/protectorafido">Donar</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;