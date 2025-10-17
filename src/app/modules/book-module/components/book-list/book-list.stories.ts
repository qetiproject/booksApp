import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { BookCardComponent } from '@book-module-components/book-card/book-card.component';
import { BookFacadeService } from '@book-module/services/book.facade';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BookListComponent } from './book-list.component';

const mockBooks = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    authors: ['Andy Hunt', 'Dave Thomas'],
    language: 'en',
    imageLinks: {
        thumbnail:
        'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
        smallThumbnail:
        'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
    },
    categories: ['Programming'],
  },
  {
    id: '1',
    title: 'Fundamentals of Computers',
    authors: ['Andy Hunt', 'Dave Thomas'],
    language: 'en',
    imageLinks: {
        thumbnail:
        'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
        smallThumbnail:
        'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
    },
    categories: ['Programming'],
  },
];

const mockBookFacadeService = {
    books: signal(mockBooks), 
    onAddInFavouriteEvent: { action: 'Add to favourite clicked'},
};

const meta: Meta<BookListComponent> = {
  title: 'Components/BookList',
  component: BookListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BookCardComponent],
      providers: [
        {
          provide: BookFacadeService,
          useValue: mockBookFacadeService
        },
      ],
    }),
  ],
  argTypes: {
    onAddInFavouriteEvent: { action: 'Add to favourite clicked' },
  },
};

export default meta;
type Story = StoryObj<BookListComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      books: mockBooks,
      onAddInFavouriteEvent: {action: 'Add to favourite clicked'},
    },
  }),
};
