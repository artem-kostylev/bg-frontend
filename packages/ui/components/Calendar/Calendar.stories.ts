import { ref } from 'vue';
import { Calendar } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { Dayjs } from 'dayjs';

const meta: Meta<typeof Calendar> = {
    title: 'Ui/Calendar',

    component: Calendar,
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
    render: args => ({
        components: { Calendar },

        setup: () => {
            const selected = ref(null);

            return { args, selected };
        },
        template: '<Calendar v-model="selected" v-bind="args" />',
    }),
};

export const Range: Story = {
    render: args => ({
        components: { Calendar },

        setup: () => {
            const selected = ref([]);

            return { args, selected };
        },
        template: '<Calendar v-model="selected" v-bind="args" range />',
    }),
};

export const Disabled: Story = {
    render: args => ({
        components: { Calendar },

        setup: () => {
            const selected = ref([]);

            const dateDisabled = (date: Dayjs) => {
                return date.isAfter(new Date(), 'day');
            };

            return { args, selected, dateDisabled };
        },
        template:
            '<Calendar v-model="selected" v-bind="args" :date-disabled="dateDisabled" range />',
    }),
};
