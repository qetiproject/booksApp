import { createReducer, on } from "@ngrx/store";
import { LoadBooks, LoadBooksFailure, LoadBooksSuccess, setCurrentPage } from "./book.action";
import { BookState } from "./book.store";

export const initialBookState: BookState = {
    items: [],
    totalItems: 0,
    loading: false,
    error: null,
    currentPage: 1,
    maxResults: 10,
    windowSize: 5,
    startIndex: 0
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
        items: books.items ,
        totalItems: books.totalItems,
        maxResults,
        currentPage: startIndex  + 1,
        startIndex,
        loading: false,
        error: null
    })),

    on(LoadBooksFailure, (state, { error }) => ({
        ...state,
        items: [],
        totalItems: 0,
        loading: false,
        error
    })),
    on(setCurrentPage, (state, { page }) => ({
        ...state,
        currentPage: page
    }))
);
