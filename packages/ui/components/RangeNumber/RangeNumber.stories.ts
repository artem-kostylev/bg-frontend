import { ref } from 'vue';
import { RangeNumber } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof RangeNumber> = {
    title: 'Ui/RangeNumber',

    component: RangeNumber,
};

export default meta;

type Story = StoryObj<typeof RangeNumber>;

export const Single: Story = {
    render: args => ({
        components: { RangeNumber },

        setup: () => {
            const selected = ref(null);

            return { args, selected };
        },
        template: '<RangeNumber v-model="selected" v-bind="args" />',
    }),
};

export const Range: Story = {
    render: args => ({
        components: { RangeNumber },

        setup: () => {
            const selected = ref([]);

            return { args, selected };
        },
        template: '<RangeNumber v-model="selected" v-bind="args" range />',
    }),
};

export const Disabled: Story = {
    render: args => ({
        components: { RangeNumber },

        setup: () => {
            const selected = ref([4, 8]);

            const numberDisabled = (num: number) => {
                return num < 4 || num > 8;
            };

            return { args, selected, numberDisabled };
        },
        template:
            '<RangeNumber v-model="selected" v-bind="args" :number-disabled="numberDisabled" range />',
    }),
};
