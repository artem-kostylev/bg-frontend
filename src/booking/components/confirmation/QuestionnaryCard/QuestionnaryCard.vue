<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { Card, Input, Button } from "@ui/components";
import type { Questionnary, QuestionnaryForm } from "@/booking/types";
import { required } from "@/app/lib";
import { AutocompleteModal } from "../AutocompleteModal";

type Props = {
    questionnary: Questionnary;
};

const props = defineProps<Props>();

const rules = {
    first_name: { required },
    last_name: { required },
    birthday: { required },
    sex: { required },
    service_insurance_id: { required },
};

const v$ = useVuelidate(rules, props.questionnary.form as QuestionnaryForm);

const submit = async () => {
    if (!(await v$.value.$validate())) return;
};
</script>

<template>
    <Card body-class="grid gap-5">
        <div class="flex justify-end">
            <AutocompleteModal />
        </div>
        <div class="grid grid-cols-4 gap-5">
            <Input
                placeholder="Фамилия"
                v-model="v$.first_name.$model"
                :error="v$.first_name.$errors[0]?.$message"
            />
            <Input
                placeholder="Имя"
                v-model="v$.last_name.$model"
                :error="v$.last_name.$errors[0]?.$message"
            />
            <Input
                placeholder="Дата рождения"
                v-model="v$.birthday.$model"
                :error="v$.birthday.$errors[0]?.$message"
            />
            <Input placeholder="Пол" v-model="v$.sex.$model" :error="v$.sex.$errors[0]?.$message" />
        </div>
        <div class="flex space-x-2.5">
            <Button variant="primary" @click="submit">Перейти к следущей анкете</Button>
        </div>
    </Card>
</template>
