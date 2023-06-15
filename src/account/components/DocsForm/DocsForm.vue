<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
import { Button, Input, Select, Alert } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import { required, isValidDate, birthday, latinText, cyrillicText } from '@/app/lib/validators';
import { useLazyAsyncData } from '#imports';
import { addDocument, editUserDoc, getDocumentsTypes, getNationalities } from '@/account/services';
import type { NewDocument, Document, UpperCaseKeys } from '@/account/types';
import { textTransform } from '@/app/lib/helpers';
import { vMaska } from 'maska';

type Props = {
    form: NewDocument | Document;
    type: 'edit' | 'add';
    id?: number;
    index?: number;
};

const props = defineProps<Props>();

const upperCaseKeys: (keyof UpperCaseKeys)[] = ['first_name', 'last_name', 'second_name'];

// transform some fields to upper case
upperCaseKeys.forEach(key => {
    watch(
        () => props.form[key],
        () => {
            if (props.form && props.form[key]) {
                emit('update-data', {
                    index: props.index,
                    key,
                    value: textTransform(props.form[key] as string),
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
    if (!props.form.nationality_id || !docsType.value) return [];

    return docsType?.value?.filter(
        (item: { nationality_id: number }) => item.nationality_id === props.form.nationality_id
    );
});

const selectedDoc = computed(() => {
    if (!documents.value.length) return;
    return documents.value?.find((doc: any) => doc.id === props.form.document_type_id);
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
}));

const sexItems = [
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
];

let v$ = useVuelidate(rules, props.form);

watch(selectedDoc, (newDoc, prevDoc) => {
    if (newDoc?.is_cyrillic === prevDoc?.is_cyrillic) return;

    v$ = useVuelidate(rules, props.form);

    v$.value.$reset();

    nextTick(() => {
        v$.value.first_name.$model && v$.value.first_name.$validate();
        v$.value.last_name.$model && v$.value.last_name.$validate();
    });
});

const nationalities = computed(() => {
    return data.value ? data.value : [];
});

const docMask = computed(() => {
    if (!v$.value.document_type_id.$model || !documents.value?.length) return '#### ######';

    const template = documents.value.find(
        doc => doc.id === v$.value.document_type_id.$model
    )?.template;

    if (template?.length) {
        return template[0];
    } else {
        return '#### ######';
    }
});

const options = reactive({
    mask: docMask,
});

const sending = ref(false);
const error = ref<string | null>(null);

const convertToDate = (date: string) => {
    const d = date.split('.');
    return d[2] + '-' + d[1] + '-' + d[0];
};

const submit = async () => {
    if (!(await v$.value.$validate())) return;

    try {
        sending.value = true;

        const result = { ...props.form };

        result.birthday = convertToDate(result.birthday);
        result.document_till = convertToDate(result.document_till);

        if (props.type === 'add') {
            await addDocument(result);
        }

        if (props.type === 'edit') {
            await editUserDoc(Number(props.id), result);
        }

        emit('success');
        error.value = null;
    } catch (err: any) {
        error.value = 'Ошибка. Проверьте корректность введенных данных';
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
                    :hint="v$.last_name.$errors[0]?.$message"
                    :status="v$.last_name.$errors[0] && 'error'"
                />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 px-2.5 mb-5">
                <Input
                    v-model="v$.first_name.$model"
                    required
                    name="firstname"
                    label="Имя"
                    :hint="v$.first_name.$errors[0]?.$message"
                    :status="v$.first_name.$errors[0] && 'error'"
                />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 px-2.5 mb-5">
                <Input
                    v-model="v$.second_name.$model"
                    required
                    name="secondname"
                    label="Отчество"
                    :hint="v$.second_name.$errors[0]?.$message"
                    :status="v$.second_name.$errors[0] && 'error'"
                />
            </div>
            <div class="flex flex-wrap w-full px-2.5 mb-5">
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-5 sm:mr-5 md:mr-5 lg:mr-5">
                    <Input
                        v-model="v$.birthday.$model"
                        required
                        name="birthday"
                        label="Дата рождения"
                        placeholder="дд.мм.гггг"
                        :hint="v$.birthday.$errors[0]?.$message"
                        :status="v$.birthday.$errors[0] && 'error'"
                        v-maska
                        :data-maska="'##.##.####'"
                    />
                </div>
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <RadioButtonGroup label="Пол" v-model="v$.sex.$model" :items="sexItems" />
                </div>
            </div>
            <div class="w-full md:w-1/2 px-2.5 mb-5">
                <Select
                    v-model="v$.nationality_id.$model"
                    required
                    label="Гражданство"
                    :items="nationalities"
                    label-key="nationality_name"
                    value-key="nationality_id"
                />
            </div>
            <div class="w-full md:w-1/2 px-2.5 mb-5">
                <Select
                    v-model="v$.document_type_id.$model"
                    required
                    label="Документ"
                    :disabled="!v$.nationality_id.$model"
                    :items="documents"
                    value-key="id"
                    label-key="name"
                />
            </div>
            <div class="w-full sm:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.document_number.$model"
                    required
                    name="seriesAndNumber"
                    label="Серия и номер
                документа"
                    :hint="v$.document_number.$errors[0]?.$message"
                    :status="v$.document_number.$errors[0] && 'error'"
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
                    :hint="v$.document_till.$errors[0]?.$message"
                    :status="v$.document_till.$errors[0] && 'error'"
                    v-maska
                    :data-maska="'##.##.####'"
                />
            </div>
        </div>
        <div class="flex flex-col items-start space-y-2.5">
            <Button :disabled="v$.$invalid" variant="primary" @click="submit"> Сохранить </Button>
        </div>
    </div>
</template>
