<script setup lang="ts">
import { useNuxtData } from '#imports';
import type { Profile } from '@/account/types';
import { Input, Button, Typography, Tooltip } from '@ui/components';
import { vMaska } from 'maska';
import { CheckIcon } from '@ui/icons';

const { data } = useNuxtData<Profile>('account-profile');
</script>

<template>
    <div class="flex flex-col space-y-5" v-if="data">
        <Typography variant="h2" as="h2">Контакты</Typography>
        <div class="w-full md:w-1/4">
            <Input
                v-model="data.phone"
                label="Мобильный телефон"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
            />
        </div>
        <div class="w-full md:w-1/4">
            <Input
                v-model="data.email"
                label="Электронная почта"
                :readonly="!!data.email"
                :success="!!data.email"
            >
                <template v-if="data.email_verified_at" #end-icon>
                    <Tooltip text="Электронная почта подтверждена">
                        <template #trigger="{ vbind }">
                            <button
                                v-bind="vbind"
                                class="p-1 bg-success-600 text-white rounded-full"
                            >
                                <CheckIcon width="0.7em" height="0.7em" />
                            </button>
                        </template>
                    </Tooltip>
                </template>
            </Input>
        </div>
        <div>
            <Button variant="primary">Сохранить</Button>
        </div>
    </div>
</template>
