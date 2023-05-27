<script setup lang="ts">
import type { HotelContacts } from '@/tours/types';

type Props = {
    contacts?: HotelContacts[];
};

defineProps<Props>();
</script>

<template>
    <div v-if="contacts" class="space-y-1.5">
        <div v-for="(contact, index) in contacts" :key="index">
            <span class="font-semibold">{{ contact.name }} </span>: {{ contact.values.join(', ') }}
        </div>
    </div>
</template>
