import { Icon, type Props } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Icon,
  args: {
    type: "account",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

function storyFactory(type: Props["type"]): Story {
  return { args: { type } };
}

export const Account = storyFactory("account");
export const Alert = storyFactory("alert");
export const Camera = storyFactory("camera");
export const Comment = storyFactory("comments");
export const Gear = storyFactory("gear");
export const HeartBorder = storyFactory("heart-border");
export const Heart = storyFactory("heart");
export const Home = storyFactory("home");
export const PaperPlane = storyFactory("paper-plane");
export const Photos = storyFactory("photos");
export const TrashBox = storyFactory("trash-box");
export const Upload = storyFactory("upload");
export const User = storyFactory("user");
export const Zoom = storyFactory("zoom");
