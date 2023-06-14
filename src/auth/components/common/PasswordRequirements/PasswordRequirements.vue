<script setup lang="ts">
import { Button, CollapseTransition } from '@ui/components';
import { SmallArrowIcon } from '@ui/icons';

type Props = {
    modelValue: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const toggle = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>

<template>
    <div>
        <Button
            variant="ghost"
            @click="toggle"
            :end-icon="SmallArrowIcon"
            :icon-class="modelValue ? 'w-3 transform rotate-180' : 'w-3'"
            >Требования к паролю</Button
        >
        <CollapseTransition :show="modelValue">
            <div class="mt-5 leading-5">
                Не менее 8 символов, содержит строчные и заглавные буквы, числа, спец.символы (%^&)
            </div>
        </CollapseTransition>
    </div>
</template>
