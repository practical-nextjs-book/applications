import { LoadingSpinner } from "./";
import type { Meta, StoryObj } from "@storybook/react";
import type {} from "@storybook/addon-interactions";

const meta = {
  component: LoadingSpinner,
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Xsmall: Story = {
  args: { size: "xsmall" },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Medium: Story = {
  args: { size: "medium" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const White: Story = {
  args: { color: "white" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
