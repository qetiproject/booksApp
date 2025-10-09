import { Component, input } from "@angular/core";
import { Review } from "@book-module/types";

@Component({
    selector: 'app-review-list',
    standalone: true,
    imports: [],
    templateUrl: './review-list.component.html',
})
export class ReviewListComponent {
    reviews = input.required<Review[]>()
}