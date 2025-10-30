import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DebounceSearchComponent } from '@components';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const meta: Meta<DebounceSearchComponent> = {
  title: 'Components/DebounceSearch',
  component: DebounceSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    searchValue: { action: 'searchValue emitted' },
    clear: { action: 'clear clicked' },
  },
};

export default meta;
type Story = StoryObj<DebounceSearchComponent>;

// Mock signal value
const searchSignal = signal('');

export const Empty: Story = {
  render: (args) => ({
    props: {
      ...args,
      // bind FormControl to empty string
      searchControl: new FormControl(''),
      // bind signal to Storybook action
      searchValue: {
        emit: (val: string) => args.searchValue(val),
      },
      clear: () => args.clear(),
    },
  }),
};

export const WithText: Story = {
  render: (args) => ({
    props: {
      ...args,
      searchControl: new FormControl('Angular'),
      searchValue: {
        emit: (val: string) => args.searchValue(val),
      },
      clear: () => args.clear(),
    },
  }),
};
