import { ref } from 'vue';
import { Slider } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Slider> = {
    title: 'Ui/Slider',

    component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Single: Story = {
    render: args => ({
        components: { Slider },

        setup: () => {
            const selected = ref(null);

            return { args, selected };
        },
        template: '<Slider v-model="selected" :min="0" :max="100" v-bind="args" />',
    }),
};

export const Range: Story = {
    render: args => ({
        components: { Slider },

        setup: () => {
            const selected = ref([]);

            return { args, selected };
        },
        template: '<Slider v-model="selected" v-bind="args" :min="0" :max="100" range />',
    }),
};
