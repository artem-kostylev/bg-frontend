<script setup lang="ts">
import { computed } from 'vue';
import { Input } from '@ui/components';
import { required, confirmationCode } from '@/app/lib';
import { vMaska } from 'maska';
import { useSimpleForm } from '@/auth/composables';

type Props = {
    error?: string | null;
    inputDisabled?: boolean;
};

const props = defineProps<Props>();

const isError = computed(() => {
    return props.error != null;
});

const emit = defineEmits<{
    (e: 'submit', value: string): void;
    (e: 'clear-errors'): void;
}>();

const { v$ } = useSimpleForm({
    field: 'code',
    fieldRules: [required, confirmationCode],
    emit,
    onChange: true,
    isError,
});
</script>

<template>
    <div class="space-y-5">
        <slot name="label" />
        <Input
            v-model="v$.code.$model"
            name="code"
            placeholder="_ _ _ _"
            :error="v$.code.$errors[0]?.$message || error"
            :disabled="inputDisabled"
            justify="center"
            v-maska
            :data-maska="'####'"
        />
        <slot name="error" />
    </div>
</template>
