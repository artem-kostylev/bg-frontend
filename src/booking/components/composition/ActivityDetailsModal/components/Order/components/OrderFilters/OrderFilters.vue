<script setup lang="ts">
import { Select, DatePicker } from '@ui/components';
import { computed } from 'vue';

type ModelValue = {
    time: string;
    date: string;
    option: string;
};

type Props = {
    modelValue: ModelValue;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: ModelValue): void }>();

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});
</script>

<template>
    <div class="flex flex-wrap -mx-1.5">
        <div class="px-1.5">
            <DatePicker v-model="value.date" :format="'DD.MM.YYYY'" placeholder="дд.мм.гггг" />
        </div>
        <div class="px-1.5">
            <Select v-model="value.time" :options="[{ label: '6:00', value: 1 }]" />
        </div>
        <div class="px-1.5">
            <Select
                v-model="value.option"
                :options="[{ label: 'Английский - Брощюра', value: 1 }]"
            />
        </div>
    </div>
</template>
