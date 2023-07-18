<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
import { Button, Input, Select, Alert, RadioButtonGroup } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import {
    required,
    isValidDate,
    birthday,
    latinText,
    cyrillicText,
    phoneNumber,
    email,
    textTransform,
} from '@/app/lib';
import { useLazyAsyncData } from '#imports';
import { addDocument, editUserDoc, getDocumentsTypes, getNationalities } from '@/account/services';
import type { NewDocument, Document, UpperCaseKeys } from '@/account/types';
import { vMaska } from 'maska';

type Props = {
    form: NewDocument | Document;
    type: 'edit' | 'add';
    id?: number;
    index?: number;
};

const props = defineProps<Props>();

const newForm = ref({ ...props.form });

const upperCaseKeys: (keyof UpperCaseKeys)[] = ['first_name', 'last_name', 'second_name'];

// transform some fields to upper case
upperCaseKeys.forEach(key => {
    watch(
        () => newForm.value[key],
        () => {
            if (newForm.value && newForm.value[key]) {
                emit('update-data', {
                    index: props.index,
                    key,
                    value: textTransform(newForm.value[key] as string),
                });
            }
        }
    );
});

const emit = defineEmits<{
    (e: 'success'): void;
    (e: 'clear-form'): void;
    (
        e: 'update-data',
        newData: {
            index?: number;
            key: keyof UpperCaseKeys;
            value: string;
        }
    ): void;
}>();

const { data } = useLazyAsyncData('nationalities', () => getNationalities(), {
    server: false,
});

const { data: docsType } = useLazyAsyncData('documents', () => getDocumentsTypes(), {
    server: false,
});

const documents = computed(() => {
    if (!newForm.value.nationality_id || !docsType.value) return [];

    return docsType?.value?.filter(
        (item: { nationality_id: number }) => item.nationality_id === newForm.value.nationality_id
    );
});

const documentsOptions = computed(() => {
    return documents.value.map((document: { name: string; id: number }) => {
        return {
            label: document.name,
            value: document.id,
        };
    });
});

const selectedDoc = computed(() => {
    if (!documents.value.length) return;
    return documents.value?.find(
        (doc: { id: number }) => doc.id === newForm.value.document_type_id
    );
});

const rules = computed(() => ({
    last_name: {
        required,
        inputType: selectedDoc.value
            ? selectedDoc.value.is_cyrillic
                ? cyrillicText
                : latinText
            : '',
    },
    first_name: {
        required,
        inputType: selectedDoc.value
            ? selectedDoc.value.is_cyrillic
                ? cyrillicText
                : latinText
            : '',
    },
    second_name: {
        required,
        inputType: selectedDoc.value
            ? selectedDoc.value.is_cyrillic
                ? cyrillicText
                : latinText
            : '',
    },
    birthday: {
        required,
        isValidDate,
        birthday,
    },
    sex: {},
    nationality_id: { required },
    document_type_id: { required },
    document_number: { required },
    document_till: { required, isValidDate },
    phone: { required, phoneNumber },
    email: { required, email },
}));

const sexItems = [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
];

let v$ = useVuelidate(rules, newForm.value);

watch(selectedDoc, (newDoc, prevDoc) => {
    if (newDoc?.is_cyrillic === prevDoc?.is_cyrillic) return;

    v$ = useVuelidate(rules, newForm.value);

    v$.value.$reset();

    nextTick(() => {
        v$.value.first_name.$model && v$.value.first_name.$validate();
        v$.value.last_name.$model && v$.value.last_name.$validate();
    });
});

const nationalities = computed(() => {
    return data.value
        ? data.value.map(nationality => {
              return {
                  label: nationality.nationality_name,
                  value: nationality.nationality_id,
              };
          })
        : [];
});

const docMask = computed(() => {
    if (!v$.value.document_type_id.$model || !documents.value?.length) return '#### ######';

    const template = documents.value.find(
        (doc: { id: number }) => doc.id === v$.value.document_type_id.$model
    )?.template;

    if (template?.length) {
        // проверяем есть ли пробел в template и добавляем если нет, чтобы могли разделить серию и номер
        return template[0].includes(' ') ? template[0] : template[0].replace('#', ' #');
    } else {
        return '#### ######';
    }
});

const options = reactive({
    mask: docMask,
});

const sending = ref(false);
const error = ref<string | null>(null);

// const convertToDate = (date: string) => {
//     const d = date.split('.');
//     return d[2] + '-' + d[1] + '-' + d[0];
// };

const submit = async () => {
    if (!(await v$.value.$validate())) return;

    try {
        sending.value = true;

        const result = { ...newForm.value };

        // result.birthday = convertToDate(result.birthday);
        // result.document_till = convertToDate(result.document_till);
        result.document_series = result.document_number.split(' ')[0];
        result.document_number = result.document_number.split(' ')[1];

        if (props.type === 'add') {
            await addDocument(result);
        }

        if (props.type === 'edit') {
            await editUserDoc(Number(props.id), result);
        }

        emit('success');
        error.value = null;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        error.value = 'Ошибка. Проверьте корректность введенных данных';
        // eslint-disable-next-line
        console.log('Error ', err.data.message);
    } finally {
        sending.value = false;
    }
};

onBeforeUnmount(() => {
    emit('clear-form');
});
</script>

<template>
    <div>
        <Alert v-if="error" type="error" :text="error" class="mb-8" />
        <div class="flex flex-wrap -mx-2.5">
            <div class="w-full sm:w-1/2 md:w-1/3 px-2.5 mb-5">
                <Input
                    v-model="v$.last_name.$model"
                    required
                    name="lastname"
                    label="Фамилия"
                    :error="v$.last_name.$errors[0]?.$message"
                />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 px-2.5 mb-5">
                <Input
                    v-model="v$.first_name.$model"
                    required
                    name="firstname"
                    label="Имя"
                    :error="v$.first_name.$errors[0]?.$message"
                />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 px-2.5 mb-5">
                <Input
                    v-model="v$.second_name.$model"
                    required
                    name="secondname"
                    label="Отчество"
                    :error="v$.second_name.$errors[0]?.$message"
                />
            </div>
            <div class="flex flex-wrap w-full px-2.5 mb-5">
                <div class="w-full sm:w-1/2 md:w-1/3 mb-5 sm:mr-5 md:mr-5 lg:mr-5">
                    <Input
                        label="Дата рождения"
                        required
                        v-model="v$.birthday.$model"
                        :error="v$.birthday.$errors[0]?.$message"
                        v-maska
                        :data-maska="'##.##.####'"
                    />
                </div>
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <RadioButtonGroup label="Пол" v-model="v$.sex.$model" :options="sexItems" />
                </div>
            </div>
            <div class="w-full md:w-1/2 px-2.5 mb-5">
                <Select
                    v-if="nationalities"
                    required
                    label="Гражданство"
                    v-model="v$.nationality_id.$model"
                    :options="nationalities"
                    :error="v$.nationality_id.$errors[0]?.$message"
                    block
                    :strong="false"
                />
            </div>
            <div class="w-full md:w-1/2 px-2.5 mb-5">
                <Select
                    v-if="documentsOptions"
                    v-model="v$.document_type_id.$model"
                    required
                    label="Документ"
                    :disabled="!v$.nationality_id.$model"
                    :options="documentsOptions"
                    :error="v$.document_type_id.$errors[0]?.$message"
                    block
                />
            </div>
            <div class="w-full sm:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.document_number.$model"
                    required
                    name="seriesAndNumber"
                    label="Серия и номер
                документа"
                    :error="v$.document_number.$errors[0]?.$message"
                    v-maska:[options]
                />
            </div>
            <div class="w-full sm:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.document_till.$model"
                    required
                    name="validity"
                    label="Срок действия"
                    placeholder="дд.мм.гггг"
                    :error="v$.document_till.$errors[0]?.$message"
                    v-maska
                    :data-maska="'##.##.####'"
                />
            </div>
            <div class="w-full sm:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.phone.$model"
                    required
                    name="phone"
                    label="Мобильный телефон"
                    :error="v$.phone.$errors[0]?.$message"
                    v-maska
                    :data-maska="'+7 (###) ### ## ##'"
                />
            </div>
            <div class="w-full sm:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.email.$model"
                    required
                    name="email"
                    label="E-mail"
                    :error="v$.email.$errors[0]?.$message"
                />
            </div>
        </div>
        <div class="flex flex-col items-start space-y-2.5">
            <Button :disabled="v$.$invalid" variant="primary" @click="submit"> Сохранить </Button>
        </div>
    </div>
</template>
