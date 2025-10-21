import { Review } from "@book-module";
import { environment } from "../../../../environments/environment.development";

export function canUserAddReview(bookId: string): boolean {
    const reviews = sessionStorage.getItem(environment.BOOK_REVIEWS);
    const reviewList: Review[] = reviews ? JSON.parse(reviews) : null;

    return reviewList?.some(r => r.bookId === bookId);
}