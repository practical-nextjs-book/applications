import { Tag } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Tag,
  args: { children: "花" },
} satisfies Meta<typeof Tag>;

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

export const Gray: Story = {
  args: { color: "gray" },
};

export const White: Story = {
  args: { color: "white" },
};
