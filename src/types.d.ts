export interface AnimalType {
  id: string;
  name: string;
  age: number;
  register_date: string;
  adopted: boolean;
  description: string;
  photos?: string;
  type: string;
}

export interface AdoptionResultSet {
  columns: string[];
  columnTypes: string[];
  rows: Array<{
    id: number;
    name: string;
    age: number;
    register_date: string;
    adopted: number;
    description: string;
    photos: string;
    type: string;
  }>;
  rowsAffected: number;
  lastInsertRowid?: number;
}
