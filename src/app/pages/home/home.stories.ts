import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HomeComponent } from './home.component';

import { BookCategoryDropdownComponent } from '@book-module/components/book-category-dropdown/book-category-dropdown.component';
import { BookListComponent } from '@book-module/components/book-list/book-list.component';
import { DebounceSearchComponent } from '@components';

const meta: Meta<HomeComponent> = {
  title: 'Pages/Home',
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DebounceSearchComponent,
        BookCategoryDropdownComponent,
        BookListComponent,
      ],
    }),
  ],
  argTypes: {
    onSearchEvent: { action: 'searchQuery emitted' },
    onCategorySelectedEvent: { action: 'categorySelected emitted' },
  },
};

export default meta;
type Story = StoryObj<HomeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      searchQuery: signal(''), 
      categorySelected: signal(null),
      onSearchEvent: (value: string) => args.onSearchEvent(value),
      onCategorySelectedEvent: (value: string | null) => args.onCategorySelectedEvent(value),
    },
  }),
};
