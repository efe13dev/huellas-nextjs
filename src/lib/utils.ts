import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Función auxiliar para traducir la edad
export const translateAge = (age: string): string => {
  switch (age.toLowerCase()) {
    case "puppy":
      return "Cachorro";
    case "young":
      return "Adulto Joven";
    case "adult":
      return "Adulto";
    case "senior":
      return "Anciano";
    default:
      return age; // Devuelve el valor original si no coincide con ningún caso
  }
};

// Función auxiliar para traducir el tamaño
export const translateSize = (size: string): string => {
  switch (size.toLowerCase()) {
    case "small":
      return "Pequeño";
    case "medium":
      return "Mediano";
    case "big":
      return "Grande";
    default:
      return size;
  }
};

// Función auxiliar para traducir el género
export const translateGenre = (genre: string): string => {
  switch (genre.toLowerCase()) {
    case "male":
      return "Macho";
    case "female":
      return "Hembra";
    default:
      return "Desconocido";
  }
};

// Función auxiliar para traducir el tipo de mascota
export const traducirTipo = (type: string): string => {
  switch (type.toLowerCase()) {
    case "dog":
      return "Perro";
    case "cat":
      return "Gato";
    default:
      return "Otro";
  }
};

// Determinar la imagen de respaldo según el tipo de mascota
export const getFallbackImage = (type: string): string => {
  switch (type.toLowerCase()) {
    case "dog":
      return "/card-image-dog.jpg";
    case "cat":
      return "/card-image-cat.jpg";
    default:
      return "/card-image.jpg";
  }
};

// Función auxiliar para formatear la fecha
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
}
