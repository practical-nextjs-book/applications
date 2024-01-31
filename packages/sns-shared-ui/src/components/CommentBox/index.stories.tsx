import { CommentBox } from "./";
import type { Meta, StoryObj } from "@storybook/react";
import type {} from "@storybook/addon-interactions";

const meta = {
  component: CommentBox,
  args: {
    inputProps: { name: "comment", placeholder: "コメントを入力" },
  },
} satisfies Meta<typeof CommentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
