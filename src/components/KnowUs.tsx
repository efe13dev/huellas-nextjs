import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function KnowUs(): JSX.Element {
  return (
    <Card className="w-full max-w-6xl mx-auto my-12 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <CardContent className="flex-1 p-8 lg:p-12 space-y-6">
          <CardHeader className="p-0">
            <CardTitle className="text-4xl font-bold text-primary mb-4">Conócenos: Protectora Fido</CardTitle>
            <Badge variant="secondary" className="mb-6">Desde 2022</Badge>
          </CardHeader>
          <p className="text-lg text-muted-foreground leading-relaxed">
            En Fido, nuestra misión es proporcionar un <strong className="text-primary">hogar seguro y amoroso</strong> a animales abandonados y maltratados. Hemos rescatado y dado en adopción a <em className="font-semibold">más de 5,000 perros y gatos</em>, brindándoles una <strong className="text-primary">segunda oportunidad en la vida</strong>.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuestro <strong className="text-primary">equipo de voluntarios dedicados</strong> trabaja incansablemente para cuidar, rehabilitar y encontrar hogares permanentes para nuestros amigos peludos. Además, promovemos la <em className="font-semibold">educación sobre el cuidado responsable de mascotas</em> y la importancia de la esterilización.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button size="lg" className="text-lg">
              <Link href="/adoptions">Adopta ahora</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Ser voluntario
            </Button>
          </div>
        </CardContent>
        <div className="flex-1 relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src="/pexels-bruno.jpg"
            alt="Perros y gatos felices en nuestra protectora"
            layout="fill"
            objectFit="cover"
            className="rounded-r-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p className="text-white text-xl font-semibold">Más de 5,000 animales rescatados</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default KnowUs;