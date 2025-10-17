import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { BookCategoryDropdownComponent } from '@book-module/components/book-category-dropdown/book-category-dropdown.component';
import { BookListComponent } from '@book-module/components/book-list/book-list.component';
import { DebounceSearchComponent } from '@components';
import { HomeComponent } from './home.component';

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
    onSearchEvent: { action: 'Search emitted' },
    onCategorySelectedEvent: { action: 'Category selected emitted' },
  },
};

export default meta;
type Story = StoryObj<HomeComponent>;

export const Default: Story = {
  render: (args) => {
    const searchQuery = signal('');
    const categorySelected = signal<string | null>(null);

    return {
      props: {
        ...args,
        searchQuery,
        categorySelected,
        onSearchEvent: (value: string) => searchQuery.set(value),
        onCategorySelectedEvent: (value: string | null) => categorySelected.set(value),
      },
    };
  },
};
