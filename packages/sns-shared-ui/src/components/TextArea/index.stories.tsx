import { TextArea } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TextArea,
  args: { placeholder: "入力してください" },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
