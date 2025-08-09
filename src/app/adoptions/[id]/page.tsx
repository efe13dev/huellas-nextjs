import React, { Suspense } from "react";
import Link from "next/link";
import {
  FaDog,
  FaCat,
  FaRuler,
  FaBirthdayCake,
  FaVenus,
  FaMars,
  FaPaw,
  FaArrowLeft,
} from "react-icons/fa";

import { type TursoDataResponse } from "@/types";

import ImageSlider from "@/components/ImageSlider";
import { getOneAdoption } from "@/db/clientTurso";
import {
  translateAge,
  translateSize,
  translateGenre,
  traducirTipo,
  getFallbackImage,
} from "@/lib/utils";

// Importamos los iconos necesarios, incluyendo FaPaw

// Componente de esqueleto
const SkeletonLoading = (): React.JSX.Element => (
  <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="mb-8 h-8 w-32 animate-pulse rounded-lg bg-muted"></div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="h-[400px] animate-pulse rounded-2xl bg-muted/50 md:h-[600px]"></div>
        <div className="space-y-6">
          <div className="h-12 animate-pulse rounded-lg bg-muted/50"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="h-6 w-6 animate-pulse rounded-full bg-muted/50"></div>
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted/50"></div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 w-full animate-pulse rounded bg-muted/50"></div>
            ))}
          </div>
          <div className="h-14 animate-pulse rounded-xl bg-muted/50"></div>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal de la página de detalles
const AdoptionDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <AdoptionDetails params={params} />
    </Suspense>
  );
};

// Componente que maneja los detalles de la adopción
const AdoptionDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  const { id } = await params;
  const data: TursoDataResponse = await getOneAdoption(id);
  const adoption = data.rows[0];

  // Agregar una comprobación para asegurarse de que adoption existe
  if (adoption === null || adoption === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <FaPaw className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Animal no encontrado</h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Lo sentimos, no pudimos encontrar la información de este animal.
          </p>
          <Link
            href="/adoptions"
            className="hover-lift inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver a adopciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
      <div className="container mx-auto px-6 py-12 md:py-24">
        <Link
          href="/adoptions"
          className="group mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <FaArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Volver a adopciones</span>
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Columna de imagen */}
          <div className="animate-slide-from-left">
            <div className="relative h-[400px] overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-sm md:h-[600px]">
              {(() => {
                const parsedPhotos =
                  typeof adoption.photos === "string" && adoption.photos !== ""
                    ? JSON.parse(adoption.photos)
                    : [];
                const fallbackImg = getFallbackImage(adoption.type);

                return parsedPhotos.length > 0 ? (
                  <div className="h-full w-full">
                    <ImageSlider
                      images={parsedPhotos}
                      fallbackImage={fallbackImg}
                      autoPlay={false}
                      showIndicators={true}
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-50">
                    <img
                      src={fallbackImg}
                      alt={`Imagen de ${adoption.name}`}
                      className="h-full w-full rounded-lg object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Columna de información */}
          <div className="animate-slide-from-right space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                {adoption.name}
              </h1>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-soft-blue lg:mx-0"></div>
            </div>

            {/* Información básica */}
            <div className="space-y-4 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Información básica</h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Tipo"
                  value={traducirTipo(adoption.type)}
                  icon={
                    adoption.type === "dog" ? (
                      <FaDog />
                    ) : adoption.type === "cat" ? (
                      <FaCat />
                    ) : (
                      <FaPaw />
                    )
                  }
                />
                <InfoItem label="Tamaño" value={translateSize(adoption.size)} icon={<FaRuler />} />
                <InfoItem
                  label="Edad"
                  value={translateAge(adoption.age)}
                  icon={<FaBirthdayCake />}
                />
                <InfoItem
                  label="Género"
                  value={translateGenre(adoption.genre)}
                  icon={adoption.genre.toLowerCase() === "female" ? <FaVenus /> : <FaMars />}
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Sobre {adoption.name}</h3>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                {adoption.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Botón de adopción */}
            <div className="pt-4">
              <Link href={`/contact?adoption=${adoption.name}`} className="block w-full">
                <button className="hover-lift group h-14 w-full rounded-xl bg-gradient-to-r from-primary to-soft-blue text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:from-soft-blue hover:to-primary hover:shadow-2xl">
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Adoptar a {adoption.name}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="pl-6 font-semibold text-foreground">{value}</span>
  </div>
);

export default AdoptionDetailPage;
