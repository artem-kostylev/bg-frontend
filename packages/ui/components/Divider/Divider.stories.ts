import type { Meta, StoryObj } from "@storybook/vue3";
import { Divider } from "@ui/components";

const meta: Meta<typeof Divider> = {
    title: "Ui/Divider",

    component: Divider,

    argTypes: {
        dashed: { control: "boolean", defaultValue: false },
    },
};

export default meta;

export const Default: StoryObj<typeof Divider> = {};

export const Dashed: StoryObj<typeof Divider> = {
    args: {
        dashed: true,
    },
};
