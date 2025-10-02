import { createAction, props } from "@ngrx/store";
import { BooksView } from "../types/book";

export const LoadBooks = createAction(
    '[Books] Load Books',  
    props<{ query: string; maxResults: number; startIndex: number }>()
);
export const LoadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{  books: { items: BooksView[]; totalItems: number }, maxResults: number; startIndex: number  }>()
);
export const LoadBooksFailure = createAction(
    '[Books] Load Books Failure', 
    props<{error: string}>()
);