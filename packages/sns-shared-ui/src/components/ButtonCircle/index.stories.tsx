import { ButtonCircle } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ButtonCircle,
} satisfies Meta<typeof ButtonCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Small: Story = {
  args: { size: "small" },
};

export const Medium: Story = {
  args: { size: "medium" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Orange: Story = {
  args: { color: "orange" },
};
