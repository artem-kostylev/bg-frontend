<script setup lang="ts">
import { watch, ref, computed, type Component } from 'vue';
import { Button, Menu, Paper, Spin, Popover } from '@ui/components';
import { ChevronDownIcon, SearchIcon } from '@ui/icons';
import { useVModels } from '@vueuse/core';

type Value = {
    created_at: string;
    label: string;
    order_id: number;
    order_number: number;
};

type Props = {
    bordered?: boolean;
    modelValue?: Value;
    labelKey?: keyof Value;
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
    labelKey: 'order_id',
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

const { modelValue, search } = useVModels(props, emit);

watch(modelValue, () => (show.value = false));
watch(show, value => {
    value && setTimeout(() => inputSearchRef.value?.focus(), 200);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orders = computed((): any => {
    return props.items.map(item => {
        return {
            label: item.label,
            value: item,
        };
    });
});
</script>

<template>
    <Popover v-model="show">
        <template #trigger="{ vbind }">
            <Button :end-icon="endIcon" v-bind="vbind" block justify="between">
                {{ modelValue?.[labelKey] ?? 'ㅤ' }}
            </Button>
        </template>
        <Paper>
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
            </div>
            <div class="sm:overflow-y-auto sm:max-h-[410px]">
                <div v-if="loadingSearch" class="flex items-center justify-center py-12">
                    <Spin width="1.9em" height="1.9em" color="primary" />
                </div>
                <Menu
                    v-else
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
        </Paper>
    </Popover>
</template>
