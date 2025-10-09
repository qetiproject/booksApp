import { Component, computed, input } from "@angular/core";
import { BookDetails } from "../../types/book-details";

@Component({
    selector: 'app-book-info',
    standalone: true,
    imports: [],
    templateUrl: './book-info.component.html',
    host: {
        class: 'md:w-1/3 bg-slate-50 p-6 flex flex-col items-center md:items-start'
    }
})
export class BookInfoComponent {
    book = input.required<BookDetails>();

    readonly thumbnail = computed(() => 
        this.book().volumeInfo.imageLinks?.thumbnail 
        || this.book().volumeInfo.imageLinks?.smallThumbnail 
        || 'assets/default-thumbnail.png'
    );
}