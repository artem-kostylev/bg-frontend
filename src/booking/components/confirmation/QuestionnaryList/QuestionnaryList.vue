<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useLazyAsyncData, useRoute, useRouter } from '#imports';
import { ref, reactive, computed, onMounted, watch } from 'vue';
import type { General, Insurance, Accommodation } from '@/booking/types';
import { Button, Typography, Collapse, Checkbox, Radio, Card, Modal } from '@ui/components';
import { QuestionnaryCard, ModalForm } from '@/booking/components';
import { fetchAvailableDocuments, createOrder } from '@/booking/services';
import type { Questionnary, QuestionnaryForm } from '@/booking/types';
import type { Document } from '@/account/types';
import { formatCurrency, required } from '@/app/lib';
import { useVuelidate } from '@vuelidate/core';
import { sameAs } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/auth/stores';
import { parseTickets } from '@/booking/lib/helpers';
import { useMessage } from '@ui/composables';

const route = useRoute();
const router = useRouter();

const { showAuthModal, isAuthenticated } = storeToRefs(useAuthStore());

type Form = {
    clientId?: number;
    questionnaries: Questionnary[];
    news: {};
};

type Props = {
    general: General;
    insurances: Insurance[];
    accommodations: Accommodation[];
};

const props = defineProps<Props>();

const sending = ref(false);
const error = ref('');
const newPrice = ref<number | null>(null);
const modalForm = ref<QuestionnaryForm>();

const message = useMessage();

const form = reactive<Form>({
    questionnaries: [],
    news: {},
});

const countryIds = computed(() => {
    return props.accommodations.map((item: { location: { id: number }[] }) => {
        return item.location[0].id;
    });
});

const { data: documents } = useLazyAsyncData('form-documents', () =>
    fetchAvailableDocuments(countryIds.value)
);

const formKeys: (keyof Partial<
    Omit<
        Document,
        | 'id'
        | 'created_at'
        | 'second_name'
        | 'deleted_at'
        | 'document_series'
        | 'document_type'
        | 'document_type_name'
        | 'name'
        | 'updated_at'
        | 'user_id'
    >
>)[] = [
    'first_name',
    'last_name',
    'birthday',
    'sex',
    'nationality_id',
    'document_type_id',
    'document_number',
    'document_till',
    'phone',
    'email',
];

const updateForm = (value: {
    index: number;
    doc?: Document;
    key?: keyof Omit<
        Document,
        | 'id'
        | 'created_at'
        | 'second_name'
        | 'deleted_at'
        | 'document_series'
        | 'document_type'
        | 'document_type_name'
        | 'name'
        | 'updated_at'
        | 'user_id'
    >;
    newValue?: string;
}) => {
    if (!form.questionnaries[value.index] || !form.questionnaries[value.index].form) return;

    value.key && value.newValue
        ? // TODO
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (form.questionnaries[value.index].form[value.key] = value.newValue)
        : value.doc &&
          formKeys.forEach(key => {
              // TODO
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              form.questionnaries[value.index].form[key] = value.doc[key];
          });
};

const clearForm = (index: number) => {
    if (form.questionnaries[index] && form.questionnaries[index].form) {
        Object.keys(form.questionnaries[index].form).forEach(key => {
            if (key === 'service_insurance_id') {
                form.questionnaries[index].form[key] = props.insurances[0].id;
            } else {
                form.questionnaries[index].form[key as keyof QuestionnaryForm] = undefined;
            }
        });
    }
};

const currentFormIndex = ref(0);
const collapsed = ref([0]);
const showFormModal = ref(false);

const rules = {
    agreeWithTerms: { required, sameAsTrue: sameAs(true) },
    agreeWithPersonalData: { required, sameAsTrue: sameAs(true) },
    // clientId: { required },
    agreeWithReceiveNews: {},
};

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const v$ = useVuelidate(rules, form.questionnaries as any);

const success = (index: number) => {
    if (currentFormIndex.value !== index) return;

    currentFormIndex.value++;

    !collapsed.value.includes(currentFormIndex.value) &&
        collapsed.value.push(currentFormIndex.value);
    document
        .getElementById(`collapse-${currentFormIndex.value}`)
        ?.scrollIntoView({ behavior: 'smooth' });
};

const totalPrice = computed(() => props.general.total_price);

const sendOrder = async () => {
    const { tickets, transfers } = route.query;
    let currentIndex = 0;

    const groups = props.general.groups.map((group, index: number) => {
        currentIndex =
            index === 0
                ? currentIndex
                : (currentIndex += props.general.groups[index - 1].tourists.length);

        return {
            tour_id: group.tour_id,
            tourists: form.questionnaries
                .slice(
                    index === 0 ? 0 : currentIndex,
                    currentIndex + props.general.groups[index].tourists.length
                )
                .map((questionnary: Questionnary) => {
                    return {
                        ...questionnary.form,
                        service_insurance_id: String(questionnary.form.service_insurance_id),
                    };
                }),
        };
    });

    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = { groups };

    if (form.clientId !== undefined) {
        payload.client =
            form.clientId === -1 ? modalForm.value : form.questionnaries[form.clientId];
    }

    tickets && (payload.tickets = parseTickets(tickets as string[]));
    transfers && (payload.transfers = JSON.parse(transfers as string));

    try {
        sending.value = true;
        const response = await createOrder(payload);

        if (response.status === 'newprice') {
            error.value = 'newprice';
            newPrice.value = response.price;
            return;
        }

        if (response.status === 'created') {
            router.push({ name: 'booking-pay', query: { order_id: response.order_id } });
        }
    } catch (error) {
        let errorMessage = 'Unknown Error';
        if (error instanceof Error) errorMessage = error.message;
        message.danger(errorMessage);
    } finally {
        sending.value = false;
    }
};

const submit = async () => {
    if (!(await v$.value.$validate())) return;

    if (!isAuthenticated.value) {
        showAuthModal.value = true;
        return;
    }

    await sendOrder();
};

watch(documents, value => {
    form.questionnaries = props.general.groups.flatMap(({ tourists, tour_id }) =>
        tourists.map(({ description }) => ({
            label: description,
            form: { service_insurance_id: props.insurances[0].id } as Partial<QuestionnaryForm>,
            tour_id,
            availableDocuments: documents.value,
        }))
    );
});

const isAdult = (dateOfBirth?: string) => {
    if (!dateOfBirth) return true;

    const now = new Date();
    const birthDate = new Date(dateOfBirth.split('.').reverse().join('-'));
    const ageInMilliseconds = now.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears >= 18;
};

const onModalSubmit = () => {
    showFormModal.value = false;
};

const onModalClose = () => {
    showFormModal.value = false;
    form.clientId = undefined;
    modalForm.value = undefined;
};

onMounted(() => {
    form.questionnaries = props.general.groups.flatMap(({ tourists, tour_id }) =>
        tourists.map(({ description }) => ({
            label: description,
            form: { service_insurance_id: props.insurances[0].id } as Partial<QuestionnaryForm>,
            tour_id,
            availableDocuments: documents.value,
        }))
    );
});
</script>

<template>
    <Typography variant="h2" as="h2">Анкеты туристов</Typography>
    <div>
        Заполните анкеты на каждого из туристов. Внимательно проверьте анкеты. Авиакомпания может
        отказать в посадке, если анкетные данные не совпадут с данными загранпаспорта. Поля со
        знаком <span class="text-danger-600">*</span> обязательны для заполнения.
    </div>
    <div class="border-b border-secondary-200 pb-8" v-if="!isAuthenticated">
        <Typography variant="h2" as="h2" class="mb-4">Авторизация</Typography>
        <p class="mb-4">
            Для того чтобы заполненные ниже данные анкет сохранились в Системе, войдите в Личный
            кабинет, либо зарегистрируйтесь:
        </p>
        <Button variant="primary" @click="showAuthModal = true">Войти в личный кабинет</Button>
    </div>
    <Collapse
        v-for="(questionnary, index) in form.questionnaries"
        :title="questionnary.label"
        :key="index"
        :default-open="collapsed.includes(index)"
        :id="`collapse-${index}`"
        :disabled="currentFormIndex < index"
    >
        <QuestionnaryCard
            v-if="documents"
            :questionnary="questionnary"
            :index="index"
            :available-documents="documents"
            :insurances="insurances"
            :is-last="form.questionnaries[index + 1] === undefined"
            @success="success(index)"
            @clear-form="clearForm"
            @update-form="updateForm"
        />
    </Collapse>
    <div class="border-t border-b border-secondary-200 border-dashed py-5">
        <Typography variant="h3" class="mb-5">
            Анкета для оформления договора
            <span class="text-danger-600">*</span>
        </Typography>
        <div class="flex flex-col space-y-4">
            <template v-for="(entity, index) in form.questionnaries" :key="index">
                <Radio v-if="isAdult(entity.form.birthday)" v-model="form.clientId" :value="index">
                    Использовать для анкеты данные Туриста №{{ index + 1 }}
                </Radio>
            </template>
            <Modal v-model="showFormModal" persistent>
                <template #trigger="{ vbind }">
                    <Radio v-bind="vbind" v-model="form.clientId" :value="-1">
                        Заполнить анкету
                    </Radio>
                </template>
                <Card>
                    <template #header>
                        <Typography variant="h3">Анкета</Typography>
                    </template>
                    <ModalForm
                        :questionnary="modalForm"
                        @submit="onModalSubmit"
                        @close="onModalClose"
                    />
                </Card>
            </Modal>
        </div>
    </div>
    <div class="flex flex-col space-y-4">
        <Checkbox v-model="v$.agreeWithTerms.$model">
            Я ознакомлен, принимаю и соглашаюсь с условиями
            <a href="#" class="text-primary-500" download target="blank">
                Договора о туристском обслуживании
            </a>
            <span class="text-danger-600">*</span>
        </Checkbox>
        <Checkbox v-model="v$.agreeWithPersonalData.$model">
            Согласен(а) на обработку предоставленных персональных данных
            <span class="text-danger-600">*</span>
        </Checkbox>
        <Checkbox v-model="v$.agreeWithReceiveNews.$model">
            Согласен(а) на получение новостных рассылок и предложений
        </Checkbox>
    </div>
    <div class="space-y-4">
        <div>
            Итого за тур: <span class="font-bold">{{ formatCurrency(totalPrice) }}</span>
        </div>
        <Button variant="primary" :disabled="v$.$invalid" :loading="sending" @click="submit">
            Перейти к оплате
        </Button>
    </div>
</template>
