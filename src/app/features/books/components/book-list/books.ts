// import { Component, TemplateRef, ViewChild } from '@angular/core';
// import { BookDetails } from '../types/book-details';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
// })
// export class BookListComponent {
//   books: BookDetails[] = []; // წიგნების API-დან ან service-დან
//   favouriteBooks: BookDetails[] = []; // ფავორიტების ლისტი

//   @ViewChild('featuredTemplate') featuredTemplate!: TemplateRef<any>;
//   @ViewChild('newTemplate') newTemplate!: TemplateRef<any>;
//   @ViewChild('favouritesTemplate') favouritesTemplate!: TemplateRef<any>;

//   currentTemplate!: TemplateRef<any>;

//   ngOnInit() {
//     // დაიწყე featured-ის ჩვენებით
//     this.currentTemplate = this.featuredTemplate;
//   }

//   showTemplate(type: string) {
//     if (type === 'featured') this.currentTemplate = this.featuredTemplate;
//     if (type === 'new') this.currentTemplate = this.newTemplate;
//     if (type === 'favourites') this.currentTemplate = this.favouritesTemplate;
//   }
// }
