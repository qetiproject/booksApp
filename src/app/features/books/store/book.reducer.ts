import { createReducer, on } from "@ngrx/store";
import { LoadBooks, LoadBooksFailure, LoadBooksSuccess } from "./book.action";
import { BookState } from "./book.store";
// https://www.googleapis.com/books/v1/volumes?q=angular&langRestrict=end&orderBy=newest&maxResults=10&startIndex=0

export const initialBookState: BookState = {
    items: [],
    totalItems: 0,
    loading: false,
    error: null
}

export const BookReducer = createReducer(
    initialBookState,
    on(LoadBooks, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(LoadBooksSuccess, (state, { books }) => ({
        ...state,
        items: books,
        totalItems: books.length,
        loading: false,
        error: null
    })),
    on(LoadBooksFailure, (state) => ({
        ...state,
        items: [],
        totalItems: 0,
        loading: false,
        error: null
    }))
)