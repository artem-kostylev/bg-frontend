import type { Meta, StoryFn } from "@storybook/vue3";
import Spin from "./Spin.vue";

export default {
    title: "Ui/Spin",
    component: Spin,
} as Meta<typeof Spin>;

const Template: StoryFn<typeof Spin> = (args: any) => ({
    components: { Spin },

    setup() {
        return { args };
    },
    template: `
        <Spin width="3rem" height="3rem" />
    `,
});

export const Base = Template.bind({});
