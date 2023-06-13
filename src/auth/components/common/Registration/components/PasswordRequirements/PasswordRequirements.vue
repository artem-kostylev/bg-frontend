<script setup lang="ts">
import { ref } from 'vue';
import { Button, CollapseTransition } from '@ui/components';
import { SmallArrowIcon } from '@ui/icons';

const show = ref(false);

const toggle = () => {
    show.value = !show.value;
};
</script>

<template>
    <div>
        <Button
            variant="ghost"
            @click="toggle"
            :end-icon="SmallArrowIcon"
            :icon-class="show ? 'w-3 transform rotate-180' : 'w-3'"
            >Требования к паролю</Button
        >
        <CollapseTransition :show="show">
            <div class="mt-5 leading-5">
                Не менее 8 символов, содержит строчные и заглавные буквы, числа, спец.символы (%^&)
            </div>
        </CollapseTransition>
    </div>
</template>
