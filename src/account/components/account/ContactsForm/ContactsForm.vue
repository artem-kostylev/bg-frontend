<script setup lang="ts">
import { useNuxtData } from '#imports';
import type { Profile } from '@/account/types';
import { Input, Typography, Tooltip } from '@ui/components';
import { vMaska } from 'maska';
import { CheckIcon, QuestionIcon } from '@ui/icons';

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
            >
                <template #end-icon>
                    <Tooltip v-if="data.phone_verified_at" text="Мобильный телефон подтвержден">
                        <template #trigger="{ vbind }">
                            <span v-bind="vbind" class="p-1 bg-success-600 text-white rounded-full">
                                <CheckIcon width="0.7em" height="0.7em" />
                            </span>
                        </template>
                    </Tooltip>
                    <Tooltip v-else text="Подтвердите мобильный телефон">
                        <template #trigger="{ vbind }">
                            <span v-bind="vbind" class="p-1 bg-secondary-200 rounded-full">
                                <QuestionIcon width="0.7em" height="0.7em" />
                            </span>
                        </template>
                    </Tooltip>
                </template>
            </Input>
        </div>
        <div class="w-full md:w-1/4">
            <Input
                v-model="data.email"
                label="Электронная почта"
                :readonly="!!data.email"
                :success="!!data.email"
            >
                <template #end-icon>
                    <Tooltip v-if="data.email_verified_at" text="Электронная почта подтверждена">
                        <template #trigger="{ vbind }">
                            <span v-bind="vbind" class="p-1 bg-success-600 text-white rounded-full">
                                <CheckIcon width="0.7em" height="0.7em" />
                            </span>
                        </template>
                    </Tooltip>
                    <Tooltip v-else text="Подтвердите электронную почту">
                        <template #trigger="{ vbind }">
                            <span v-bind="vbind" class="p-1 bg-secondary-200 rounded-full">
                                <QuestionIcon width="0.7em" height="0.7em" />
                            </span>
                        </template>
                    </Tooltip>
                </template>
            </Input>
        </div>
    </div>
</template>
