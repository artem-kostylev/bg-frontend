<script setup lang="ts">
import { ref, computed } from 'vue';
import { Popover, Typography } from '@ui/components';
import { MinusIcon, PlusIcon } from '@ui/icons';

const emit = defineEmits(['increment', 'decrement']);

type Props = {
    value: number;
    min?: number;
    max?: number;
};

withDefaults(defineProps<Props>(), {
    value: 0,
    min: undefined,
    max: undefined,
});

const show = ref(false);

const arr = computed(() => {
    return [...Array(18)].map((_, i) => 0 + i);
});

const increment = (num: number) => {
    emit('increment', num);
    show.value = false;
};

const decrement = () => {
    emit('decrement');
};
</script>

<template>
    <div class="flex items-center space-x-3">
        <button
            class="border border-transparent bg-secondary-200 hover:bg-secondary-300 transition-colors duration-250 h-9 w-9 flex items-center justify-center rounded-full"
            @click="decrement"
        >
            <MinusIcon width="1.2rem" height="1.2rem" class="text-secondary-500" />
        </button>
        <div class="font-medium w-4 text-center">
            {{ value }}
        </div>
        <Popover v-model="show">
            <template #trigger="{ vbind }">
                <button
                    v-bind="vbind"
                    class="border border-transparent bg-secondary-200 hover:bg-secondary-300 transition-colors duration-250 h-9 w-9 flex items-center justify-center rounded-full"
                >
                    <PlusIcon width="1.2rem" height="1.2rem" class="text-secondary-500" />
                </button>
            </template>
            <div class="px-2.5 pt-3 pb-2">
                <Typography variant="h5" class="px-3 mb-2">Возраст ребенка</Typography>
                <div class="grid grid-cols-6">
                    <div v-for="num in arr" :key="num">
                        <button
                            class="focus:outline-none m-px border border-transparent hover:bg-secondary-300 transition-colors duration-250 h-9 w-9 flex items-center justify-center rounded-full"
                            @click="increment(num)"
                        >
                            {{ num }}
                        </button>
                    </div>
                </div>
            </div>
        </Popover>
    </div>
</template>
