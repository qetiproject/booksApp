import { FormControl } from "@angular/forms";

export interface ReviewForm { 
    comment: FormControl<string>; 
    star: FormControl<number>; 
}

export interface Review {
    userId: number;
    bookId: string;
    userFullname: string;
    rating: number;
    comment: string;
}