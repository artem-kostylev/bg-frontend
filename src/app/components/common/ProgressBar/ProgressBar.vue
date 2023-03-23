<script setup lang="ts">
import { ref } from "vue";
import { Container } from "@ui/components";
import { computed } from "vue";

const items = [
    { label: "Выбор отеля", value: 1 },
    { label: "Выбор проживания", value: 2 },
    { label: "Билеты", value: 3 },
    { label: "Оформление", value: 4 },
    { label: "Оплата", value: 5 },
];

const selected = ref(2);

const lastItemIndex = computed(() => items.length - 1);
</script>

<template>
    <div class="border-b border-slate-200">
        <Container>
            <div class="flex items-center -mx-4">
                <div class="flex items-center" v-for="(item, index) in items" :key="item.value">
                    <a
                        href="/tours"
                        :class="[
                            'px-4 py-3 border-b-2 -mb-px font-medium border-transparent select-none',
                            selected === item.value && 'text-primary-500 border-primary-500',
                            selected < item.value && 'text-slate-500 pointer-events-none',
                        ]"
                    >
                        {{ item.label }}
                    </a>
                    <svg
                        v-if="lastItemIndex !== index"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-slate-400"
                    >
                        <path d="M5 12h13M12 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        </Container>
    </div>
</template>
