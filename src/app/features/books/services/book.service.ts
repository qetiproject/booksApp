import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const bookApiBase ='https://www.googleapis.com/books/v1/volumes';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  async searchBooks(name: string): Promise<any[]> {
    const books$ = await this.http.get<any[]>(`${bookApiBase}/?q=${name}`);
    const response = await firstValueFrom(books$)
    return response
  }
}
