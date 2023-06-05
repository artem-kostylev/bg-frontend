<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLazyAsyncData } from '#imports';
import { fetchActivity } from '@/booking/services';
import { formatCurrency } from '@/app/lib/helpers';
import { XIcon, PlusCircleIcon, CheckIcon, ChevronRightIcon } from '@ui/icons';
import { Modal, Button, Image } from '@ui/components';
import OptionalExcursionCardModal from './Modal.vue';
import type { Activity } from '@/booking/types/';
import { useToursStore } from '@/tours/stores/tours';
import { pluralize } from '@/app/lib/helpers';

type Props = {
    activity: Activity;
    activityIndex: number;
};

const props = defineProps<Props>();

const { data, pending, execute } = useLazyAsyncData(
    'activity',
    () => fetchActivity(props.activity.id.toString()),
    {
        immediate: false,
        server: false,
    }
);

// flag to show modal
const show = ref(false);

watch(show, value => value && execute());

const priceType = computed(() => {
    return props.activity.price_type === 'per_person' ? 'За 1 человека' : 'За группу';
});

const store = useToursStore();

// unselect activity
const close = () => {
    store.removeTickets(props.activity.id);

    store.selectedActivities[props.activityIndex].selected = false;
};

const selectedTickets = computed(() => store.selectedTickets);

// selected tickets for this activity
const activityTickets = computed(() =>
    selectedTickets.value.filter(ticket => ticket.activity?.id === props.activity.id)
);

// total price of all selected tickets for this activity
const ticketsPrice = computed(() => {
    if (!activityTickets.value.length) return 0;

    return activityTickets.value.reduce((sum, item) => sum + item.price, 0);
});

// total amount of tourists with tickets for this activity
const qty_tourists = computed(() => {
    if (!activityTickets.value.length) return 0;

    let touristsNum = 0;
    activityTickets.value.forEach(ticket => {
        for (const prop in ticket.prices) {
            touristsNum += ticket.prices[prop].qty;
        }
    });

    return touristsNum;
});

// selected tickets for this activity with tourists types
const ticketsTourists = computed(() => {
    if (!activityTickets.value.length) return {};

    const currTickets: Record<string, number> = {};
    activityTickets.value.forEach(element => {
        for (const prop in element.ticket) {
            currTickets[element.ticket[prop].price_type] = 0;
        }

        for (const prop in element.ticket) {
            currTickets[element.ticket[prop].price_type] += element.ticket[prop].qty;
        }
    });

    return currTickets;
});

const touristsTypes: Record<string, string[]> = {
    adult: ['взрослый', 'взрослых', 'взрослых'],
    child: ['ребенок', 'ребенка', 'детей'],
    infant: ['младенец', 'младенца', 'младенцев'],
};

const priceCaption = computed(() => {
    if (!activityTickets.value.length) return '';

    let res = 'За ';
    res += pluralize(qty_tourists.value, ['турист', 'туристов', 'туристов']) + ': ';

    Object.keys(ticketsTourists.value).forEach((key, keyIndex) => {
        res += pluralize(ticketsTourists.value[key], touristsTypes[key]);
        keyIndex + 1 !== Object.keys(ticketsTourists.value).length && (res += ', ');
    });

    return res;
});
</script>

<template>
    <div class="shadow-primary rounded-lg overflow-hidden h-full flex flex-col">
        <div class="relative">
            <Image :src="activity.image?.url" class="h-52 w-full object-cover" />
            <div v-if="activity.status === 'include'" class="absolute top-0 px-4 text-sm">
                <div
                    class="flex items-center space-x-2.5 bg-[#B5DFB4] px-3 py-1.5 text-black rounded-b-md"
                >
                    <CheckIcon width="1em" height="1em" />
                    <span>В составе</span>
                </div>
            </div>
            <div v-else-if="activity.selected" class="absolute top-0 px-4 text-sm">
                <div
                    class="flex items-center space-x-2.5 bg-[#B5DFB4] px-3 py-1.5 text-black rounded-b-md"
                >
                    <CheckIcon width="1em" height="1em" />
                    <span>Выбрано</span>
                </div>
            </div>
            <div v-else class="absolute top-0 px-4 text-sm">
                <div
                    class="flex items-center space-x-2.5 bg-orange-600 px-3 py-1.5 text-white rounded-b-md"
                >
                    <PlusCircleIcon width="1em" height="1em" />
                    <span>Дополнительно</span>
                </div>
            </div>
        </div>
        <div class="p-5 h-full flex flex-col justify-between">
            <div>{{ activity.name }}</div>
            <div
                v-if="activity.status === 'include'"
                class="mt-4 flex w-full items-center justify-between"
            >
                <Button
                    variant="simplified"
                    :end-icon="ChevronRightIcon"
                    icon-class="w-5 h-5"
                    @click="show = true"
                >
                    Подробнее
                </Button>
                <Button disabled>
                    {{ formatCurrency(0) }}
                </Button>
            </div>
            <div v-else class="mt-4 flex w-full items-start justify-between">
                <Button
                    variant="simplified"
                    :end-icon="ChevronRightIcon"
                    icon-class="w-5 h-5"
                    @click="show = true"
                    >Подробнее</Button
                >
                <div class="flex flex-col md:items-end md:justify-end">
                    <div class="flex items-center justify-end space-x-2 w-full">
                        <button
                            @click="close"
                            v-if="activity.selected"
                            class="text-red-600 hover:text-red-700"
                        >
                            <XIcon />
                        </button>
                        <Button
                            v-if="activity.selected && activity.status === 'additionally'"
                            @click="show = true"
                            :variant="activity.selected ? 'base' : 'primary'"
                            :disabled="activity.selected"
                        >
                            {{ formatCurrency(ticketsPrice) }}
                        </Button>
                        <Button
                            v-else
                            @click="show = true"
                            :variant="activity.selected ? 'base' : 'primary'"
                            :disabled="activity.selected"
                        >
                            от {{ formatCurrency(activity.price) }}
                        </Button>
                    </div>
                    <div
                        v-if="activity.status === 'additionally'"
                        class="text-slate-500 text-sm mt-2 text-end <sm:text-right"
                    >
                        <span v-if="activity.selected">{{ priceCaption }}</span>
                        <span v-else> {{ priceType }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="show" :loading="pending" size="lg">
            <template>
                <OptionalExcursionCardModal
                    v-if="data"
                    :activity-info="data.activity"
                    :activity-index="activityIndex"
                    :close="close"
                    :status="activity.status"
                />
            </template>
        </Modal>
    </div>
</template>
