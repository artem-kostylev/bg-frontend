<script setup lang="ts">
import { ref } from 'vue';
import { definePageMeta, onBeforeUnmount, useHead, useRoute } from '#imports';
import { Typography, Alert, Collapse, Divider } from '@ui/components';
import { Page } from '@/app/components';
import { SuccessEnvelopeIcon, QuestionPlusIcon } from '@ui/icons';
import { SupportForm, SupportList } from '@/account/components';
import { useAuthStore } from '@/auth/stores/auth';
import { formatDate } from '@/app/lib/helpers';

definePageMeta({
    middleware: 'auth',
    layout: false,
});

useHead({
    title: 'Обратная связь',
});

const route = useRoute();

const { user } = useAuthStore();

const showForm = ref(true);

const showSuccess = ref(false);
const success = ref(false);

const addedAppeal = ref<{
    appeal_id: number;
    appeal_created_at: number;
    order_id: number;
    order_number: number | null;
} | null>(null);

const added = (value: {
    appeal_id: number;
    appeal_created_at: number;
    order_id: number;
    order_number: number | null;
}) => {
    addedAppeal.value = value;
    showSuccess.value = true;
    success.value = true;
    showForm.value = false;
};

const updateSupportList = () => {
    success.value = false;
};

const error = ref<string | null>(null);

const handleError = (text: string) => {
    error.value = text;
};

onBeforeUnmount(() => {
    error.value = null;
    showSuccess.value = false;
    success.value = false;
    showForm.value = false;
});
</script>

<template>
    <Page>
        <Typography as="h1" variant="h1">Обратная связь</Typography>
        <div v-if="showSuccess && addedAppeal" class="mt-8 mb-2">
            <Alert type="success" :start-icon="SuccessEnvelopeIcon">
                <template #title>
                    <span class="font-bold">
                        Ваше обращение
                        <NuxtLink
                            v-if="addedAppeal"
                            :to="{
                                name: 'account-support-id',
                                params: { id: addedAppeal.appeal_id },
                                query: $route.query,
                            }"
                        >
                            <span class="text-primary-500 hover:text-primary-600"
                                >№{{ addedAppeal.appeal_id }}</span
                            >
                        </NuxtLink>
                        от
                        {{
                            formatDate(
                                addedAppeal.appeal_created_at,
                                'day:numeric|month:long|year:numeric|hour:2-digit|minute:2-digit'
                            )
                        }}
                        по
                        <NuxtLink
                            :to="{
                                name: 'account-orders-id',
                                params: { id: addedAppeal.order_id },
                                query: route.query,
                            }"
                        >
                            <span class="text-primary-500 hover:text-primary-600"
                                >Заказу №{{ addedAppeal.order_number }}</span
                            >
                        </NuxtLink>
                        направлено в службу поддержки
                    </span>
                </template>
                <template #text>
                    Уведомление об ответе будет направлено вам на
                    {{ user?.email ? user.email : 'почту' }}
                </template>
            </Alert>
        </div>
        <div v-else-if="error" class="mt-8 mb-2">
            <Alert type="error" :text="error" />
        </div>
        <div class="mt-8">
            <Collapse
                :default-open="showForm"
                title="Создать обращение"
                :start-icon="QuestionPlusIcon"
            >
                <SupportForm @added="added" @error="handleError" />
            </Collapse>
            <Divider class="sm:hidden" />
        </div>
        <div class="mt-8">
            <SupportList :success="success" @update="updateSupportList" />
        </div>
    </Page>
</template>
