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
            class="inline-flex items-center justify-center rounded-full ring-1 ring-slate-300"
            style="width: 47px; height: 47px"
        >
            <AirplaneIcon />
        </div>
        <Typography variant="h3" as="h2">Рейс не конкретизирован</Typography>
    </div>
    <div v-else-if="transportCompany.length === 1" class="flex items-center space-x-3">
        <Avatar
            width="47px"
            height="47px"
            :src="transportCompany[0].key"
            :initials="transportCompany[0].name"
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
                        width="47px"
                        height="47px"
                        :src="company.key"
                        :initials="company.name"
                        class="ring-2 ring-white"
                    />
                </template>
            </Tooltip>
        </div>
        <div
            v-if="transportCompany.length > 3"
            class="inline-flex items-center justify-center bg-slate-100 rounded-xl"
            style="width: 47px; height: 47px"
        >
            <div class="text-slate-500 font-medium">+ 1</div>
        </div>
    </div>
</template>
