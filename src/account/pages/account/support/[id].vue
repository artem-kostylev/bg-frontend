<script setup lang="ts">
import { ref } from 'vue';
import {
    definePageMeta,
    useHead,
    useRoute,
    useLazyAsyncData,
    nextTick,
    watch,
    onDeactivated,
} from '#imports';
import { Typography, Button, Field, Spin } from '@ui/components';
import { Page } from '@/app/components';
// import { useMessage } from '@ui/composables';
import { required, formatDate } from '@/app/lib';
import { useVuelidate } from '@vuelidate/core';
import { getAppeal, addAppeal } from '@/account/services/';
import { useIntersectionObserver } from '@vueuse/core';

definePageMeta({
    middleware: 'auth',
    layout: false,
});

const route = useRoute();

useHead({
    title: () => `Обращение №${route.params.id}`,
});

const page = ref(1);
const loadingMore = ref(false);

const { data, pending } = useLazyAsyncData(
    'support-appeal',
    () => getAppeal(route.params.id.toString(), page.value),
    {
        server: false,
    }
);

const form = ref({
    text: '',
});

const rules = {
    text: { required },
};

const v$ = useVuelidate(rules, form);

const messagesRef = ref<HTMLDivElement>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messagesArrRef = ref<any[]>([]);

const scrollToBottom = async () => {
    await nextTick();
    await nextTick();
    await nextTick();

    messagesRef.value?.scrollTo({
        top: messagesRef.value?.scrollHeight,
    });
};

const update = async () => {
    const response = await getAppeal(route.params.id.toString(), 1);

    const newMessages = response.data.messages.filter(
        newMessage =>
            data.value &&
            !data.value.data.messages.some(oldMessage => oldMessage.id === newMessage.id)
    );

    if (newMessages.length) {
        newMessages.forEach(message => {
            data.value && data.value.data.messages.push(message);
        });

        // only operator response messages
        const hasAnswer = newMessages.some(message => message.type === 1);

        if (hasAnswer) {
            // message.success('Доступны новые сообщения по обращению');
            await scrollToBottom();
        }
    }
};

const refreshInterval = setInterval(() => update(), 60000);

onDeactivated(() => {
    clearInterval(refreshInterval);
});

const sending = ref(false);
// const message = useMessage();

const onSubmit = async () => {
    if (!data.value) return;

    if (sending.value) return;

    if (!(await v$.value.$validate())) return;

    const body = {
        order_id: data.value.data.order_id,
        support_id: data.value.data.support_id,
        text: form.value.text,
    };

    try {
        await addAppeal(body);
        // message.success('Сообщение успешно отправлено');

        await update();
        await scrollToBottom();

        form.value.text = '';
        v$.value.$reset();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.status === 422) {
            // message.danger(err.data.message);
        } else {
            // message.danger('Неизвестная ошибка');
        }
    } finally {
        sending.value = false;
    }
};

watch(data, value => {
    if (!value) return;
    scrollToBottom();
});

const target = ref<HTMLDivElement | null>(null);

useIntersectionObserver(target, async ([{ isIntersecting }]) => {
    if (isIntersecting) {
        loadingMore.value = true;

        const response = await getAppeal(route.params.id.toString(), ++page.value);
        data.value && (data.value.meta = response.meta);
        data.value &&
            (data.value.data.messages = response.data.messages.concat(data.value.data.messages));

        messagesRef.value?.scrollTo({
            top: 1,
        });

        loadingMore.value = false;
    }
});
</script>

<template>
    <Page>
        <Typography as="h1" variant="h1">Обращение №{{ route.params.id || '' }}</Typography>
        <div v-if="pending" class="flex items-center justify-center py-10">
            <Spin width="2.4em" height="2.4em" class="text-primary-500" />
        </div>
        <div v-else-if="data && data.data">
            <div class="mt-5">
                <NuxtLink
                    :to="{
                        name: 'account-orders-id',
                        params: { id: data.data.order_id },
                        query: $route.query,
                    }"
                >
                    <div class="text-primary-500 hover:text-primary-600">
                        К Заказу №{{ data.data.order_number }}
                    </div>
                </NuxtLink>
            </div>
            <div class="mt-5 flex flex-col gap-6 overflow-y-scroll h-96" ref="messagesRef">
                <div
                    v-if="page < data.meta.pagination.total_pages && !loadingMore"
                    ref="target"
                ></div>
                <template v-if="loadingMore">
                    <div class="flex items-center justify-center py-10">
                        <Spin width="2.4em" height="2.4em" class="text-primary-500" />
                    </div>
                </template>
                <div
                    v-for="(message, index) in data.data.messages"
                    :key="message.id"
                    :ref="el => (messagesArrRef[index] = el)"
                    :class="[
                        'flex flex-col w-11/12 p-5 rounded-xl',
                        message.type === 0
                            ? 'self-end bg-primary-100/20'
                            : 'self-start border border-solid border-secondary-300',
                    ]"
                >
                    <div>
                        <span class="font-bold">{{ message.sender }}, </span>
                        <span
                            >{{ formatDate(message.created_at, 'DD MMMM YYYY') }} г.,
                            {{ formatDate(message.created_at, 'HH:mm') }}
                        </span>
                    </div>
                    <div class="mt-3">{{ message.text }}</div>
                </div>
            </div>
            <div class="mt-12">
                <label for="text" class="font-bold">Текст сообщения:</label>
                <div class="mt-2">
                    <Field
                        :hint="v$.text.$errors[0]?.$message as string"
                        :status="v$.text.$errors[0] ? 'error' : undefined"
                    >
                        <textarea
                            v-model="v$.text.$model"
                            id="text"
                            name="text"
                            :class="[
                                'focus:outline-none block w-full appearance-none transition-colors bg-white rounded-xl shadow-sm border border-secondary-300 hover:border-secondary-400 placeholder-secondary-500 py-[.563em] px-[.875em] focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:opacity-60 disabled:pointer-events-none',
                                'resize-none min-h-[144px]',
                            ]"
                        />
                    </Field>
                </div>
                <Button
                    variant="primary"
                    :loading="sending"
                    @click="onSubmit"
                    class="mt-5 <sm:w-full"
                    >Отправить
                </Button>
            </div>
        </div>
    </Page>
</template>
