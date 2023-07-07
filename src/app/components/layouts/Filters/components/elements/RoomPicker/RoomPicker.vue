<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue';
import { pluralize } from '@/app/lib';
import {
    QuantityPicker,
    Typography,
    Switch,
    FloatingInput,
    Divider,
    Button,
    Tooltip,
    Chip,
} from '@ui/components';
import { XIcon } from '@ui/icons';
import ChildAgePicker from './ChildAgePicker.vue';
import { useMediaQuery } from '@vueuse/core';
import { UsersIcon } from '@ui/icons';

const Mobile = defineAsyncComponent(() => import('./Mobile.vue'));
const Desktop = defineAsyncComponent(() => import('./Desktop.vue'));

type Room = {
    adults: number[];
    children: number[];
    pet?: boolean;
};

type Props = {
    modelValue?: Room[];
    variant?: 'avia';
};

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    variant: undefined,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: Room[]): void }>();

const show = ref(false);

const matches = useMediaQuery('(max-width: 640px)');

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const addRoom = () => {
    value.value.push({
        adults: [36],
        children: [],
        pet: false,
    });
};

const removeRoom = (index: number) => {
    if (value.value.length === 1) return;
    value.value.splice(index, 1);
};

const addAdult = (index: number) => {
    if (value.value[index].adults.length < 4) {
        value.value[index].adults.push(36);
    }
};

const removeAdult = (index: number) => {
    value.value[index].adults.pop();
};

const addChild = (num: number, index: number) => {
    if (value.value[index].children?.length < 3) {
        value.value[index].children.push(num);
    }
};

const removeChild = (index: number) => {
    value.value[index].children.pop();
};

const label = computed(() => {
    let hasChild = false;

    const count = props.modelValue.reduce((a, b) => {
        b.adults && (a += b.adults.length);

        if (b.children?.length) {
            a += b.children.length;
            hasChild = true;
        }

        return a;
    }, 0);

    if (!count) return '';

    return `${pluralize(
        count,
        hasChild ? ['турист', 'туриста', 'туристов'] : ['взрослый', 'взрослых', 'взрослых']
    )}`;
});
</script>

<template>
    <component :is="matches ? Mobile : Desktop" title="Туристы" v-model="show">
        <template #trigger="{ vbind }">
            <FloatingInput
                v-bind="vbind"
                :model-value="label"
                :end-icon="UsersIcon"
                label="Туристы"
                readonly
            />
        </template>
        <div class="sm:m-5 w-[300px]">
            <div
                v-for="(room, index) in value"
                :key="index"
                :class="['space-y-4', variant !== 'avia' && 'mb-4']"
            >
                <div class="flex items-center justify-between" v-if="variant !== 'avia'">
                    <Typography variant="h4" class="-my-1">Номер {{ index + 1 }}</Typography>
                    <Tooltip placement="bottom" text="Удалить номер" v-if="value.length > 1">
                        <template #trigger="{ vbind }">
                            <button
                                v-bind="vbind"
                                class="focus:outline-none"
                                @click="removeRoom(index)"
                            >
                                <XIcon width="1.2em" height="1.2em" class="text-secondary-500" />
                            </button>
                        </template>
                    </Tooltip>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <Typography>Взрослые</Typography>
                    <QuantityPicker
                        :model-value="room.adults.length"
                        :min="1"
                        @increment="addAdult(index)"
                        @decrement="removeAdult(index)"
                    />
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <Typography>Дети</Typography>
                    <ChildAgePicker
                        :value="room.children.length"
                        @decrement="removeChild(index)"
                        @increment="num => addChild(num, index)"
                    />
                </div>
                <div
                    v-for="(child, i) in room.children"
                    :key="i"
                    class="flex items-center justify-between"
                >
                    <Typography> Ребенок {{ i + 1 }} </Typography>
                    <Chip closable @close="room.children.splice(i, 1)">
                        {{ pluralize(value[index].children[i], ['год', 'года', 'лет']) }}
                    </Chip>
                </div>
                <div class="flex items-center justify-between space-x-4" v-if="variant !== 'avia'">
                    <Typography>Домашний питомец</Typography>
                    <Switch v-model="room.pet" />
                </div>
                <Divider dashed v-if="index + 1 !== value.length && variant !== 'avia'" />
            </div>
            <Button v-if="variant !== 'avia'" block @click="addRoom">Добавить номер</Button>
        </div>
    </component>
</template>
