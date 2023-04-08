<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import { Button, Modal } from "@ui/components";
import type { Movement } from "@/booking/types";
import { MovementCard, RateModal } from "@/booking/components";
import type { FetchMovementQuery } from "@/booking/services";
import { fetchMovement } from "@/booking/services";

type Props = {
    movement: Movement;
    price: number;
};

const props = defineProps<Props>();

const query = useQuery<FetchMovementQuery>();

const getMovement = () => {
    return fetchMovement({
        ...query.value,
        flight_hash: props.movement.flight_hash,
    });
};

const { data, pending, execute } = useLazyAsyncData("tickets-movement", getMovement, {
    server: false,
    immediate: false,
});
</script>

<template>
    <MovementCard :movement="movement">
        <template #footer>
            <Modal :loading="pending" @open="execute()" size="lg" title="Выбор тарифа">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind" block variant="primary">
                        + {{ formatCurrency(movement.price - price) }}
                    </Button>
                </template>
                <RateModal v-if="data" :movement="data" />
            </Modal>
        </template>
    </MovementCard>
</template>
