// import { h } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Button, Modal } from "@ui/components";

const meta: Meta<typeof Modal> = {
    title: "Ui/Modal",
    component: Modal,
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
    render: (args, { argTypes }) => ({
        components: { Button, Modal },
        props: Object.keys(argTypes),
        template: `
            <Modal title="Title">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind">open modal</Button>
                </template>
                Body
            </Modal>
        `,
    }),
};
