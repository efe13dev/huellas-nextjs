// Script para agregar noticias de ejemplo con diferentes tipos
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sampleNews = [
  {
    id: "news-urgente-1",
    title: "¡URGENTE! Perro herido necesita cirugía inmediata",
    content:
      "Un perro mestizo fue encontrado con heridas graves en la zona norte de la ciudad. Necesita cirugía urgente para salvar su vida. Los veterinarios estiman que el costo será de 800€. Cualquier donación es bienvenida para ayudar a este pequeño luchador. El perro está actualmente en la clínica veterinaria San Francisco recibiendo cuidados intensivos.",
    date: "2024-01-15T10:30:00Z",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop",
    type: "Urgente",
  },
  {
    id: "news-perdido-1",
    title: "Se busca: Luna, Golden Retriever perdida en el parque central",
    content:
      "Luna es una Golden Retriever de 3 años que se perdió el pasado sábado en el parque central. Lleva collar azul con su nombre y número de teléfono. Es muy cariñosa y responde a su nombre. Si la has visto, por favor contacta inmediatamente al 612-345-678. Su familia la está buscando desesperadamente.",
    date: "2024-01-14T16:45:00Z",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
    type: "Perdido",
  },
  {
    id: "news-encontrado-1",
    title: "¡Buenas noticias! Max ha sido encontrado y reunido con su familia",
    content:
      "Después de 5 días de búsqueda intensiva, Max, el pastor alemán que se había perdido, fue encontrado sano y salvo. Una familia lo encontró refugiándose bajo un puente y reconoció las fotos que habíamos compartido. Max ya está de vuelta en casa con su familia, quien no puede estar más agradecida por toda la ayuda recibida.",
    date: "2024-01-13T14:20:00Z",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop",
    type: "Encontrado",
  },
  {
    id: "news-adopcion-1",
    title: "Historia de éxito: Bella encuentra su hogar para siempre",
    content:
      "Bella, la gata que rescatamos hace 3 meses, finalmente ha encontrado su familia perfecta. Después de un proceso de adopción cuidadoso, ahora vive feliz con una pareja joven que le da todo el amor que merece. Esta es la razón por la que hacemos este trabajo: ver a estos angelitos encontrar el amor que tanto necesitan.",
    date: "2024-01-12T11:15:00Z",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
    type: "Adopción",
  },
  {
    id: "news-evento-1",
    title: "Jornada de adopción este sábado en el centro comercial",
    content:
      "Este sábado 20 de enero estaremos en el centro comercial Plaza Norte de 10:00 a 18:00 con varios perritos y gatitos buscando hogar. Ven a conocerlos, tal vez encuentres a tu nuevo mejor amigo. También tendremos información sobre cuidado responsable de mascotas y productos para el cuidado animal a precios especiales.",
    date: "2024-01-11T09:00:00Z",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
    type: "Evento",
  },
  {
    id: "news-salud-1",
    title: "Campaña de vacunación gratuita para mascotas de bajos recursos",
    content:
      "En colaboración con la clínica veterinaria municipal, ofrecemos vacunación gratuita para mascotas de familias con recursos limitados. La campaña incluye vacunas básicas, desparasitación y revisión general. Las citas se pueden solicitar llamando al 900-123-456. Es importante mantener a nuestras mascotas sanas y protegidas.",
    date: "2024-01-10T13:30:00Z",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop",
    type: "Salud",
  },
  {
    id: "news-noticia-1",
    title: "Nuevo refugio temporal abre sus puertas en el distrito sur",
    content:
      "Gracias a las donaciones recibidas el mes pasado, hemos podido abrir un nuevo refugio temporal en el distrito sur de la ciudad. Este espacio nos permitirá albergar hasta 20 animales adicionales mientras encuentran hogar. El refugio cuenta con todas las comodidades necesarias y un equipo de voluntarios dedicados al cuidado de los animales.",
    date: "2024-01-09T15:45:00Z",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
    type: "Noticia",
  },
];

async function addSampleNews() {
  try {
    console.log("Agregando noticias de ejemplo...");

    for (const news of sampleNews) {
      await client.execute({
        sql: `INSERT OR REPLACE INTO news (id, title, content, date, image, type) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [news.id, news.title, news.content, news.date, news.image, news.type],
      });
      console.log(`✅ Agregada: ${news.title} (${news.type})`);
    }

    console.log("\n🎉 ¡Todas las noticias de ejemplo han sido agregadas exitosamente!");
    console.log("\nTipos de noticias agregadas:");
    console.log("- Urgente (rojo) 🚨");
    console.log("- Perdido (amarillo/naranja) 🔍");
    console.log("- Encontrado (verde) ✅");
    console.log("- Adopción (púrpura/rosa) 💜");
    console.log("- Evento (azul) 📅");
    console.log("- Salud (verde azulado) 🏥");
    console.log("- Noticia (gris) 📰");
  } catch (error) {
    console.error("❌ Error agregando noticias:", error);
  } finally {
    process.exit(0);
  }
}

addSampleNews();
