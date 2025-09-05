import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCategories } from '../../types/book';

@Component({
  selector: 'app-book-category-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './book-category-dropdown.component.html',
  styleUrls: ['./book-category-dropdown.component.css']
})
export class BookCategoryDropdownComponent implements OnInit {

  readonly categories: string[] = Object.values(BookCategories);
  selectedCategoryControl = new FormControl('');

  ngOnInit(): void {
    console.log(this.selectedCategoryControl.value)
  }
  
}