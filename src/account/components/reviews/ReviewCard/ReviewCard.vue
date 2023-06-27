<script setup lang="ts">
import { computed } from 'vue';
import { Card, Image, Typography, Button } from '@ui/components';
import { CommentIcon, ReadCommentIcon, CrossInCircleIcon, CheckIcon, ClockIcon } from '@ui/icons';
import { LocationList } from '@/app/components';
import type { ReviewableHotel } from '@/account/types';
import type { Review } from '@/tours/types';
import { formatDate, pluralize } from '@/app/lib';

type Props = {
    hotel: ReviewableHotel | Review;
    action: 'add' | 'read';
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.hotel.duration, ['ночь', 'ночи', 'ночей']));

const dates = computed(() => {
    return `${formatDate(props.hotel.date_from, 'DD.MM')} - ${formatDate(
        props.hotel.date_to,
        'DD.MM.YYYY'
    )}`;
});

const emit = defineEmits<{
    (e: 'open'): void;
}>();

const open = () => {
    emit('open');
};

const statusIcon = computed(() => {
    if (!props.hotel.status) return;

    switch (props.hotel.status.key_name) {
        case 'ACCEPTED':
            return CheckIcon;
        case 'NEW':
            return ClockIcon;
        case 'REJECTED':
            return CrossInCircleIcon;
        default:
            return ClockIcon;
    }
});
</script>

<template>
    <Card cover-class="h-[14rem] bg-secondary-100" body-class="flex flex-col justify-end">
        <template #cover>
            <div class="relative">
                <Image
                    v-if="hotel.images && hotel.images[0]"
                    :src="hotel.images[0].url"
                    :alt="hotel.name"
                    class="w-full h-full object-cover"
                />
                <div v-if="hotel.status" class="absolute top-0 px-4 text-sm">
                    <div
                        class="flex items-center space-x-2.5 px-3 py-1.5 rounded-b-md"
                        :class="[
                            hotel.status.key_name === 'ACCEPTED' && 'bg-[#B5DFB4] text-black',
                            hotel.status.key_name === 'NEW' && 'bg-blue-100 text-black',
                            hotel.status.key_name === 'REJECTED' && 'bg-orange-600  text-white',
                        ]"
                    >
                        <component v-if="statusIcon" :is="statusIcon" class="text-secondary-500" />
                        <span>{{ hotel.status.description }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template #header>
            <Typography variant="h3" as="h2" class="mb-1">
                {{ hotel.name }}
            </Typography>
            <LocationList v-if="hotel.location" target="_blank" :location="hotel.location" />
        </template>
        <div class="flex space-x-2 items-center mb-5">
            <div>{{ dates }} ({{ duration }})</div>
        </div>
        <div class="flex justify-end mt-auto">
            <Button
                variant="secondary"
                :start-icon="action === 'add' ? CommentIcon : ReadCommentIcon"
                class="w-full sm:w-max"
                @click="open"
            >
                {{ action === 'add' ? 'Добавить отзыв' : 'Читать отзыв' }}
            </Button>
        </div>
    </Card>
</template>
