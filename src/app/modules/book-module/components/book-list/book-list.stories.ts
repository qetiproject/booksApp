import { CommonModule } from '@angular/common';
import { BookCardComponent } from '@book-module-components/book-card/book-card.component';
import { provideMockStore } from '@ngrx/store/testing';
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
];

const meta: Meta<BookListComponent> = {
  title: 'Components/BookList',
  component: BookListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BookCardComponent],
      providers: [
        provideMockStore({
          initialState: {
            books: { entities: mockBooks, loaded: true },
          },
        }),
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
