import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    args: { default: "qweqw" },
};

export default meta;

export const Base: StoryObj<typeof Button> = {
    args: {
        variant: "base",
    },
};
