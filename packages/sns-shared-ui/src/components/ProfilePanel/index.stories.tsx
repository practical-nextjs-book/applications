import { ProfilePanel } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ProfilePanel,
  args: {
    name: "名前",
    screenName: "スクリーンネーム",
    bio: "自己紹介",
  },
} satisfies Meta<typeof ProfilePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
