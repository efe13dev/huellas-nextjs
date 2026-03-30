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

const SkeletonLoading = (): React.JSX.Element => (
  <div className="section-decorated min-h-screen bg-gradient-to-b from-cream/40 via-background to-background">
    <div className="bg-dots absolute inset-0 opacity-40"></div>
    <div className="container relative mx-auto px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-8 h-8 w-32 animate-pulse rounded-lg bg-muted"></div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="h-[400px] animate-pulse rounded-2xl bg-muted/50 md:h-[600px]"></div>
        <div className="space-y-6">
          <div className="h-12 animate-pulse rounded-lg bg-muted/50"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="card-gradient-border h-20 animate-pulse rounded-2xl bg-muted/50 p-4"
              ></div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-4 w-full animate-pulse rounded bg-muted/50"
              ></div>
            ))}
          </div>
          <div className="h-14 animate-pulse rounded-xl bg-muted/50"></div>
        </div>
      </div>
    </div>
  </div>
);

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

const AdoptionDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  const { id } = await params;
  const data: TursoDataResponse = await getOneAdoption(id);
  const adoption = data.rows[0];

  if (adoption === null || adoption === undefined) {
    return (
      <div className="section-decorated flex min-h-screen items-center justify-center bg-gradient-to-b from-cream/40 via-background to-background">
        <div className="bg-dots absolute inset-0 opacity-40"></div>
        <div className="relative space-y-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <FaPaw className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Animal no encontrado
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Lo sentimos, no pudimos encontrar la información de este animal.
          </p>
          <Link
            href="/adoptions"
            className="hover-lift inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-warm-orange px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:brightness-110"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver a adopciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-decorated min-h-screen bg-gradient-to-b from-cream/40 via-background to-background">
      <div className="bg-dots absolute inset-0 opacity-40"></div>
      <div className="container relative mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="animate-slide-from-left">
            <Link
              href="/adoptions"
              className="group mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary"
            >
              <FaArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Volver a adopciones</span>
            </Link>
            <div className="card-gradient-border relative h-[400px] overflow-hidden rounded-2xl bg-background/80 shadow-xl backdrop-blur-sm md:h-[600px]">
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
                  <div className="flex h-full w-full items-center justify-center bg-muted/30">
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

          <div className="animate-slide-from-right space-y-6">
            <div className="text-center lg:text-left">
              <Link
                href="/adoptions"
                className="group mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary lg:hidden"
              >
                <FaArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Volver a adopciones</span>
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <FaPaw className="h-3.5 w-3.5" />
                Ficha de adopción
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {adoption.name}
              </h1>
              <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-warm-orange lg:mx-0"></div>
            </div>

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
              <InfoItem
                label="Tamaño"
                value={translateSize(adoption.size)}
                icon={<FaRuler />}
              />
              <InfoItem
                label="Edad"
                value={translateAge(adoption.age)}
                icon={<FaBirthdayCake />}
              />
              <InfoItem
                label="Género"
                value={translateGenre(adoption.genre)}
                icon={
                  adoption.genre.toLowerCase() === "female" ? (
                    <FaVenus />
                  ) : (
                    <FaMars />
                  )
                }
              />
            </div>

            <div className="card-gradient-border rounded-2xl bg-background/80 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Sobre {adoption.name}
              </h3>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                {adoption.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/contact?adoption=${adoption.name}`}
                className="block w-full"
              >
                <button className="hover-lift group h-14 w-full rounded-xl bg-gradient-to-r from-primary to-warm-orange text-lg font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:brightness-110">
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
  <div className="card-gradient-border rounded-2xl bg-background/80 p-4 backdrop-blur-sm">
    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="font-semibold text-foreground">{value}</p>
  </div>
);

export default AdoptionDetailPage;
