import { LinkButton } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LinkButton,
  args: { children: "詳細画面へ", href: "/path/to/segment" },
} satisfies Meta<typeof LinkButton>;

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
