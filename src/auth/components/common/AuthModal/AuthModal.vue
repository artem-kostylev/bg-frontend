<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@ui/components';
import type { AuthenticationLabel } from '@/auth/types';
import { AuthForm } from '@/auth/components';

const show = ref(false);

const currTitle = ref<AuthenticationLabel>('Вход');
</script>

<template>
    <div>
        <Modal v-model="show" size="sm" :title="currTitle">
            <template>
                <AuthForm />
            </template>
        </Modal>
    </div>
</template>
