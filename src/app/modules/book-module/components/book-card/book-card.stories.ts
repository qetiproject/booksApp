import { CommonModule } from '@angular/common';
import { BookCardComponent, BooksView } from '@book-module';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<BookCardComponent> = {
  title: 'Components/BookCard',
  component: BookCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BookCardComponent],
    }),
  ],
  argTypes: {
    bookDelete: { action: 'bookDelete emitted' },
    addInFavourite: { action: 'addInFavourite emitted' },
    showDelete: { control: 'boolean' },
    showFavourite: { control: 'boolean' },
    showDetailsBtn: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<BookCardComponent>;

const mockBook: BooksView = {
  id: '1',
  title: 'The Pragmatic Programmer',
  authors: ['author'],
  language: 'en',
  imageLinks: {
    thumbnail:
      'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
    smallThumbnail:
      'https://books.google.com/books/content?id=kt9xxgEACAAJ&printsec=frontcover&img=1&zoom=1',
  },
  categories: ['category']
};

export const Default: Story = {
  args: {
    book: mockBook,
    showDetailsBtn: true,
    showFavourite: true,
    showDelete: false,
  },
};

export const WithFavourite: Story = {
  args: {
    book: mockBook,
    showDetailsBtn: false,
    showFavourite: true,
    showDelete: true,
  },
};

export const WithDelete: Story = {
  args: {
    book: mockBook,
    showDetailsBtn: false,
    showFavourite: false,
    showDelete: true,
  },
};
