<script setup lang="ts">
import { ref } from 'vue';
import { Button, Modal, Typography } from '@ui/components';
import { TrashIcon } from '@ui/icons';

type Props = {
    id: number;
};

defineProps<Props>();

const show = ref(false);

const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();

const deleteDoc = async (id: number) => {
    await emit('delete', id);
    show.value = false;
};
</script>

<template>
    <Modal v-model="show">
        <template #trigger="{ vbind }">
            <button class="flex space-x-2 text-danger-700" v-bind="vbind">
                <TrashIcon width="1.5em" height="1.5em" />
                <span>Удалить</span>
            </button>
        </template>
        <template #default>
            <div class="flex flex-col items-center">
                <TrashIcon width="2.5em" height="2.5em" class="text-danger-700" />
                <Typography variant="h3" class="max-w-4xl text-center m-6">
                    Вы уверены что хотите удалить этот документ?
                </Typography>
                <div class="flex space-x-4">
                    <Button @click="show = false"> Отменить </Button>
                    <Button variant="primary" @click="deleteDoc(id)"> Удалить </Button>
                </div>
            </div>
        </template>
    </Modal>
</template>
