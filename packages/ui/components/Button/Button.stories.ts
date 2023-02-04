import Button from "./Button.vue";
import type { Meta, StoryFn } from "@storybook/vue3";
import { SearchIcon } from "@/app/components/icons";

export default {
    title: "Ui/Button",
    component: Button,
    args: {
        loading: false,
    },
    argTypes: {
        endIcon: {
            control: false,
        },
        startIcon: {
            control: false,
        },
        variant: {
            options: ["base", "primary"],
            control: "select",
        },
        size: {
            options: ["xs", "sm", "md", "lg"],
            control: "select",
        },
        type: {
            options: ["button", "submit"],
            control: "select",
        },
        justify: {
            options: ["center", "between"],
            control: "select",
        },
        loading: {
            control: { type: "boolean" },
        },
    },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: any) => ({
    components: { Button },
    setup() {
        return { args };
    },
    template: `<Button v-bind="args">Кнопка</Button>`,
});

export const Base = Template.bind({});

Base.args = {
    variant: "base",
};

export const Primary = Template.bind({});

Primary.args = {
    variant: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
    variant: "secondary",
};

export const ExtraSmall = Template.bind({});

ExtraSmall.args = {
    size: "xs",
};

export const Small = Template.bind({});

Small.args = {
    size: "sm",
};

export const Medium = Template.bind({});

Medium.args = {
    size: "md",
};

export const Large = Template.bind({});

Large.args = {
    size: "lg",
};

export const Loading = Template.bind({});

Loading.args = {
    loading: true,
};

export const Block = Template.bind({});

Block.args = {
    block: true,
};

export const StartIcon = Template.bind({});

StartIcon.args = {
    startIcon: SearchIcon,
};

export const EndIcon = Template.bind({});

EndIcon.args = {
    endIcon: SearchIcon,
};

export const JustifyCenter = Template.bind({});

JustifyCenter.args = {
    justify: "center",
    block: true,
    endIcon: SearchIcon,
};

export const JustifyBetween = Template.bind({});

JustifyBetween.args = {
    justify: "between",
    block: true,
    endIcon: SearchIcon,
};

export const Disabled = Template.bind({});

Disabled.args = {
    disabled: true,
    endIcon: SearchIcon,
};
