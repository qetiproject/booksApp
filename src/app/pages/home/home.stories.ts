import { signal } from '@angular/core';
import { HomeComponent } from '@pages';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { BookCategoryDropdownComponent, BookListComponent } from '@book-module';
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
