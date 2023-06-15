<script setup lang="ts">
import { ref, computed } from 'vue';
import { Input } from '@ui/components';
import { EyeOpenIcon, EyeCloseIcon } from '@ui/icons';
import type { InputPasswordProps } from './inputPassword';
import { defaultInputPasswordProps } from './inputPassword';

const props = withDefaults(defineProps<InputPasswordProps>(), defaultInputPasswordProps);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const showPassword = ref(false);

const icon = computed(() => {
    return showPassword.value ? EyeCloseIcon : EyeOpenIcon;
});
</script>

<template>
    <Input
        v-model="value"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :error="error"
        :success="success"
        :hint="hint"
        :label="label"
        :required="required"
        :start-icon="startIcon"
    >
        <template #end-icon>
            <button @click="showPassword = !showPassword">
                <component :is="icon" class="text-secondary-500" />
            </button>
        </template>
    </Input>
</template>
