import { createReducer, on } from "@ngrx/store";
import { LoadBooks, LoadBooksFailure, LoadBooksSuccess } from "./book.action";
import { BookState } from "./book.store";

export const initialBookState: BookState = {
    items: [],
    totalItems: 0,
    loading: false,
    error: null,
    currentPage: 0,
    maxResults: 10 
}

export const BookReducer = createReducer(
    initialBookState,

    on(LoadBooks, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(LoadBooksSuccess, (state, { books, maxResults, startIndex }) => ({
        ...state,
        items: startIndex === 0 
            ? books.items 
            : [...state.items, ...books.items],
        totalItems: books.totalItems,
        maxResults,
        currentPage: startIndex /maxResults + 1,
        loading: false,
        error: null
    })),

    on(LoadBooksFailure, (state, { error }) => ({
        ...state,
        items: [],
        totalItems: 0,
        loading: false,
        error
    }))
);
