<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { Card, Input, Button, RadioButtonGroup, Select } from '@ui/components';
import { XIcon } from '@ui/icons';
import type { Questionnary, QuestionnaryForm } from '@/booking/types';
import type { FetchAvailableDocumentsResponse } from '@/booking/services';
import {
    required,
    email,
    isValidDate,
    documentTill,
    birthday,
    cyrillicText,
    latinText,
} from '@/app/lib';
import { AutocompleteModal } from '../AutocompleteModal';
import { useAuthStore } from '@/auth/stores';
import { vMaska } from 'maska';

const { isAuthenticated } = storeToRefs(useAuthStore());

type Props = {
    questionnary: Questionnary;
    index: number;
    availableDocuments: FetchAvailableDocumentsResponse;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'success'): void;
    (e: 'clear-form', value: number): void;
}>();

const documents = computed(() => {
    if (!props.questionnary.availableDocuments) return;
    const nationality = props.questionnary.availableDocuments.find(
        item => item.nationality_id === props.questionnary.form.nationality_id
    );
    return nationality?.documents;
});

const documentsItems = computed(() => {
    if (!documents.value) return [{ label: '', value: '' }];
    return documents.value.map(document => {
        return {
            label: document.name,
            value: document.id,
        };
    });
});

const selectedDoc = computed(() => {
    return documents.value?.find(
        (doc: { id: number }) => doc.id === props.questionnary.form.document_type_id
    );
});

const rules = {
    first_name: {
        required,
        inputType: selectedDoc.value
            ? selectedDoc.value.is_cyrillic
                ? cyrillicText
                : latinText
            : '',
    },
    last_name: {
        required,
        inputType: selectedDoc.value
            ? selectedDoc.value.is_cyrillic
                ? cyrillicText
                : latinText
            : '',
    },
    birthday: { required, isValidDate, birthday },
    sex: { required },
    service_insurance_id: { required },
    nationality_id: { required },
    document_type_id: { required },
    document_number: { required },
    document_till: { required, isValidDate, documentTill },
    phone: { required },
    email: { required, email },
};

const sexItems = [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
];

const nationalityItems = computed(() => {
    return (
        props.questionnary.availableDocuments &&
        props.questionnary.availableDocuments.map(document => {
            return {
                label: document.nationality_name,
                value: document.nationality_id,
            };
        })
    );
});

const v$ = useVuelidate(rules, props.questionnary.form as QuestionnaryForm);

const clearForm = () => {
    emit('clear-form', props.index);

    nextTick(() => {
        v$.value.$reset();
    });
};

const submit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('success');
};
</script>

<template>
    <Card body-class="grid gap-5">
        <div class="flex justify-end" v-if="isAuthenticated">
            <AutocompleteModal />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Input
                label="Фамилия"
                required
                v-model="v$.first_name.$model"
                :error="v$.first_name.$errors[0]?.$message"
            />
            <Input
                label="Имя"
                required
                v-model="v$.last_name.$model"
                :error="v$.last_name.$errors[0]?.$message"
            />
            <Input
                label="Дата рождения"
                required
                v-model="v$.birthday.$model"
                :error="v$.birthday.$errors[0]?.$message"
                v-maska
                :data-maska="'##.##.####'"
            />
            <RadioButtonGroup required label="Пол" v-model="v$.sex.$model" :items="sexItems" />
            <Select
                v-if="props.availableDocuments && nationalityItems"
                required
                label="Гражданство"
                v-model="v$.nationality_id.$model"
                :options="nationalityItems"
                :error="v$.nationality_id.$errors[0]?.$message"
                class="w-full"
            />
            <Select
                v-if="props.availableDocuments"
                required
                label="Документ"
                v-model="v$.document_type_id.$model"
                :options="documentsItems"
                :disabled="!documents"
                :error="v$.document_type_id.$errors[0]?.$message"
                class="w-full"
            />
            <Input
                required
                label="Серия и номер документа"
                v-model="v$.document_number.$model"
                :error="v$.document_number.$errors[0]?.$message"
            />
            <Input
                required
                label="Срок действия"
                v-model="v$.document_till.$model"
                :error="v$.document_till.$errors[0]?.$message"
                v-maska
                :data-maska="'##.##.####'"
            />
            <Input
                required
                label="Мобильный телефон"
                v-model="v$.phone.$model"
                :error="v$.phone.$errors[0]?.$message"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
            />
            <Input
                required
                label="Электронная почта"
                v-model="v$.email.$model"
                :error="v$.email.$errors[0]?.$message"
            />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Input
                required
                label="Страховка"
                v-model="v$.service_insurance_id.$model"
                :error="v$.service_insurance_id.$errors[0]?.$message"
            />
        </div>
        <div>
            <button @click="clearForm">
                <div class="flex items-center whitespace-nowrap">
                    <XIcon width="1.2em" height="1.2em" class="text-danger-500" />
                    <span class="ml-2.5">Сбросить данные анкеты</span>
                </div>
            </button>
        </div>
        <div class="flex space-x-2.5">
            <Button variant="primary" @click="submit"> Перейти к следущей анкете </Button>
        </div>
    </Card>
</template>
