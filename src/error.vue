<script setup lang="ts">
import { computed } from "vue";
import { Header, Footer, Page } from "@/app/components";

type Error = {
    statusCode: 404 | 500;
};

type Props = {
    error: Error;
};

const props = defineProps<Props>();

const errors = {
    404: { title: "Страница не найдена" },
    500: { title: "Что-то пошло не так" },
};

const meta = computed(() => errors[props.error.statusCode]);
</script>

<template>
    <div>
        <div class="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[100%]">
            <Header />
            <Page :meta="meta">
                <div class="flex flex-col items-center justify-center">
                    <h1 class="text-8xl font-semibold">{{ error.statusCode }}</h1>
                    <p class="text-2xl text-slate-500">{{ meta.title }}</p>
                </div>
            </Page>
            <Footer />
        </div>
    </div>
</template>
