import { Accounts } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Accounts,
  args: {
    users: [
      {
        id: "1",
        name: "John Doe",
        screenName: "johndoe",
        imageUrl: "/images/account.svg",
      },
      {
        id: "2",
        name: "John Doe",
        screenName: "johndoe",
        imageUrl: "/images/account.svg",
      },
      {
        id: "3",
        name: "John Doe",
        screenName: "johndoe",
        imageUrl: "/images/account.svg",
      },
    ],
  },
} satisfies Meta<typeof Accounts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
