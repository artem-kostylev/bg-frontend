<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import type { General, Insurance } from '@/booking/types';
import { Typography, Collapse } from '@ui/components';
import { QuestionnaryCard } from '@/booking/components';
import type { Questionnary } from '@/booking/types';

type Form = {
    clientId: number | null;
    questionnaries: Questionnary[];
};

type Props = {
    general: General;
    insurances: Insurance[];
};

const props = defineProps<Props>();

const form = reactive<Form>({
    clientId: null,
    questionnaries: [],
});

onMounted(() => {
    form.questionnaries = props.general.groups.flatMap(({ tourists, tour_id }) =>
        tourists.map(({ description }) => ({
            label: description,
            form: { service_insurance_id: props.insurances[0].id },
            tour_id,
        }))
    );
});
</script>

<template>
    <Typography variant="h2" as="h2">Анкеты туристов</Typography>
    <Collapse
        v-for="(questionnary, index) in form.questionnaries"
        :title="questionnary.label"
        :key="index"
    >
        <QuestionnaryCard :questionnary="questionnary" />
    </Collapse>
</template>
