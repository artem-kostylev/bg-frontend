<script setup lang="ts">
import { Radio } from '@ui/components';
import { useVModel } from '@vueuse/core';

type Props = {
    modelValue: 'url' | 'qr';
};

const props = defineProps<Props>();

const emit = defineEmits<{ (e: 'update:modelValue', value: 'url' | 'qr'): void }>();
const method = useVModel(props, 'modelValue', emit);
</script>

<template>
    <div>
        <div class="text-xl lg:text-2xl">Cпособ оплаты</div>
        <div class="flex flex-col space-y-2.5 mt-6">
            <Radio v-model="method" value="url">Банковской картой</Radio>
            <Radio v-model="method" value="qr">По QR-коду</Radio>
        </div>
    </div>
</template>
