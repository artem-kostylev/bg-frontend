<script setup lang="ts">
import { ref } from 'vue';
import { Radio } from '@ui/components';

const paymentType = ref<'url' | 'qr'>('url');
</script>

<template>
    <div>
        <div class="text-xl lg:text-2xl">Cпособ оплаты</div>
        <div class="flex flex-col space-y-2.5 mt-6">
            <Radio v-model="paymentType" value="url">Банковской картой</Radio>
            <Radio v-model="paymentType" value="qr">По QR-коду</Radio>
        </div>
    </div>
</template>
