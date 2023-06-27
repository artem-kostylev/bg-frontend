<script setup lang="ts">
// TODO: нужен Рефакторинг

import { computed, ref, watch } from 'vue';
import { Modal, Button, Typography, Checkbox, Input, Slider, Radio } from '@ui/components';
import { SlidersIcon } from '@ui/icons';
import { useName } from '@/app/composables';
import { fetchAdvancedFilters } from '@/tours/services';
import type { FetchAdvancedFiltersResponse, FetchToursResponse } from '@/tours/services';
import { formatFilters, pluralize } from '@/app/lib';
import { useNuxtData } from '#imports';
import { useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';

const { data: value } = useNuxtData<FetchToursResponse>('tours');

const name = useName<string>();
const router = useRouter();

const data = ref<FetchAdvancedFiltersResponse | null>(null);
const pending = ref(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fields = ref<any>({});
const initialPrice = ref({ min: 0, max: 0 });
const show = ref(false);
const saved = ref(false);

const filters = computed(() => {
    return value.value!.filter_alternatives ?? value.value!.filters;
});

const getAdvancedFilters = async () => {
    if (!show.value) return;

    try {
        pending.value = true;

        const response = await fetchAdvancedFilters(
            name.value,
            {
                ...filters.value,
                ...fields.value,
            },
            (data.value as FetchAdvancedFiltersResponse | null)?.filters_hidden
        );

        data.value = response;

        if (!initialPrice.value.min && !initialPrice.value.max) {
            if (response.children[0].children[0].type === 'range-slider') {
                initialPrice.value = {
                    min: response.children[0].children[0].min,
                    max: response.children[0].children[0].max,
                };
            }
        }
    } finally {
        pending.value = false;
    }
};

watch(fields, getAdvancedFilters, { deep: true });

watch(show, value => {
    if (value && !saved.value) {
        fields.value = filters.value;
        saved.value = true;
    } else {
        fields.value = {};
        saved.value = false;
        data.value = null;
    }
});

const onSearch = () => {
    router.push({
        name: name.value,
        query: formatFilters({ ...filters.value, ...fields.value }) as LocationQueryRaw,
    });

    show.value = false;
};

const onClear = () => {
    fields.value = {};

    onSearch();
};
</script>

<template>
    <Modal v-model="show" title="Все фильтры" :loading="!data && pending" size="7xl" scrollable>
        <template #trigger="{ vbind }">
            <Button v-bind="vbind" :end-icon="SlidersIcon">Фильтры</Button>
        </template>
        <div v-if="data">
            <template v-for="section in data.children" :key="section.key">
                <div
                    v-if="section.children.length"
                    class="border-b last:border-0 border-secondary-200 mb-4 last:mb-0 border-dashed"
                >
                    <Typography variant="h4">{{ section.name }}</Typography>
                    <div class="md:columns-2 lg:columns-3 my-4">
                        <div v-for="item in section.children" :key="item.key">
                            <div class="mb-8 break-inside-avoid-column">
                                <div class="flex items-center space-x-2.5 mb-4">
                                    <span class="font-semibold leading-4">{{ item.name }}</span>
                                </div>
                                <div
                                    class="flex flex-col space-y-2.5"
                                    v-if="item.type === 'checkbox'"
                                >
                                    <Checkbox
                                        v-for="child in item.children"
                                        :key="child.value"
                                        v-model="fields[item.key]"
                                        :value="child.value"
                                        :disabled="!child.quantity"
                                        multiple
                                    >
                                        {{ child.name }}
                                        <div class="w-[50px] inline-block text-sm text-slate-500">
                                            ({{ child.quantity }})
                                        </div>
                                    </Checkbox>
                                </div>
                                <div class="space-y-3" v-else-if="item.type === 'range-slider'">
                                    <div class="flex space-x-4">
                                        <Input
                                            :model-value="`${(fields[item.key] as number[])?.[0] ?? item.min}  ₽`"
                                            readonly
                                        />
                                        <Input
                                            :model-value="`${(fields[item.key] as number[])?.[1] ?? item.max}  ₽`"
                                            readonly
                                        />
                                    </div>
                                    <Slider
                                        v-model="fields[item.key]"
                                        :min="initialPrice.min"
                                        :max="initialPrice.max"
                                        range
                                    />
                                </div>
                                <div class="space-x-2.5" v-else>
                                    <Radio
                                        v-for="child in item.children"
                                        :key="child.value"
                                        v-model="fields[item.key]"
                                        :disabled="!child.quantity"
                                        :value="child.value"
                                    >
                                        {{ child.name }}
                                    </Radio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <template #footer>
            <div v-if="data" class="flex justify-end space-x-2.5">
                <Button @click="onClear">Сбросить</Button>
                <Button
                    variant="primary"
                    @click="onSearch"
                    :loading="data && pending"
                    :disabled="data && pending"
                >
                    Показать {{ pluralize(data.quantity, ['вариант', 'варианта', 'вариантов']) }}
                </Button>
            </div>
        </template>
    </Modal>
</template>
