import { Account } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Account,
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoName: Story = {};

export const OnlyName: Story = {
  args: {
    name: "John Doe",
  },
};

export const OnlyScreenName: Story = {
  args: {
    screenName: "johndoe",
  },
};

export const FullName: Story = {
  args: {
    name: "John Doe",
    screenName: "johndoe",
  },
};
