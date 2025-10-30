import { BookCategoryDropdownComponent } from "@book-module";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

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