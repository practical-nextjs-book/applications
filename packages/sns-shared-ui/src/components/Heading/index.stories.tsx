import { Heading } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Heading,
  args: { children: "見出し" },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: { level: 1 },
};

export const H2: Story = {
  args: { level: 2 },
};

export const H3: Story = {
  args: { level: 3 },
};

export const H4: Story = {
  args: { level: 4 },
};

export const H5: Story = {
  args: { level: 5 },
};

export const H6: Story = {
  args: { level: 6 },
};

export const Xsmall: Story = {
  args: { level: 1, size: "xsmall" },
};

export const Small: Story = {
  args: { level: 1, size: "small" },
};

export const Medium: Story = {
  args: { level: 1, size: "medium" },
};

export const Large: Story = {
  args: { level: 1, size: "large" },
};
