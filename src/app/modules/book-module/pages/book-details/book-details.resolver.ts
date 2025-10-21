import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { BookDetails, BookService } from "@book-module";
import { firstValueFrom } from "rxjs";

export const BookDetailsResolver: ResolveFn<BookDetails > =
    async (route: ActivatedRouteSnapshot) => {
        const bookId = route.paramMap.get("id");
        const bookService = inject(BookService);
        const router = inject(Router);

        if(!bookId) {
            router.navigate(['/books']);
            return Promise.reject("No BookId"); // not happen resolve
        }

        try{
            const book = await firstValueFrom(bookService.bookById(bookId));
            if(!book) {
                router.navigate(['/books']);
                return Promise.reject("Book not found");
            }
            return book;
        }
        catch(err) {
            router.navigate(['/books'])
            return Promise.reject(err);
        }
       
    }