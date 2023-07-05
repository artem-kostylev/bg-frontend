<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { Menu, Paper, Spin, Popover, SelectButton, Field } from '@ui/components';
import { SearchIcon } from '@ui/icons';
import { useVModels } from '@vueuse/core';

type Value = {
    created_at: string;
    label: string;
    order_id: number;
    order_number: number;
};

type Props = {
    block?: boolean;
    bordered?: boolean;
    modelValue?: Value;
    labelKey?: keyof Value;
    valueKey?: string;
    descriptionKey?: string;
    childrenKey?: string;
    label?: string;
    options: {
        order_id: number;
        order_number: number;
        created_at: string;
        label: string;
    }[];
    search: string;
    loading?: boolean;
    loadingSearch?: boolean;
    required?: boolean;
    error?: string;
};

const props = withDefaults(defineProps<Props>(), {
    labelKey: 'order_id',
    valueKey: 'value',
    label: '',
    error: '',
    descriptionKey: 'description',
    childrenKey: 'children',
    modelValue: undefined,
    options: () => [],
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

const { modelValue, search } = useVModels(props, emit);

watch(modelValue, () => (show.value = false));
watch(show, value => {
    value && setTimeout(() => inputSearchRef.value?.focus(), 200);
});
</script>

<template>
    <Popover v-model="show">
        <template #trigger="{ vbind }">
            <Field :required="required" :label="label" :error="error">
                <SelectButton
                    :value="modelValue?.[labelKey]"
                    :open="show"
                    v-bind="{ ...vbind, ...$attrs }"
                    :error="error"
                    :label="label"
                    :block="block"
                    :required="required"
                    :loading="loading"
                />
            </Field>
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
                    :options="options"
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
