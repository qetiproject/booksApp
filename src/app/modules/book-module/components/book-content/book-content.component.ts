import { Component, computed, input } from "@angular/core";
import { BookDetails } from "@book-module";

@Component({
    selector: 'app-book-content',
    standalone: true,
    imports: [],
    templateUrl: './book-content.component.html'
})
export class BookContentComponent {
    book = input.required<BookDetails>();
    readonly authorList = computed(() => this.book().volumeInfo.authors ?? []);
    readonly categoryList = computed(() => this.book().volumeInfo.categories ?? []);
}