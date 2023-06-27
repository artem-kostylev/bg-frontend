<script lang="ts">
export default { inheritAttrs: true };
</script>

<script setup lang="ts">
import { computed, ref, h } from 'vue';
import { Field, Modal, Button, Divider } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import { formatCurrency } from '@/app/lib/helpers';
import type { Ref } from 'vue';
import { Empty } from '@/app/components';
import type { StringOrNumber } from '@ui/types';

type Option = {
    id: number;
    name: string;
    description: {
        sum: number;
        currency: string;
    };
    price?: number;
};

type Props = {
    label: string;
    name?: string;
    loading?: boolean;
    required?: boolean;
    error?: string | Ref<string>;
    options?: Option[] | null;
    modelValue?: number;
    disabled?: boolean;
};

const open = ref(false);

const props = withDefaults(defineProps<Props>(), {
    options: null,
    name: '',
    hint: '',
    modelValue: undefined,
    error: undefined,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const select = (value: number) => {
    emit('update:modelValue', value);
    open.value = false;
};

const selected = (value: number) => {
    return props.modelValue === value;
};

const title = computed(() => {
    if (!props.options) return 'ㅤ';

    const item = props.options.find(option => option.id === props.modelValue);
    return item?.name || 'ㅤ';
});

const buttonVariant = computed(() => {
    return props.error ? 'danger-outline' : 'base';
});

const buttonClass = computed(() => {
    return props.error ? 'border-danger-700' : 'border-secondary-400';
});

const endIcon = (props: Record<string, StringOrNumber>) => {
    return h(ChevronDownIcon, {
        ...props,
        class: ['transition-transform', open.value && 'rotate-180'],
    });
};
</script>

<template>
    <Modal v-model="open" :title="label" size="lg">
        <template #trigger="{ vbind }">
            <Field :name="name" :required="required" :label="label" :error="error">
                <Button
                    :name="name"
                    v-bind="{ ...vbind, ...$attrs }"
                    :end-icon="endIcon"
                    :class="open && buttonClass"
                    :variant="buttonVariant"
                    :strong="false"
                    justify="between"
                    :loading="loading"
                    block
                    :disabled="disabled"
                >
                    {{ title }}
                </Button>
            </Field>
        </template>
        <div v-if="options?.length">
            <div class="space-y-5" v-for="(option, index) in options" :key="option.id">
                <Divider v-if="index !== 0" class="mt-5" dashed />
                <div class="flex items-center justify-between">
                    <div>
                        <div>{{ option.name }}</div>
                        <div v-if="option.description" class="text-sm mt-1 text-secondary-500">
                            Страховая сумма:
                            {{
                                formatCurrency(
                                    option.description.sum,
                                    false,
                                    option.description.currency
                                )
                            }}
                        </div>
                    </div>
                    <Button
                        size="sm"
                        @click="select(option.id)"
                        :variant="selected(option.id) ? 'base' : 'primary'"
                        :disabled="selected(option.id)"
                    >
                        + {{ formatCurrency(option.price ?? 0) }}
                    </Button>
                </div>
            </div>
        </div>
        <Empty v-else title="Список страховок пуст" />
    </Modal>
</template>
