import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { BookService } from "../services/book.service";
import { LoadBooks, LoadBooksFailure, LoadBooksSuccess } from "./book.action";

@Injectable()
export class BookEffect {
    actions$ = inject(Actions);
    bookService = inject(BookService);

    loadBooksByCategory$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LoadBooks),
            switchMap(action => 
                this.bookService.loadBooksByCategory(action.query, action.pageSize || 6, action.page || 0).pipe(
                    map(books => LoadBooksSuccess({
                        books,
                        pageSize: action.pageSize || 6,
                        page: action.page || 0,
                    })),
                    catchError((error) => of(LoadBooksFailure({error: error.message })))
                )
            )
        )
    )
}