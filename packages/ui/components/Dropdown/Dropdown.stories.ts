import type { Meta, StoryObj } from '@storybook/vue3';
import { Dropdown, Button } from '@ui/components';

const meta: Meta<typeof Dropdown> = {
    title: 'Ui/Dropdown',

    component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
    render: args => ({
        components: { Dropdown, Button },
        setup: () => {
            const options = [
                { label: 'Сначала дешевле', value: 1 },
                { label: 'Сначала дороже', value: 2 },
                { label: 'Звезды по возрастанию', value: 3 },
                { label: 'Звезды по убыванию', value: 4 },
            ];

            const onSelect = value => {
                console.log(value);
            };

            return { args, onSelect, options };
        },
        template: `
            <Dropdown @select="onSelect" :options="options" v-bind="args">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind">open dropdown</Button>
                </template>
            </Dropdown>
        `,
    }),
};
