import { ref } from 'vue';
import { NumberPicker } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof NumberPicker> = {
    title: 'Ui/NumberPicker',

    component: NumberPicker,
};

export default meta;

type Story = StoryObj<typeof NumberPicker>;

export const Single: Story = {
    render: args => ({
        components: { NumberPicker },

        setup: () => {
            const selected = ref(1);

            return { args, selected };
        },
        template: '<NumberPicker v-model="selected" v-bind="args" />',
    }),
};

export const Range: Story = {
    render: args => ({
        components: { NumberPicker },

        setup: () => {
            const selected = ref([4, 8]);

            return { args, selected };
        },
        template: '<NumberPicker v-model="selected" v-bind="args" range />',
    }),
};

export const Disabled: Story = {
    render: args => ({
        components: { NumberPicker },

        setup: () => {
            const selected = ref([4, 8]);

            const numberDisabled = (num: number) => {
                return num < 4 || num > 8;
            };

            return { args, selected, numberDisabled };
        },
        template:
            '<NumberPicker v-model="selected" v-bind="args" :number-disabled="numberDisabled" range />',
    }),
};
