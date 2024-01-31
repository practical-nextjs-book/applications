import { TextField } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TextField,
  args: { placeholder: "入力してください" },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
