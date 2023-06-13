<script setup lang="ts">
import { computed, ref } from 'vue';
import { Modal, Button, Typography } from '@ui/components';
import { SlidersIcon } from '@ui/icons';
import { useName, useQuery } from '@/app/composables';
import { fetchAdvancedFilters } from '@/tours/services';
import type { FetchAdvancedFiltersResponse } from '@/tours/services';
import type { FiltersRaw } from '@/app/types';
import { parseFilters } from '@/app/lib';

const name = useName<string>();
const query = useQuery<FiltersRaw>();

const filters = computed(() => parseFilters(query.value));
const data = ref<FetchAdvancedFiltersResponse | null>(null);
const pending = ref(false);

const open = async () => {
    try {
        pending.value = true;
        const response = await fetchAdvancedFilters(name.value, filters.value);
        data.value = response;
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <Modal title="Все фильтры" :loading="pending" @open="open" size="5xl" scrollable>
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
                                <div
                                    class="flex flex-col space-y-2.5"
                                    v-if="item.type === 'range-slider'"
                                >
                                    {{ item.type }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <template #footer>
            <div class="flex justify-end space-x-2.5">
                <Button>Сбросить</Button>
                <Button variant="primary">Показать 229 варианта</Button>
            </div>
        </template>
    </Modal>
</template>
