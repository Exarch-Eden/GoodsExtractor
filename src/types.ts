export interface Book {
  id: string,
  title?: string,
  cover?: string,
  artist?: string,
  pages?: Pages,
}

export type Pages = string[];