import { markRaw } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Collapse } from "@ui/components";
import { AirplaneIcon } from "@ui/icons";

const meta: Meta<typeof Collapse> = {
    title: "Ui/Collapse",
    component: Collapse,
    args: {
        title: "Билеты",
        default: "Body",
    },
};

export default meta;

export const Default: StoryObj<typeof Collapse> = {};

export const WithIcon: StoryObj<typeof Collapse> = {
    args: {
        startIcon: markRaw(AirplaneIcon),
    },
};

export const WithDefaultOpen: StoryObj<typeof Collapse> = {
    args: {
        defaultOpen: true,
    },
};
