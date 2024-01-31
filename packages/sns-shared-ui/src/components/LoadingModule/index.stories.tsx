import { LoadingModule } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LoadingModule,
  parameters: {
    backgrounds: { default: "light" },
  },
} satisfies Meta<typeof LoadingModule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
