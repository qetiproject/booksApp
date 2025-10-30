import { inject, Injectable } from "@angular/core";
import * as UserSelectors from '@auth-module';
import { BookService, LoadBooks, LoadBooksFailure, LoadBooksSuccess } from "@book-module";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, of, switchMap, take, withLatestFrom } from "rxjs";

@Injectable()
export class BookEffect {
    actions$ = inject(Actions);
    #store = inject(Store);
    #bookService = inject(BookService);

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadBooks),
            withLatestFrom(this.#store.select(UserSelectors.selectActiveUserId).pipe(
                filter((id): id is number => id !== null),
                take(1),
            )),
            switchMap(([action, userId]) => {                
                const apiCall$ =
                    action.query.length > 3
                    ? this.#bookService.searchBooksByName(
                        action.query,
                        action.maxResults,
                        action.startIndex,
                        userId
                    )
                    : this.#bookService.loadBooksByCategory(
                        action.query,
                        action.maxResults,
                        action.startIndex,
                        userId
                    );

                return apiCall$.pipe(
                    map(books =>
                        LoadBooksSuccess({
                            books,
                            maxResults: action.maxResults,
                            startIndex: action.startIndex
                        })
                    ),
                    catchError(error => of(LoadBooksFailure({ error: error.message })))
                );
            })
        )
    );

}