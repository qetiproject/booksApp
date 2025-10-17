import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { BookCategoryDropdownComponent } from "./book-category-dropdown.component";

const meta: Meta<BookCategoryDropdownComponent> = {
    title: 'Components/Category Dropdown',
    component: BookCategoryDropdownComponent,
    decorators: [
        moduleMetadata({
            imports: []
        })
    ],
    argTypes: {
        categorySelected: { action: 'Category select'}
    }
}

export default meta;
type Story = StoryObj<BookCategoryDropdownComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      categorySelected: args.categorySelected,
    },
  }),
};