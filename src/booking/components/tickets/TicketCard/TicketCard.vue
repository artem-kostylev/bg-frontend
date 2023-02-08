<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLazyAsyncData } from "#imports";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import { Button, Modal } from "@ui/components";
import type { Movement } from "@/booking/types";
import { MovementCard, RateModal } from "@/booking/components";
import { fetchMovement, FetchMovementQuery, FetchMovementPayload } from "@/booking/services";

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const open = ref(false);

const query = useQuery<FetchMovementQuery>();

const payload = computed<FetchMovementPayload>(() => ({
    ...query.value,
    flight_hash: props.movement.flight_hash,
}));

const { data, pending, execute } = useLazyAsyncData(
    "tickets-movement",
    () => fetchMovement(payload.value),
    {
        server: false,
        immediate: false,
    }
);

watch(open, value => value && execute());
</script>

<template>
    <MovementCard :movement="movement">
        <template #footer>
            <Modal v-model="open" :loading="pending">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind">{{ formatCurrency(0) }}</Button>
                </template>
                <RateModal v-if="data" :movement="data" />
            </Modal>
        </template>
    </MovementCard>
</template>
