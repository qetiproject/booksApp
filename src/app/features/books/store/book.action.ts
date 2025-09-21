import { createAction, props } from "@ngrx/store";
import { BooksView } from "../types/book";

export const LoadBooks = createAction(
    '[Books] Load Books',  
    props<{ category: string }>()
);
export const LoadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: BooksView[] }>()
);
export const LoadBooksFailure = createAction(
    '[Books] Load Books Failure', 
    props<{error: string}>()
);