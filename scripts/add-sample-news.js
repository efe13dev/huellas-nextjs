import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sampleNews = [
  {
    id: "news-001",
    title:
      "Rescatada una perra con sus seis cachorros abandonados en una zona industrial",
    content:
      "Esta mañana hemos rescatado a Chispa, una perra mestiza de unos 3 años, junto con sus seis cachorros recién nacidos. Fueron encontrados en malas condiciones dentro de una caja de cartón junto a un polígono industrial. Chispa está muy delgada pero ha cuidado de sus pequeños con todo su instinto. Todos están siendo atendidos por nuestro equipo veterinario y se encuentran estables. Necesitamos hogares de acogida urgentemente para poder separarlos cuando los cachorros desteten.",
    date: "2026-03-28T09:15:00Z",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
    type: "Urgente",
  },
  {
    id: "news-002",
    title:
      "Se busca a Tobías, gato atigrado desaparecido en el barrio de San Juan",
    content:
      "Tobías es un gato atigrado de 4 años, castrado, con microchip. Desapareció el pasado jueves por la tarde en las inmediaciones de la calle Mayor del barrio de San Juan. Lleva collar antiparasitario azul pero sin chapa. Es tímido con desconocidos pero muy cariñoso en casa. Si lo has visto o tienes alguna pista, contacta con nosotros a través de nuestro formulario o llamando al teléfono de emergencias. Su familia está muy preocupada.",
    date: "2026-03-27T18:30:00Z",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
    type: "Perdido",
  },
  {
    id: "news-003",
    title: "Milka ha sido encontrada tras cuatro días desaparecida",
    content:
      "Buenas noticias: Milka, la perra Border Collie que se perdió el pasado fin de semana durante una excursión por la sierra, ha sido localizada por un grupo de senderistas a unos 6 kilómetros del punto donde se perdió. Estaba deshidratada y con algunas rozaduras, pero sin lesiones graves. Ya ha sido reconocida por nuestros veterinarios y está de vuelta en casa con su familia. Agradecemos enormemente a todas las personas que participaron en la búsqueda y difundieron el aviso.",
    date: "2026-03-26T14:00:00Z",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
    type: "Encontrado",
  },
  {
    id: "news-004",
    title:
      "Rocky, el pastor alemán que esperó dos años, por fin tiene una familia",
    content:
      "Rocky llegó a nuestro refugio hace más de dos años tras ser encontrado vagando por las afueras de la ciudad. Durante todo este tiempo fue uno de nuestros residentes más queridos, siempre esperando junto a la puerta de su jaula con la cola en movimiento. Esta semana, una familia con un amplio jardín lo visitó y fue amor a primera vista. Rocky ya está en su nuevo hogar, disfrutando de largos paseos y un sofá propio. Su historia nos recuerda que siempre hay esperanza para cada uno de nuestros animales.",
    date: "2026-03-25T11:20:00Z",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop",
    type: "Adopción",
  },
  {
    id: "news-005",
    title: "Jornada de puertas abiertas y adopción este sábado en el refugio",
    content:
      "Este sábado 4 de abril abrimos las puertas de nuestro refugio de 10:00 a 14:00 y de 16:00 a 19:00. Podréis conocer a más de 40 perros y 25 gatos que buscan una segunda oportunidad. También habrá un mercadillo solidario, talleres de educación canina para niños y una charla sobre tenencia responsable a las 12:00. La entrada es libre y os esperamos a todos. Si no puedes adoptar, recuerda que el apadrinamiento y el voluntariado son formas estupendas de ayudar.",
    date: "2026-03-24T08:00:00Z",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
    type: "Evento",
  },
  {
    id: "news-006",
    title:
      "Campaña de esterilización gratuita para gatos de colonias controladas",
    content:
      "Desde Huellas ponemos en marcha una nueva campaña de esterilización gratuita dirigida a los alimentadores y cuidadores de colonias felinas registradas. El objetivo es controlar la superpoblación de gatos callejeros de forma ética y responsable. Las cirugías se realizarán en la Clínica Veterinaria del Sur gracias a un acuerdo de colaboración. Puedes solicitar cita enviando un correo a esterilizacion@huellas.es indicando la ubicación de la colonia y el número aproximado de ejemplares.",
    date: "2026-03-23T10:45:00Z",
    image:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop",
    type: "Salud",
  },
  {
    id: "news-007",
    title:
      "Aprobada la ampliación de nuestras instalaciones gracias a las donaciones",
    content:
      "Nos complace anunciar que el Ayuntamiento ha aprobado la licencia de obras para ampliar nuestras instalaciones. El nuevo módulo incluirá una sala de cuarentena, un espacio de rehabilitación para animales con problemas de comportamiento y una zona de socialización para gatos. Las obras comenzarán en mayo y se prevé que finalicen antes de finales de año. Este proyecto ha sido posible gracias a la generosidad de todos nuestros donantes y socios colaboradores.",
    date: "2026-03-22T16:30:00Z",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
    type: "Noticia",
  },
  {
    id: "news-008",
    title: "Gatito de tres meses necesita operación de cadera con urgencia",
    content:
      "Pelusa, un gatito blanco de tres meses que acogimos la semana pasada, ha sido diagnosticado con una luxación congénita de cadera que requiere intervención quirúrgica inmediata para que pueda caminar sin dolor. El coste estimado de la operación y la rehabilitación posterior es de 650 euros. Hemos abierto una recogida de fondos y cualquier aportación, por pequeña que sea, marca la diferencia. Pelusa es un pequeño luchador lleno de energía que merece una vida sin dolor.",
    date: "2026-03-21T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop",
    type: "Urgente",
  },
  {
    id: "news-009",
    title: "Se busca a Duna, galga despistada en los alrededores del embalse",
    content:
      "Duna es una galga española de color leonado, de unos 5 años. Se escapó ayer por la tarde durante un paseo cerca del embalse municipal. Lleva collar rojo con placa identificativa pero su localizador GPS se quedó sin batería. Es muy asustadiza y es probable que se esconda si intentan acercarse. Si la ves, no la persigas: llama al 612 345 678 e intenta mantenerla a la vista. Comparte este aviso para ayudarnos a encontrarla.",
    date: "2026-03-20T20:15:00Z",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop",
    type: "Perdido",
  },
  {
    id: "news-010",
    title: "Tres gatitos abandonados en un contenedor han encontrado hogar",
    content:
      "Hace un mes rescatamos a tres gatitos de apenas dos semanas que habían sido arrojados dentro de un contenedor de basura en un parque de la ciudad. Gracias al cuidado incansable de nuestra voluntaria María, los tres han sobrevivido y crecido sanos. Esta semana los tres han sido adoptados por familias que los siguieron desde el primer día a través de nuestras redes sociales. Triste inicio, pero un final feliz que nos da fuerzas para seguir adelante.",
    date: "2026-03-19T13:00:00Z",
    image:
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop",
    type: "Adopción",
  },
  {
    id: "news-011",
    title: "II Carrera Solidaria por los Animales: inscripción abierta",
    content:
      "Ya está abierta la inscripción para la segunda edición de la Carrera Solidaria por los Animales, que se celebrará el domingo 19 de abril a las 9:00 en el Parque del Oeste. Habrá dos distancias: 5 km para corredores y 2 km para caminantes y familias con mascotas. El dorsal cuesta 12 euros y la recaudación íntegra se destinará a la manutención y atención veterinaria de los animales del refugio. Además, los primeros 200 inscritos recibirán una camiseta conmemorativa. Inscríbete en nuestra web.",
    date: "2026-03-18T10:00:00Z",
    image:
      "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800&h=600&fit=crop",
    type: "Evento",
  },
  {
    id: "news-012",
    title:
      "La leishmaniasis canina: cómo prevenir esta enfermedad durante la temporada de mosquitos",
    content:
      "Con la llegada del buen tiempo aumentan los casos de leishmaniasis, una enfermedad parasitaria transmitida por la picadura del flebótomo que puede ser grave para nuestros perros. Desde Huellas recomendamos usar collares repelentes, pipetas mensuales específicas y la vacunación en zonas endémicas. Si observas que tu perro pierde peso, tiene lesiones en la piel o bebe más agua de lo habitual, acude al veterinario. La detección temprana es fundamental para un tratamiento eficaz.",
    date: "2026-03-17T09:30:00Z",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&h=600&fit=crop",
    type: "Salud",
  },
  {
    id: "news-013",
    title:
      "Bruno, el mestizo que nadie quería por ser mayor, demuestra que la edad es solo un número",
    content:
      'Bruno tiene 9 años y lleva ocho meses en el refugio. Muchas familias lo descartaban al ver su edad, pero quienes lo conocen saben que es el perro más cariñoso y tranquilo del mundo. Le basta con un par de paseos diarios y un rincón donde descansar. Esta semana una mujer jubilada lo ha visitado, se han sentado juntos en el patio durante una hora y al marcharse dijo: "Él es el que estaba buscando". Bruno se va a casa la semana que viene. Los perros mayores tienen mucho amor que dar.',
    date: "2026-03-16T15:45:00Z",
    image:
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=800&h=600&fit=crop",
    type: "Adopción",
  },
  {
    id: "news-014",
    title:
      "Colaboración con la Policía Local para el rescate de un perro atrapado en un barranco",
    content:
      "Ayer por la tarde nuestro equipo de emergencias colaboró con la Policía Local en el rescate de un perro que había caído por un terraplén de unos 4 metros de altura en las afueras de la ciudad. El animal, un mestizo de mediano tamaño al que hemos llamado Valentín, estaba atrapado entre la vegetación y no podía subir por sí solo. El rescate duró más de dos horas y se saldó con éxito. Valentín tiene una fractura en una pata delantera que será operada en los próximos días.",
    date: "2026-03-15T19:00:00Z",
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=600&fit=crop",
    type: "Noticia",
  },
  {
    id: "news-015",
    title: "Necesitamos hogares de acogida para la época de cría",
    content:
      "Cada primavera recibimos decenas de cachorros y gatitos que necesitan atención especializada las 24 horas. Nuestro refugio no tiene recursos para darles los cuidados individualizados que requieren. Por eso pedimos hogares de acogida temporales que puedan dedicar tiempo y cariño a estos pequeños durante unas semanas. Proporcionamos toda la comida, material veterinario y asistencia necesaria. Si tienes espacio y tiempo, escríbenos y te explicamos cómo funciona el proceso de acogida.",
    date: "2026-03-14T11:00:00Z",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&h=600&fit=crop",
    type: "Urgente",
  },
  {
    id: "news-016",
    title:
      "Encuentro al gato atigrado Tobías: estaba escondido en un garaje cercano",
    content:
      "Tobías, el gato atigrado que desapareció hace diez días en el barrio de San Juan, ha sido encontrado por un vecino dentro de su garaje. Al parecer se coló por una ventana entreabierta y no podía salir. Está un poco más delgado de lo normal pero en perfecto estado de salud. Su familia ha pasado a recogerlo esta misma tarde y no podían estar más felices. Gracias a todos los que compartisteis el aviso.",
    date: "2026-03-13T17:30:00Z",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop",
    type: "Encontrado",
  },
  {
    id: "news-017",
    title: "Más de 200 animales adoptados en el primer trimestre de 2026",
    content:
      "Cerramos el primer trimestre del año con un balance muy positivo: 143 perros y 68 gatos han encontrado hogar definitivo a través de nuestra asociación. Es la cifra más alta de los últimos cinco años para un primer trimestre. Queremos agradecer a todas las familias adoptantes, voluntarios, donantes y colaboradores que hacen posible esta labor. Aún quedan muchos animales esperando su oportunidad, así que seguid difundiendo y compartiendo sus historias.",
    date: "2026-03-12T10:00:00Z",
    image:
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=800&h=600&fit=crop",
    type: "Noticia",
  },
];

async function addSampleNews() {
  try {
    console.log("Limpiando noticias anteriores...");
    await client.execute("DELETE FROM news");
    console.log("Insertando nuevas noticias...\n");

    for (const news of sampleNews) {
      await client.execute({
        sql: "INSERT INTO news (id, title, content, date, image, type) VALUES (?, ?, ?, ?, ?, ?)",
        args: [
          news.id,
          news.title,
          news.content,
          news.date,
          news.image,
          news.type,
        ],
      });
      console.log(`  ${news.type.padEnd(12)} | ${news.title}`);
    }

    console.log(`\n${sampleNews.length} noticias insertadas correctamente.`);
  } catch (error) {
    console.error("Error insertando noticias:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

addSampleNews();
