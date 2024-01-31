import { Button } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  args: { children: "確認" },
} satisfies Meta<typeof Button>;

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

export const Orange: Story = {
  args: { color: "orange" },
};

export const Gray: Story = {
  args: { color: "gray" },
};

export const White: Story = {
  args: { color: "white" },
};
