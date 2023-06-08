import type { Meta, StoryObj } from '@storybook/vue3';
import { Button, CoveredModal, Image } from '@ui/components';

const meta: Meta<typeof CoveredModal> = {
    title: 'Ui/CoveredModal',
    component: CoveredModal,
};

export default meta;

export const Default: StoryObj<typeof CoveredModal> = {
    render: (args, { argTypes }) => ({
        components: { Button, CoveredModal, Image },
        props: Object.keys(argTypes),
        template: `
            <CoveredModal title="Title">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind">open modal</Button>
                </template>
                <template #cover>
                    <Image src="https://static.stage.bgit.ru/stage1/image/634d29eaa36db.jpg" height="400px" />
                </template>
                <div v-for="i in 100" :key="i">100</div>
            </CoveredModal>
        `,
    }),
};
