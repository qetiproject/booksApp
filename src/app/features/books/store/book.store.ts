import { BooksView } from "../types/book";

export interface BookState {
  items: BooksView[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  pageSize?: number;
  currentPage?: number;
}