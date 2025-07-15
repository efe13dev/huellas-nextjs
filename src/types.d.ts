export interface AnimalType {
  id: string;
  name: string;
  age: string;
  register_date: string;
  adopted: boolean;
  description: string;
  photos: string;
  type: string;
  size: string;
  genre: string;
}

export interface TursoDataResponse {
  columns: string[];
  columnTypes: string[];
  rows: AnimalType[];
  rowsAffected: number;
  lastInsertRowid: number | undefined;
}

export interface NewsItem {
  id: string; // UUID
  title: string;
  date: string;
  image?: string;
  content: string;
  type?: string; // Tipo de noticia: 'Noticia', 'Urgente', 'Perdido', etc.
}
