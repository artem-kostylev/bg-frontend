<script setup lang="ts">
import type { TransportCompany } from "@/booking/types";
import { Typography, Avatar, Tooltip } from "@ui/components";
import { AirplaneIcon } from "@ui/icons";

type Props = {
    isVirtual?: boolean;
    transportCompany: TransportCompany[];
};

defineProps<Props>();
</script>

<template>
    <div v-if="isVirtual" class="flex items-center space-x-3">
        <div
            class="inline-flex items-center justify-center rounded-full border border-slate-300"
            style="width: 48px; height: 48px"
        >
            <AirplaneIcon />
        </div>
        <Typography variant="h3" as="h2">Рейс не конкретизирован</Typography>
    </div>
    <div v-else-if="transportCompany.length === 1" class="flex items-center space-x-3">
        <Avatar
            width="52px"
            height="52px"
            :src="transportCompany[0].key"
            :initials="transportCompany[0].name"
            class="border-2 border-white"
        />
        <Typography variant="h3" as="h2">
            {{ transportCompany[0].name }}
        </Typography>
    </div>
    <div v-else class="flex items-center -space-x-4">
        <div v-for="(company, index) in transportCompany.slice(0, 3)" :key="index">
            <Tooltip :text="company.name">
                <template #trigger="{ vbind }">
                    <Avatar
                        v-bind="vbind"
                        width="52px"
                        height="52px"
                        :src="company.key"
                        :initials="company.name"
                        class="border-2 border-white"
                    />
                </template>
            </Tooltip>
        </div>
        <div
            v-if="transportCompany.length > 3"
            class="inline-flex items-center justify-center bg-slate-100 rounded-xl border-2 border-white"
            style="width: 52px; height: 52px"
        >
            <div class="text-slate-500 font-medium">+ 1</div>
        </div>
    </div>
</template>
