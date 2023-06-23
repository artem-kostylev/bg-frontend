<script setup lang="ts">
import { Modal, Input, Button } from '@ui/components';
import { AtSignIcon } from '@ui/icons';
</script>

<template>
    <Modal title="Измененить электронную почту" size="sm">
        <template #trigger="{ vbind }">
            <span v-bind="vbind">qwewq</span>
        </template>
        <div class="space-y-5">
            <div>Для изменения электронной почты мы вышлем код подтверждения на новый адрес</div>
            <Input :start-icon="AtSignIcon" placeholder="электронная почта" />
            <Button variant="primary" block>Выслать код</Button>
        </div>
    </Modal>
</template>
