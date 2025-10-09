import { Component, input } from "@angular/core";
import { Review } from "@book-module/types";

@Component({
    selector: 'app-review-item',
    standalone: true,
    imports: [],
    templateUrl: './review-item.component.html',
})
export class ReviewItemComponent {
    review = input.required<Review>()
}