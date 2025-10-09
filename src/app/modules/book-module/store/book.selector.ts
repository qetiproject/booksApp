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

export const selectMaxResults = createSelector(
  selectBookState,
  state => state.maxResults 
);

export const selectCurrentPage = createSelector(
  selectBookState,
  state => state.currentPage
);

export const selectWindowSize = createSelector(
  selectBookState,
  state => state.windowSize
)

export const selectStartIndex = createSelector(
  selectBookState,
  state => state.startIndex
)