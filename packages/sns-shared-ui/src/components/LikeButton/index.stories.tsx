import { LikeButton } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LikeButton,
  args: {
    children: "Are you sure?",
    count: 10,
  },
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const IsSubmitting: Story = {
  args: { isSubmitting: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Xsmall: Story = {
  args: { size: "xsmall" },
};

export const Small: Story = {
  args: { size: "small" },
};
