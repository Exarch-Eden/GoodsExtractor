export interface Book {
  id: string;
  title?: string;
  cover?: string;
  artist?: string;
  pages?: Pages;
  thumbnails?: Pages;
}

export type Pages = string[];

export interface SessionData {
  id: string;
  pages: Pages;
}
