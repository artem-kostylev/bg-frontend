<script setup lang="ts">
import { ref } from 'vue';
import type { ActivityDetail } from '@/booking/types';
import { pluralize } from '@/app/lib';
import { Tabs } from '@ui/components';

type Props = {
    activity: ActivityDetail;
};

defineProps<Props>();

const currentTab = ref(1);

const tabs = [
    {
        label: 'Описание',
        value: 1,
    },
    {
        label: 'Что включено',
        value: 2,
    },
    {
        label: 'Что не включено',
        value: 3,
    },
    {
        label: 'Продолжительность',
        value: 4,
    },
];
</script>

<template>
    <div class="space-y-5">
        <Tabs v-model="currentTab" :tabs="tabs" class="px-5 -mx-5" />
        <div v-if="currentTab === 1" class="space-y-5">
            <div v-if="activity.short_description" v-html="activity.short_description"></div>
            <div v-if="activity.description" v-html="activity.description"></div>
        </div>
        <div v-if="currentTab === 2">
            {{ activity.included.join(', ') }}
        </div>
        <div v-if="currentTab === 3">
            {{ activity.not_included.join(', ') }}
        </div>
        <div v-if="currentTab === 4">
            {{ pluralize(activity.duration, ['час', 'часа', 'часов']) }}
        </div>
    </div>
</template>
