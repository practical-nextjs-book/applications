import { Button } from "../Button";
import { AlertDialogModal } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AlertDialogModal,
  args: {
    title: "削除します",
  },
} satisfies Meta<typeof AlertDialogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    messageNode: "本当に削除しますか？",
    actionsNode: (
      <>
        <Button color="white">キャンセル</Button>
        <Button>はい</Button>
      </>
    ),
  },
};
