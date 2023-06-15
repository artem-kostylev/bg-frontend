<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchDocuments } from '@/account/services';
import { Page } from '@/app/components';
import { Typography, Spin, Card } from '@ui/components';
import { PlusDocumentIcon } from '@ui/icons';

definePageMeta({
    middleware: 'auth',
});

const { data, pending } = useLazyAsyncData('account-documents', () => fetchDocuments());

const meta = {
    title: 'Документы туристов',
    description: 'Описание страницы',
};
</script>

<template>
    <Page :meta="meta">
        <div class="flex flex-col justify-between mb-10">
            <Typography as="h1" variant="h1">Документы туристов</Typography>
            <!--            <Modal v-model="newModal" label="Добавить документ">
                <template #trigger="{ open }">
                    <div v-if="data?.length" class="flex w-full mt-7">
                        <Button variant="secondary" @click="open" class="block w-full md:w-auto"
                            >+ Добавить документ</Button
                        >
                    </div>
                </template>
                <template #default="{ close }">
                    <DocsForm
                        :form="form"
                        type="add"
                        @success="
                            execute();
                            close();
                        "
                        @clear-form="clearForm"
                        @update-data="updateData"
                    />
                </template>
            </Modal>-->
        </div>
        <div v-if="pending" class="flex items-center justify-center">
            <Spin width="2.4em" height="2.4em" class="text-blue-700" />
        </div>
        <Card v-else-if="data?.length">
            <div
                v-for="item in data"
                :key="item.id"
                class="flex flex-col space-y-2 md:grid md:grid-cols-3 md:space-y-0 p-4 border-b border-dashed last:border-none md:items-center"
            >
                <div>{{ item.name }}</div>
                <div
                    class="flex space-x-2 md:grid md:grid-cols-2 md:gap-6 md:space-x-0 items-center"
                >
                    <div>{{ item.document_type.name }}</div>
                    <div>{{ item.document_number }}</div>
                </div>
                <div class="justify-self-end">
                    <div class="flex space-x-4">
                        <!--<Modal label="Изменить документ">
                          <template #trigger="{ open }">
                              <button class="flex space-x-2" @click="open">
                                  <EditIcon width="1.5em" />
                                  <span>Изменить</span>
                              </button>
                          </template>
                          <template #default="{ close }">
                                                            <DocsForm
                                :form="item"
                                type="edit"
                                :id="item.id"
                                :index="index"
                                @success="
                                    execute();
                                    close();
                                "
                                @clear-form="clearForm"
                                @update-data="updateData"
                            />
                        </template>
                        </Modal>-->

                        <!-- <Modal>
                          <template #trigger="{ open }">
                              <button class="flex space-x-2 text-danger-700" @click="open">
                                  <TrashIcon width="1.5em" height="1.5em" />
                                  <span>Удалить</span>
                              </button>
                          </template>
                          <template #default="{ close }">
                            <div class="flex flex-col items-center">
                                <TrashIcon
                                    width="2.5em"
                                    height="2.5em"
                                    class="text-danger-700"
                                />
                                <div class="max-w-56 text-center m-b-6">
                                    Вы уверены что хотите удалить этот документ?
                                </div>
                                <div class="flex space-x-4">
                                    <Button @click="close">Отменить</Button>
                                                                           <Button variant="primary" @click="deleteDoc(item.id)"
                                        >Да</Button
                                    >
                                </div>
                            </div>
                        </template>
                        </Modal>-->
                    </div>
                </div>
            </div>
        </Card>
        <div v-else class="flex flex-col items-center text-center">
            <PlusDocumentIcon />
            <div class="mt-7">У Вас пока нет сохраненных документов.</div>
            <div class="flex justify-center w-full mt-7">
                <!--                <Button variant="secondary" @click="openNew" class="block w-full md:w-auto"
                    >+ Добавить документ</Button
                >-->
            </div>
        </div>
    </Page>
</template>
