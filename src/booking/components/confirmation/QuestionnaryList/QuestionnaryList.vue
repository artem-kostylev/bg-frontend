<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { reactive, computed, onMounted } from 'vue';
import type { General, Insurance, Accommodation } from '@/booking/types';
import { Typography, Collapse } from '@ui/components';
import { QuestionnaryCard } from '@/booking/components';
import { fetchAvailableDocuments } from '@/booking/services';
import type { Questionnary, QuestionnaryForm } from '@/booking/types';

type Form = {
    clientId: number | null;
    questionnaries: Questionnary[];
};

type Props = {
    general: General;
    insurances: Insurance[];
    accommodations: Accommodation[];
};

const props = defineProps<Props>();

const form = reactive<Form>({
    clientId: null,
    questionnaries: [],
});

const countryIds = computed(() => {
    return props.accommodations.map((item: { location: { id: number }[] }) => {
        return item.location[0].id;
    });
});

const { data: documents } = useLazyAsyncData('form-documents', () =>
    fetchAvailableDocuments(countryIds.value)
);

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
        :default-open="index === 0"
    >
        <QuestionnaryCard :questionnary="questionnary" />
    </Collapse>
</template>
