import { markRaw } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Button } from "@ui/components";
import { SearchIcon } from "@ui/icons";

const meta: Meta<typeof Button> = {
    title: "Ui/Button",
    component: Button,
    args: {
        default: "Button",
    },
    argTypes: {
        type: { control: "select", options: ["button", "reset", "submit"], defaultValue: "md" },
        variant: {
            control: "select",
            options: ["base", "primary", "secondary"],
            defaultValue: "base",
        },
        size: { control: "select", options: ["xs", "sm", "md", "lg"], defaultValue: "md" },
        justify: { control: "select", options: ["left", "right", "center", "between"] },
        block: { control: "boolean", defaultValue: false },
        loading: { control: "boolean", defaultValue: false },
        disabled: { control: "boolean", defaultValue: false },
        endIcon: { control: false },
        startIcon: { control: false },
    },
};

export default meta;

export const Base: StoryObj<typeof Button> = {
    args: {
        variant: "base",
    },
};

export const Primary: StoryObj<typeof Button> = {
    args: {
        variant: "primary",
    },
};

export const Secondary: StoryObj<typeof Button> = {
    args: {
        variant: "secondary",
    },
};

export const Xs: StoryObj<typeof Button> = {
    args: {
        size: "xs",
    },
};

export const Sm: StoryObj<typeof Button> = {
    args: {
        size: "sm",
    },
};

export const Md: StoryObj<typeof Button> = {
    args: {
        size: "md",
    },
};

export const Lg: StoryObj<typeof Button> = {
    args: {
        size: "lg",
    },
};

export const Block: StoryObj<typeof Button> = {
    args: {
        block: true,
    },
};

export const Loading: StoryObj<typeof Button> = {
    args: {
        loading: true,
    },
};

export const Disabled: StoryObj<typeof Button> = {
    args: {
        disabled: true,
    },
};

export const StartIcon: StoryObj<typeof Button> = {
    args: {
        startIcon: markRaw(SearchIcon),
    },
};

export const EndIcon: StoryObj<typeof Button> = {
    args: {
        endIcon: markRaw(SearchIcon),
    },
};
