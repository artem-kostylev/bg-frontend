<script setup lang="ts">
import { provide, ref } from 'vue';

const types = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    danger: 'bg-red-100 text-red-800 border border-red-200',
};

type Type = keyof typeof types;

type Message = {
    id: number;
    type: Type;
    text: string;
    fn: NodeJS.Timeout;
};

const messages = ref<Message[]>([]);

const remove = (id: number) => {
    const index = messages.value.findIndex(m => m.id === id);

    clearTimeout(messages.value[index].fn);

    messages.value.splice(index, 1);
};

const add = (type: Type, text: string, options = { duration: 5000 }) => {
    const id = messages.value.length + 1;

    const fn = setTimeout(() => remove(id), options.duration);

    return messages.value.push({ id, type, text, fn });
};

const success = add.bind(null, 'success');
const danger = add.bind(null, 'danger');

provide('messages', { success, danger });
</script>

<template>
    <Teleport to="body">
        <TransitionGroup
            name="fade"
            tag="div"
            class="fixed top-0 left-0 right-0 p-5 space-y-2 pointer-events-none flex flex-col items-center justify-center z-100"
            enter-active-class="transiton-transform duration-500"
            leave-active-class="transiton-transform duration-500"
            enter-from-class="opacity-0 -translate-y-20"
            leave-to-class="opacity-0 -translate-y-20"
        >
            <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                    'inline-flex rounded-xl py-2 px-3.5 pointer-events-auto',
                    types[message.type],
                ]"
            >
                {{ message.text }}
            </div>
        </TransitionGroup>
    </Teleport>
</template>
