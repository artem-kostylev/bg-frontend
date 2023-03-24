<script setup lang="ts">
import { computed } from "vue";
import { clearError } from "#imports";
import { Button } from "@ui/components";
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

const meta = computed(() => {
    return errors[props.error.statusCode] || errors[500];
});

const reset = () => {
    clearError({ redirect: "/" });
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <Page :meta="meta">
            <div class="flex flex-col items-center justify-center flex-1">
                <h1 class="text-8xl font-semibold">{{ error.statusCode }}</h1>
                <p class="text-2xl text-slate-500">{{ meta.title }}</p>
                <Button variant="primary" size="sm" class="mt-5" @click="reset">
                    Перейти на главную
                </Button>
            </div>
        </Page>
        <Footer />
    </div>
</template>
