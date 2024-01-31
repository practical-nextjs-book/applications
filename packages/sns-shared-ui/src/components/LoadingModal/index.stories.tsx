import { LoadingModal } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LoadingModal,
} satisfies Meta<typeof LoadingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const White: Story = {
  args: { color: "white" },
};
