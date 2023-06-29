<script setup lang="ts">
import { defineAsyncComponent, watch, ref, computed, type Component } from 'vue';
import { Input, Menu, Card, Spin } from '@ui/components';
import { ChevronDownIcon, SearchIcon, XIcon } from '@ui/icons';
import { useMediaQuery, useVModels } from '@vueuse/core';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Props = {
    bordered?: boolean;
    modelValue?: {
        created_at: string;
        label: string;
        order_id: number;
        order_number: number;
    };
    labelKey?: string;
    valueKey?: string;
    descriptionKey?: string;
    childrenKey?: string;
    items: {
        order_id: number;
        order_number: number;
        created_at: string;
        label: string;
    }[];
    search: string;
    loading?: boolean;
    loadingSearch?: boolean;
    required?: boolean;
    endIcon?: Component;
    status?: 'error' | 'success';
    hint?: string;
};

const props = withDefaults(defineProps<Props>(), {
    labelKey: 'label',
    valueKey: 'value',
    descriptionKey: 'description',
    childrenKey: 'children',
    modelValue: undefined,
    items: () => [],
    bordered: true,
    endIcon: undefined,
    hint: '',
    status: undefined,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value?: number): void;
    (e: 'update:search', value?: string): Promise<void>;
}>();

const show = ref(false);
const inputSearchRef = ref<HTMLInputElement>();

const endIcon = computed(() => {
    return props.loading ? Spin : props.endIcon || ChevronDownIcon;
});

const matches = useMediaQuery('(max-width: 640px)');

const { modelValue, search } = useVModels(props, emit);

watch(modelValue, () => (show.value = false));
watch(show, value => {
    value && setTimeout(() => inputSearchRef.value?.focus(), 200);
});

const orders = computed(() => {
    return props.items.map(item => {
        return {
            label: item.label,
            value: item.order_id,
        };
    });
});
</script>

<template>
    <component :is="matches ? Mobile : Desktop" v-model="show">
        <template #trigger="slotProps">
            <Input
                :model-value="modelValue?.[labelKey]"
                v-bind="slotProps.props"
                readonly
                :end-icon="endIcon"
                :status="status"
                :hint="hint"
                :required="required"
                clickable
            />
        </template>
        <Card>
            <div class="relative">
                <div class="absolute inset-y-0 flex items-center px-5 pointer-events-none">
                    <button class="focus:outline-none -ml-1 text-secondary-500">
                        <SearchIcon width="1rem" height="1rem" />
                    </button>
                </div>
                <input
                    class="focus:outline-none border-b border-secondary-200 w-full px-12 py-3.5 placeholder-secondary-500"
                    placeholder="Поиск по номеру заказа"
                    v-model="search"
                    ref="inputSearchRef"
                />
                <div class="absolute inset-y-0 right-0 flex items-center px-5">
                    <button
                        class="focus:outline-none sm:hidden -mr-1 text-secondary-500"
                        @click="show = false"
                    >
                        <XIcon width="1.2rem" height="1.2rem" />
                    </button>
                </div>
            </div>
            <div class="sm:overflow-y-auto sm:max-h-[410px]">
                <div v-if="loadingSearch" class="flex items-center justify-center py-12">
                    <Spin width="1.9em" height="1.9em" class="text-primary-500" />
                </div>
                <Menu
                    v-else
                    :size="matches ? 'lg' : 'md'"
                    v-model="modelValue"
                    :options="orders"
                    :label-key="labelKey"
                    :value-key="valueKey"
                    :description-key="descriptionKey"
                    :children-key="childrenKey"
                    return-object
                >
                    <template #empty>
                        <div class="flex flex-col items-center justify-center py-8">
                            <div>Ничего не найдено</div>
                        </div>
                    </template>
                </Menu>
            </div>
        </Card>
    </component>
</template>
