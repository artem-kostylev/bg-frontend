<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { formatCurrency } from '@/app/lib/helpers';
// import { ClockIcon } from '@ui/icons';
import Info from './Info.vue';
import { useLazyAsyncData } from '#imports';
import { fetchActivitySearch } from '@/booking/services';
import { useToursStore } from '@/tours/stores/tours';
import type { ActivityTicket, Ticket, TicketInfo, Tickets, ActivityInfo } from '@/booking/types';
import { Card, Button, Spin } from '@ui/components';
// TODO: добавить компоненты
// import { QuantityPicker, DatePicker } from '@ui/components';

type Props = {
    activityInfo: ActivityInfo;
    activityIndex: number;
    status: string;
    close(): void;
};

const props = defineProps<Props>();

type Filters = {
    date?: string;
    time?: string;
    option?: string;
};

type AllFilters = {
    type: string;
    label: string;
    key: keyof Filters;
    value: number | string;
    allowed?: string[];
    options?: {
        label: string;
        value: number | string;
    }[];
};

const filters = ref<Filters>({});

const activity = computed(() => {
    return store.selectedActivities[props.activityIndex];
});

const { data, pending } = useLazyAsyncData(
    'activity-search',
    () => fetchActivitySearch(filters.value, activity.value, props.status),
    {
        server: false,
    }
);

const store = useToursStore();

const selectedTickets = computed(() => store.selectedTickets);

const selectedIndex = computed(() => {
    return selectedTickets.value.findIndex(
        (item: ActivityTicket) => item.id === data.value!.activity_item_id
    );
});

const tickets = ref<Tickets | Record<string, never>>({});

const price = computed(() => {
    return data.value!.tickets.reduce((a: number, b: TicketInfo) => {
        a += b.price * tickets.value[b.key];

        return a;
    }, 0);
});

const canSubmit = computed(() => {
    return Object.values(tickets.value).filter(Boolean).length;
});

type Prices = {
    [k: string]: {
        price: number;
        qty: number;
    };
};

const onSubmit = () => {
    const keys = Object.keys(tickets.value);

    const ticket = keys.reduce((a: Ticket[], b: keyof Tickets) => {
        tickets.value[b] && a.push({ price_type: b, qty: tickets.value[b] });

        return a;
    }, []);

    const prices = data.value!.tickets.reduce((a: Prices, b: TicketInfo) => {
        a[b.label] = { price: b.price * tickets.value[b.key], qty: tickets.value[b.key] };

        return a;
    }, {});

    if (selectedIndex.value !== -1) {
        if (!ticket.length) {
            store.spliceTickets(selectedIndex.value, 1);

            store.selectedActivities[props.activityIndex].selected = false;
        } else {
            store.changeTicket(
                selectedIndex.value,
                JSON.parse(
                    JSON.stringify({
                        id: data.value?.activity_item_id,
                        price: price.value,
                        prices,
                        ticket,
                        activity: props.activityInfo,
                    })
                )
            );

            store.selectedActivities[props.activityIndex].selected = true;
        }
    } else {
        if (ticket.length) {
            store.selectedActivities[props.activityIndex].selected = true;

            store.addTicket({
                id: data.value!.activity_item_id,
                price: price.value,
                prices,
                ticket,
                activity: props.activityInfo,
            });
        }
    }

    props.close();
};

// const onUpdate = () => {
//     refresh();
// };

// const dateDisabled = (ts: number, arr: string[]) => {
//     const allowed = arr.map(str => {
//         const date = new Date(str);
//         date.setHours(0, 0, 0, 0);
//
//         return date.getTime();
//     });
//
//     return !allowed.includes(ts);
// };

watch(data, value => {
    if (value) {
        if (!Object.keys(filters.value).length) {
            // TODO
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filters.value = value.filters.reduce((a: any, b: AllFilters) => {
                a[b.key] = b.value;

                return a;
            }, {});
        }

        if (!selectedTickets.value[selectedIndex.value]) {
            tickets.value = value.tickets.reduce((a: Tickets, b: TicketInfo) => {
                a[b.key] = b.min;

                return a;
            }, {});
        }
    }
});

onMounted(() => {
    if (selectedTickets.value[selectedIndex.value]) {
        tickets.value = selectedTickets.value[selectedIndex.value].ticket.reduce(
            // TODO
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (a: any, b: Ticket) => {
                a[b.price_type] = b.qty;

                return a;
            },
            {}
        );
    }
});
</script>

<template>
    <Card>
        <Info :activity="activityInfo" :close="close" />
        <div v-if="status !== 'include'" class="space-y-4">
            <div>
                <div class="text-xl lg:text-2xl mb-4">Заказ экскурсии</div>
                <div v-if="pending && !data" class="flex justify-center py-5">
                    <Spin class="text-blue-700" width="2.4em" height="2.4em" />
                </div>
                <div class="space-y-4" v-else-if="data && !activity.selected">
                    <div class="flex flex-wrap -mx-1.5 -mb-3">
                        <div
                            class="w-full md:w-auto px-1.5 mb-3"
                            v-for="item in data.filters"
                            :key="item.key"
                        >
                            <!--
                                    <template v-if="item.type === 'date'">
                                    <DatePicker
                                        v-model="filters[item.key as keyof Filters]"
                                        format="dd.MM.yyyy"
                                        value-format="yyyy-MM-dd"
                                        :date-disabled="(ts: any) => dateDisabled(ts, item.allowed)"
                                        @update:model-value="onUpdate"
                                    />
                                </template>
                                -->
                            <!--                            <template v-if="item.type === 'time'">
                                <Select
                                    :end-icon="ClockIcon"
                                    :items="item.options"
                                    @update:model-value="onUpdate"
                                />
                            </template>
                            <template v-if="item.type === 'select'">
                                <Select :items="item.options" @update:model-value="onUpdate" />
                            </template>-->
                        </div>
                    </div>
                    <div class="lg:max-w-[50%]">
                        <div class="font-bold mb-3">Кол-во билетов</div>
                        <div v-if="data">
                            <div
                                class="flex items-center space-x-8 mb-2"
                                v-for="ticket in data.tickets"
                                :key="ticket.key"
                            >
                                <div class="flex-1">
                                    <div>{{ ticket.label }}</div>
                                    <div class="font-bold">
                                        {{ formatCurrency(ticket.price) }}
                                    </div>
                                </div>
                                <!--
                                        <QuantityPicker
                                        v-model="tickets[ticket.key]"
                                        :min="ticket.min"
                                        :max="ticket.max"
                                    />-->
                            </div>
                            <div class="text-center">
                                <div class="mb-3 text-lg">
                                    Стоимость экскурсии:
                                    <span class="inline font-bold">{{
                                        formatCurrency(price)
                                    }}</span>
                                </div>
                                <Button
                                    @click="onSubmit"
                                    :disabled="!canSubmit"
                                    size="lg"
                                    variant="primary"
                                    block
                                >
                                    Добавить к туру
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>
