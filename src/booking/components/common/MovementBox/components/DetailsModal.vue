<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { clearNuxtData, useLazyAsyncData } from "#imports";
import { fetchVoyage } from "@/booking/services";
import type { Movement } from "@/booking/types";
import { Modal, Tooltip } from "@ui/components";
import { InfoIcon } from "@ui/icons";
import StopsHorizontal from "./StopsHorizontal.vue";
import SegmentCard from "./SegmentCard.vue";

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const { data, pending, execute } = useLazyAsyncData(
    `voyage-${props.movement.flight_hash}`,
    () => fetchVoyage(props.movement.flight_hash),
    { server: false, immediate: false }
);

const open = () => !data.value && execute();

onBeforeUnmount(() => clearNuxtData(`voyage-${props.movement.flight_hash}`));
</script>

<template>
    <Modal :loading="pending" @open="open" title="Детали перемещения">
        <template #trigger="{ vbind }">
            <button v-bind="vbind" class="text-slate-500 mt-4">
                <Tooltip text="Детали перемещения">
                    <template #trigger="slotProps">
                        <InfoIcon v-bind="slotProps.vbind" width="1.4em" height="1.4em" />
                    </template>
                </Tooltip>
            </button>
        </template>
        <template v-if="data">
            <StopsHorizontal :movement="data" />
            <div class="grid gap-5 mt-5">
                <SegmentCard
                    v-for="segment in data.segments"
                    :key="segment.id"
                    :segment="segment"
                />
            </div>
        </template>
    </Modal>
</template>
