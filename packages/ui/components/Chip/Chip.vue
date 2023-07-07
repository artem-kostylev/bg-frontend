<script setup lang="ts">
import { XIcon } from '@ui/icons';

type Props = {
    closable?: boolean;
    clicable?: boolean;
};

defineProps<Props>();

const emit = defineEmits<{ (e: 'close'): void }>();

const close = () => {
    emit('close');
};
</script>

<template>
    <div
        :class="[
            'select-none inline-flex items-center bg-slate-200 border border-transparent rounded-full px-2.5 py-1 text-sm font-medium transition-colors',
            clicable && 'hover:bg-slate-300 cursor-pointer',
        ]"
    >
        <div :class="['truncate w-full']">
            <slot />
        </div>
        <button v-if="closable" @click="close">
            <XIcon
                width="1.1em"
                height="1.1em"
                class="ml-1.5 text-slate-500 -mr-1 hover:text-slate-900"
            />
        </button>
    </div>
</template>
