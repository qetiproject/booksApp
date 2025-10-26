import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { SafeUserData, UserService } from "@auth-module";
import { BookDetails, BookDetailsResult, BookResult, BooksView, LoadBooks, LoadBooksFailure } from "@book-module";
import { SkipLoading } from "@features";
import { Store } from "@ngrx/store";
import { FavouriteBookService } from "@pages/wishlist/services/favourite-book.service";
import { PagingService } from "components/paging/paging.service";
import { map, Observable, shareReplay } from "rxjs";
import { selectBooks } from "../../store/book.selector";

@Injectable({
    providedIn: 'root'
})
export class BookFacadeService {
    http = inject(HttpClient);
    #favouriteService = inject(FavouriteBookService);
    #store = inject(Store);
    #pagingService = inject(PagingService);
    #userService = inject(UserService);
    user: SafeUserData | null = null;
    books = toSignal(this.#store.select(selectBooks), { initialValue: [] });

    constructor() {
        this.getUser();
    }

    private getUser() {
        this.#userService.getCurrentUserSafeData().pipe(
            map(user => this.user = user)
        ).subscribe()
    }

    private getStartIndex() {
        return this.#pagingService.currentPage() - 1;
    }
    
    searchBooksByName(
        name: string | null, 
        maxResults: number, 
        startIndex: number
        ): Observable<{ items: BooksView[]; totalItems: number }> {
        return this.http.get<BookResult>(`/volumes?q=${name}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
            map(response => {
            const items = response.items || [];
            
            const mappedItems: BooksView[] = items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
                language: item.volumeInfo.language || '',
                categories: item.volumeInfo.categories,
                userId: this.user!.userId
            }));

            return {
                items: mappedItems,
                totalItems: response.totalItems || 0
            };
            }), shareReplay(1)
        );
    }
    
    loadBooksByCategory(
        category: string | null, 
        maxResults: number, 
        startIndex: number
        ): Observable<{ items: BooksView[]; totalItems: number }> {

        return this.http.get<BookResult>(`/volumes?q=${category}&maxResults=${maxResults}&startIndex=${startIndex}`).pipe(
            map(response => {
            const items = response.items || [];
            const mappedItems: BooksView[] = items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                imageLinks: item.volumeInfo.imageLinks || { thumbnail: '', smallThumbnail: '' },
                language: item.volumeInfo.language || '',
                categories: item.volumeInfo.categories,
                userId:1
            }));

            return {
                items: mappedItems,
                totalItems: response.totalItems || 0
            };
            }),
            shareReplay(1)
        );
    }
    
    bookById(id: string, userId: number): Observable<BookDetails> {
        return this.http.get<BookDetailsResult>(`/volumes/${id}`, {
            context: new HttpContext().set(SkipLoading, true)
        }).pipe(
            map(response => {
            const volumeInfo = response.volumeInfo;
            return { 
                id: response.id,
                saleInfo: {
                ...response.saleInfo
                },
                volumeInfo: {
                    ...response.volumeInfo,
                    publisher: volumeInfo?.publisher || '',
                    publishedDate: volumeInfo?.publishedDate || '',
                    description: volumeInfo?.description || '',
                    pageCount: volumeInfo?.pageCount || 0,
                    printType: volumeInfo?.printType || '',
                    categories: volumeInfo?.categories || [],
                    previewLink: volumeInfo?.previewLink || ''
                },
                userId
            };
            })
        );
    }
      
    getBooks(query: string | null, category: string | null): void {
        if (query && query.length > 3) {
            category = null;
            this.#store.dispatch(LoadBooks({
                query,
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else if (category) {
            query = null;
            this.#store.dispatch(LoadBooks({
                query: category, 
                maxResults: this.#pagingService.maxResults(),
                startIndex: this.getStartIndex()
            }));
        } else {
            this.#store.dispatch(LoadBooksFailure({ error: 'No query or category selected' }));
        }
    }
   
    // onAddInFavouriteEvent(book: BooksView, userId: number): void {
    //     this.#favouriteService.addBookToFavourite(book, userId);
    // }

    resetPage() {
        this.#pagingService.setCurrentPage();
    }
}