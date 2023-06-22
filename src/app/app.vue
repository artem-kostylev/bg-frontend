<script setup lang="ts">
import { Header, Footer } from '@/app/components';
import { MessageProvider } from '@ui/components';
import { fetchNavigation } from '@/app/services';
import { onMounted } from 'vue';
import { useQuery } from '@/app/composables';
import { parseFilters } from '@/app/lib';
import type { FiltersRaw } from '@/app/types';

const query = useQuery<FiltersRaw>();

onMounted(async () => {
    await fetchNavigation({
        status: 'accommodations',
        filters: parseFilters(query.value),
        tour_type: 'classic',
    });
});
</script>

<template>
    <div>
        <MessageProvider />
        <VitePwaManifest />
        <div class="min-h-screen flex flex-col">
            <Header />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
        <Footer />
    </div>
</template>
