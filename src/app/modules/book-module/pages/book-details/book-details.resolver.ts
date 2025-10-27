import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { UserSafeInSystem, UserService } from "@auth-module";
import { BookDetails, BookService } from "@book-module";
import { firstValueFrom } from "rxjs";

export const BookDetailsResolver: ResolveFn<BookDetails > =
    async (route: ActivatedRouteSnapshot) => {
        const bookId = route.paramMap.get("id");
        const bookService = inject(BookService);
        const router = inject(Router);
        const userService = inject(UserService);
        const user: UserSafeInSystem | null = userService.getCurrentUserFromStorage();
        
        if(!user || !bookId) {
            router.navigate(['/books']);
            return Promise.reject("No BookId");
        }

        try{
            const book = await firstValueFrom(bookService.bookById(bookId, user.userId));
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