<script setup lang="ts">
import { computed, ref } from 'vue';
import { Input, Button, Alert, Modal } from '@ui/components';
import { ChevronDownIcon } from '@ui/icons';
import { formatCurrency } from '@/app/lib/helpers';

type Props = {
    label: string;
    name?: string;
    required?: boolean;
    hint: string;
    items:
        | {
              id: number;
              name: string;
              price: number;
              description: { currency: string; sum: string | number };
          }[]
        | null;
    modelValue?: number;
    disabled?: boolean;
    status?: 'error' | 'success';
};

const show = ref(false);

const props = withDefaults(defineProps<Props>(), {
    items: null,
    name: '',
    hint: '',
    modelValue: undefined,
    status: undefined,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const select = (value: number) => {
    emit('update:modelValue', value);
    show.value = false;
};

const selected = (value: number) => {
    return props.modelValue === value;
};

const title = computed(() => {
    if (!props.items) return;

    const item = props.items.find(item => item.id === props.modelValue);
    return item?.name || '';
});
</script>

<template>
    <Modal v-model="show" :label="label" :size="'2xl'">
        <template #trigger="{ vbind }">
            <div>
                <Input
                    v-bind="vbind"
                    readonly
                    :end-icon="ChevronDownIcon"
                    :label="label"
                    :required="required"
                    :status="status"
                    :hint="hint"
                    :model-value="title"
                    :disabled="disabled"
                />
            </div>
        </template>
        <div v-if="items?.length">
            <div
                class="grid grid-cols-[2fr_1fr] py-4 border-b last:border-none first:pt-0 last:pb-0 border-secondary-300 border-dashed sm:flex items-center justify-between"
                v-for="item in items"
                :key="item.id"
            >
                <div>
                    <div>{{ item.name }}</div>
                    <div v-if="item.description" class="text-sm mt-1 text-secondary-500">
                        Страховая сумма:
                        {{ formatCurrency(+item.description.sum, item.description.currency) }}
                    </div>
                </div>
                <Button
                    @click="select(item.id)"
                    variant="primary"
                    :disabled="selected(item.id)"
                    class="w-40 items-center justify-center"
                >
                    + {{ formatCurrency(item.price || 0) }}
                </Button>
            </div>
        </div>
        <div v-else>
            <Alert type="error" text="Список страховок пуст" />
        </div>
    </Modal>
</template>
