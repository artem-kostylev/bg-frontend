<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useLazyAsyncData, useRoute, useRouter } from '#imports';
import { ref, reactive, computed, onMounted, watch } from 'vue';
import type { General, Insurance, Accommodation } from '@/booking/types';
import { Button, Typography, Collapse, Checkbox } from '@ui/components';
import { QuestionnaryCard } from '@/booking/components';
import { fetchAvailableDocuments, createOrder } from '@/booking/services';
import type { Questionnary, QuestionnaryForm } from '@/booking/types';
import { formatCurrency, required } from '@/app/lib';
import { useVuelidate } from '@vuelidate/core';
import { sameAs } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/auth/stores';
// import { useMessage } from '@ui/composables';

const route = useRoute();
const router = useRouter();

type Form = {
    clientId: number | null;
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
const modalForm = ref({ label: '', tour_id: '', form: {} });

// const message = useMessage();

const form = reactive<Form>({
    clientId: null,
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

const { isAuthenticated } = storeToRefs(useAuthStore());

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

    if (form.clientId !== null) {
        payload.client =
            form.clientId === -1 ? modalForm.value : form.questionnaries[form.clientId];
    }

    tickets && (payload.tickets = JSON.parse(tickets as string));
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
        // eslint-disable-next-line
        console.log(errorMessage);
        // message.danger(errorMessage);
    } finally {
        sending.value = false;
    }
};

const submit = async () => {
    if (!(await v$.value.$validate())) return;

    if (!isAuthenticated.value) {
        // showAuthModal.value = true;
        // TODO: Когда будет готова авторизация
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
        знаком * обязательны для заполнения.
    </div>
    <Collapse
        v-for="(questionnary, index) in form.questionnaries"
        :title="questionnary.label"
        :key="index"
        :default-open="collapsed.includes(index)"
        :id="`collapse-${index}`"
    >
        <QuestionnaryCard
            v-if="documents"
            :questionnary="questionnary"
            :index="index"
            :available-documents="documents"
            :is-last="form.questionnaries[index + 1] === undefined"
            @success="success(index)"
            @clear-form="clearForm"
        />
    </Collapse>
    <div class="flex flex-col space-y-4">
        <Checkbox v-model="v$.agreeWithTerms.$model">
            Я ознакомлен, принимаю и соглашаюсь с условиями
            <a href="#" class="text-blue-700" download target="blank">
                Договора о туристском обслуживании
            </a>
            <span class="text-red-600">*</span>
        </Checkbox>
        <Checkbox v-model="v$.agreeWithPersonalData.$model">
            Согласен(а) на обработку предоставленных персональных данных
            <span class="text-red-600">*</span>
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
