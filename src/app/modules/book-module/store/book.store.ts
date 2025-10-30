import { BooksView } from "@book-module";

export interface BookState {
  items: BooksView[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  maxResults: number;
  currentPage: number;
  windowSize: number;
  startIndex: number;
}