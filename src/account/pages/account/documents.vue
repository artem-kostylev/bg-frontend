<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchDocuments } from '@/account/services';
import { Page } from '@/app/components';
import { Typography, Spin, Card, Button, Modal } from '@ui/components';
import { DocsForm, DeleteDocModal } from '@/account/components';
import { PlusDocumentIcon, EditIcon } from '@ui/icons';
import { formatDocuments } from '@/app/lib';
import type { NewDocument, UpperCaseKeys } from '@/account/types';
import { deleteUserDoc } from '@/account/services';
import { useClearForm } from '@/auth/composables';

definePageMeta({
    middleware: 'auth',
});

const { data, pending, execute } = useLazyAsyncData('account-documents', () => fetchDocuments());

const form = ref<NewDocument>({
    last_name: '',
    first_name: '',
    second_name: '',
    birthday: '',
    sex: null,
    nationality_id: null,
    document_type_id: null,
    document_number: '',
    document_till: '',
    email: '',
    phone: '',
});

const updateData = (newData: { index?: number; key: keyof UpperCaseKeys; value: string }) => {
    if (data.value && newData.index !== undefined) {
        data.value[newData.index][newData.key] = newData.value;
    } else {
        form.value[newData.key] = newData.value;
    }
};

const deleteDoc = async (id: number) => {
    await deleteUserDoc(id);
    await execute();
};

const clearForm = () => {
    useClearForm(form);
};

const newModal = ref(false);

const openNew = () => {
    newModal.value = true;
};

const meta = {
    title: 'Документы туристов',
    description: 'Описание страницы',
};
</script>

<template>
    <Page :meta="meta">
        <div class="flex items-center justify-between mb-10">
            <Typography as="h1" variant="h1">Документы туристов</Typography>
            <Modal v-model="newModal" title="Добавить документ" size="3xl">
                <template #trigger="{ vbind }">
                    <Button variant="primary" v-bind="vbind">Добавить документ</Button>
                </template>
                <template #default>
                    <DocsForm
                        :form="form"
                        type="add"
                        @success="execute()"
                        @clear-form="clearForm"
                        @update-data="updateData"
                    />
                </template>
            </Modal>
        </div>
        <div v-if="pending" class="flex items-center justify-center">
            <Spin width="2.4em" height="2.4em" class="text-blue-700" />
        </div>
        <Card v-else-if="data?.length" class="py-0">
            <div
                v-for="(item, index) in formatDocuments(data)"
                :key="item.id"
                class="flex flex-col space-y-2 md:grid md:grid-cols-[1fr_2fr_1fr] md:space-y-0 p-4 border-b border-secondary-200 border-dashed last:border-none md:items-center"
            >
                <div>{{ item.name }}</div>
                <div
                    class="flex space-x-2 md:grid md:grid-cols-2 md:gap-6 md:space-x-0 items-center"
                >
                    <div>{{ item.document_type.name }}</div>
                    <div>{{ item.document_number }}</div>
                </div>
                <div class="justify-self-end">
                    <div class="flex items-center space-x-4">
                        <Modal title="Изменить документ" size="3xl">
                            <template #trigger="{ vbind }">
                                <button class="flex space-x-2 items-center" v-bind="vbind">
                                    <EditIcon width="1.5em" />
                                    <span>Изменить</span>
                                </button>
                            </template>
                            <template #default>
                                <DocsForm
                                    :form="item"
                                    type="edit"
                                    :id="item.id"
                                    :index="index"
                                    @success="execute()"
                                    @clear-form="clearForm"
                                    @update-data="updateData"
                                />
                            </template>
                        </Modal>

                        <DeleteDocModal :id="item.id" @delete="deleteDoc" />
                    </div>
                </div>
            </div>
        </Card>
        <div v-else class="flex flex-col items-center text-center">
            <PlusDocumentIcon />
            <div class="mt-7">У Вас пока нет сохраненных документов.</div>
            <div class="flex justify-center w-full mt-7">
                <Button variant="primary" @click="openNew" class="block w-full md:w-auto">
                    Добавить документ
                </Button>
            </div>
        </div>
    </Page>
</template>
