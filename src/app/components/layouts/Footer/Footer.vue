<script setup lang="ts">
import { Container, Typography } from '@ui/components';
import { TelegramIcon, VkIcon } from '@ui/icons';

const links = [
    [
        {
            label: 'О компании',
            slug: 'about',
        },
        {
            label: 'Вакансии',
            slug: 'job',
        },
        {
            label: 'Контакты и Реквизиты',
            slug: 'contacts',
        },
        {
            label: 'Офисы продаж',
            slug: 'offices',
        },
    ],
    [
        {
            label: 'Акции и предложения',
            slug: 'promotions',
        },
        {
            label: 'Бронирование',
            slug: 'rules',
        },
        {
            label: 'Памятки туристам',
            slug: 'memos',
        },
    ],
    [
        {
            label: 'Кабинет агенствам',
            slug: 'account',
        },
        {
            label: 'Правила взаимодействия',
            slug: 'rules-agency',
        },
        {
            label: 'Как стать агентом',
            slug: 'for-new-agency',
        },
        {
            label: 'API',
            slug: 'api',
        },
    ],
];
</script>

<template>
    <footer class="bg-secondary-50">
        <Container>
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-8">
                <div class="space-y-1.5">
                    <Typography variant="h3">8 800 775 25 00</Typography>
                    <Typography variant="description">Звонок по России бесплатный</Typography>
                </div>
                <div v-for="(link, index) in links" :key="index" class="space-y-2.5 flex flex-col">
                    <NuxtLink
                        v-for="item in link"
                        :key="item.slug"
                        :to="{ name: 'pages-slug', params: { slug: item.slug } }"
                        class="hover:text-primary-500"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </div>
            </div>
            <div class="border-t border-secondary-200 border-dashed py-4">
                <div class="flex items-center justify-between">
                    <Typography variant="description">
                        © {{ new Date().getFullYear() }} «Библио-Глобус»
                    </Typography>
                    <div class="flex space-x-4">
                        <a
                            href="https://vk.com/bgoperatorb2c"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <VkIcon
                                width="1.4rem"
                                height="1.4rem"
                                class="text-secondary-500 hover:text-secondary-700 transition-colors"
                            />
                        </a>
                        <a href="https://t.me/bgoperator" rel="noopener noreferrer" target="_blank">
                            <TelegramIcon
                                width="1.4rem"
                                height="1.4rem"
                                class="text-secondary-500 hover:text-secondary-700 transition-colors"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    </footer>
</template>
