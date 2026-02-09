import Link from "next/link";
import React, { Suspense } from "react";

import { type TursoDataResponse } from "@/types";

import AnimalCardSkeletonGrid from "@/components/AnimalCardSkeletonGrid";
import { Badge } from "@/components/ui/badge";
import { getAdoptions } from "@/db/clientTurso";
import { getFallbackImage, translateSize } from "@/lib/utils";

async function AnimalsGrid(): Promise<React.JSX.Element> {
  const data: TursoDataResponse = await getAdoptions();
  const animals = data.rows;

  return (
    <>
      {animals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {animals.map((animal, index) => (
            <Link
              key={animal.id}
              href={`/adoptions/${animal.id}`}
              className={`card-gradient-border hover-lift group animate-slide-in delay-${index % 6} flex flex-col overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm transition-all duration-500`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={(() => {
                    if (typeof animal.photos === "string" && animal.photos.trim() !== "") {
                      try {
                        const photosArray = JSON.parse(animal.photos);

                        return Array.isArray(photosArray) && photosArray.length > 0
                          ? photosArray[0]
                          : getFallbackImage(animal.type);
                      } catch (_e) {
                        return getFallbackImage(animal.type);
                      }
                    }

                    return getFallbackImage(animal.type);
                  })()}
                  alt={animal.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                    {animal.name}
                  </h3>
                </div>
                <div className="absolute right-3 top-3">
                  <Badge className="border-0 bg-white/90 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm">
                    {translateSize(animal.size)}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {animal.description}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary transition-colors group-hover:text-warm-orange">
                  <span>Conocer a {animal.name}</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">No hay animales disponibles</h3>
          <p className="mx-auto max-w-md text-muted-foreground">
            En este momento no tenemos animales disponibles para adopción, pero vuelve pronto.
          </p>
        </div>
      )}
    </>
  );
}

export default function Adoptions(): React.JSX.Element {
  return (
    <div className="section-decorated min-h-screen bg-gradient-to-b from-cream/40 via-background to-background">
      <div className="container relative mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Encuentra tu compañero ideal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Animales en <span className="text-gradient">adopción</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Cada uno de estos animales está esperando una familia que les brinde el amor y cuidado que merecen.
          </p>
        </div>

        <Suspense fallback={<AnimalCardSkeletonGrid />}>
          <AnimalsGrid />
        </Suspense>
      </div>
    </div>
  );
}
