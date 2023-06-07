import { ref } from 'vue';
import { DatePicker } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { Dayjs } from 'dayjs';

const meta: Meta<typeof DatePicker> = {
    title: 'Ui/DatePicker',

    component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
    render: args => ({
        components: { DatePicker },

        setup: () => {
            const selected = ref('');

            return { args, selected };
        },
        template: '<DatePicker v-model="selected" v-bind="args" />',
    }),
};

export const Range: Story = {
    render: args => ({
        components: { DatePicker },

        setup: () => {
            const selected = ref([]);

            return { args, selected };
        },
        template: '<DatePicker v-model="selected" v-bind="args" range />',
    }),
};

export const Disabled: Story = {
    render: args => ({
        components: { DatePicker },

        setup: () => {
            const selected = ref([]);

            const dateDisabled = (date: Dayjs) => {
                return date.isAfter(new Date(), 'day');
            };

            return { args, selected, dateDisabled };
        },
        template:
            '<DatePicker v-model="selected" v-bind="args" :date-disabled="dateDisabled" range />',
    }),
};
