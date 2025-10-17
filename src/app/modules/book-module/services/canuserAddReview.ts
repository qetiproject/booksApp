import { Review } from "@book-module/types";
import { environment } from "../../../../environments/environment.development";

export function canUserAddReview(userId: number): boolean {
    const reviews = sessionStorage.getItem(environment.BOOK_REVIEWS);
    const reviewList: Review[] = reviews ? JSON.parse(reviews) : null;

    return reviewList?.some(r => r.userId === userId);
}