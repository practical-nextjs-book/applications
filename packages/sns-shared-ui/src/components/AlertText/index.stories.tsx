import { AlertText } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AlertText,
  args: {
    children: "Error!",
  },
} satisfies Meta<typeof AlertText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
