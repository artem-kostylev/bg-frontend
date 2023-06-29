<script setup lang="ts">
import { Alert } from '@ui/components';
import type { Ref } from 'vue';

type Props = {
    show: boolean;
    text: string | Ref<string>;
};

defineProps<Props>();
</script>

<template>
    <Transition
        appear
        leave-to-class="opacity-0 scale-85"
        enter-from-class="opacity-0 scale-100"
        enter-active-class="transition ease-in scale-100"
        leave-active-class="transition ease-in-out scale-85"
    >
        <Alert
            v-if="show && typeof text === 'string'"
            variant="error"
            title="Ошибка заполнения формы"
            :text="text"
        />
    </Transition>
</template>
