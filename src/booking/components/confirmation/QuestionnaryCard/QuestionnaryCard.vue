<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { Card } from '@ui/components';
import type { Questionnary } from '@/booking/types';
import { required } from '@/app/lib';

type Props = {
    questionnary: Questionnary;
};

defineProps<Props>();

const rules = computed(() => ({
    first_name: { required },
    last_name: { required },
}));

const form = ref({});

const v$ = useVuelidate(rules, form as never);

const submit = async () => {
    if (!(await v$.value.$validate())) return;
};
</script>

<template>
    <Card>
        <input v-model="v$.last_name.$model" />
        <input v-model="v$.first_name.$model" />
        <button @click="submit">qwewqe</button>
    </Card>
</template>
