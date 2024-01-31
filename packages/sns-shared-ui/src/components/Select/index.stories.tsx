import { Select } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Select,
  args: {
    children: (
      <>
        <option value="">選択してください</option>
        <option value="a">選択肢A</option>
        <option value="b">選択肢B</option>
        <option value="c">選択肢C</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
