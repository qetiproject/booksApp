import { FormControl } from "@angular/forms";

export enum Readly { Read = "Read", Unread = "Not Read Yet" } 

export enum WhenToRead { 
    Today = "Today", 
    In1Week = "In 1 week", 
    In2Weeks = "In 2 Weeks", 
    In1Month = "In 1 month", 
    ThisYear = "This Year" 
} 

export interface ReviewForm { 
    comment: FormControl<string>; 
    star: FormControl<number>; 
}

export interface Review {
    userId: number;
    userFullname: string;
    rating: number;
    comment: string;
}