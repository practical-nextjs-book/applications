import { Section } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Section,
  args: {
    children: <p>コンテンツ</p>,
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
