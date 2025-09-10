import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from "../../features/books/components/book-card/book-card.component";
import { FavouriteBookService } from './services/favouriteBook.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  favouriteBookService = inject(FavouriteBookService);

  favouriteBooks = this.favouriteBookService.loadFavouriteBooks();

  ngOnInit(): void {
    console.log(this.favouriteBooks)
  }
}
