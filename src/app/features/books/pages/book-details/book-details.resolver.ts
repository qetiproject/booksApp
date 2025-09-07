import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { BookService } from "../../services/book.service";

export const BookDetailsResolver: ResolveFn<unknown > =
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const bookId = route.paramMap.get("id");
        if(!bookId) return null;
        
        const bookService = inject(BookService);

        try{
            return await firstValueFrom(bookService.bookById(bookId));
        }
        catch(err) {
            return err;
        }
       
    }