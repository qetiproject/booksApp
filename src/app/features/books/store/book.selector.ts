import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.store';

export const selectBookState = createFeatureSelector<BookState>('books');

export const selectBooks = createSelector(
  selectBookState,
  state => state.items
);

export const selectTotalItems = createSelector(
  selectBookState,
  state => state.totalItems
);

export const selectLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const selectError = createSelector(
  selectBookState,
  state => state.error
);
