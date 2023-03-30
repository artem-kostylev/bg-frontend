<script setup lang="ts">
import { Container, Typography } from "@ui/components";
</script>

<template>
    <footer class="bg-slate-50">
        <Container>
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-8">
                <div class="space-y-1.5">
                    <Typography variant="h3">8 800 775 25 00</Typography>
                    <Typography variant="description">Звонок по России бесплатный</Typography>
                </div>
                <div class="space-y-2.5 flex flex-col">
                    <NuxtLink
                        :to="{ name: 'pages-slug', params: { slug: 'contacts' } }"
                        class="hover:text-primary-500"
                    >
                        О компании
                    </NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Вакансии</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Визы и паспорта</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Документы</NuxtLink>
                </div>
                <div class="space-y-2.5 flex flex-col">
                    <NuxtLink to="#" class="hover:text-primary-500">
                        Акции и спецпредложения
                    </NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Бронирование</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Реквизиты</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Контакты</NuxtLink>
                </div>
                <div class="space-y-2.5 flex flex-col">
                    <NuxtLink to="#" class="hover:text-primary-500">Кабинет агентства</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Сотрудничество</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">Франчайзинг</NuxtLink>
                    <NuxtLink to="#" class="hover:text-primary-500">API</NuxtLink>
                </div>
            </div>
            <div class="border-t border-slate-200 border-dashed py-4">
                <div class="flex items-center justify-between">
                    <Typography variant="description">
                        © {{ new Date().getFullYear() }} «Библио-Глобус»
                    </Typography>
                </div>
            </div>
        </Container>
    </footer>
</template>
