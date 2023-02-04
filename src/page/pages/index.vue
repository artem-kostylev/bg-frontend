<script setup lang="ts">
import { Button } from "@ui/components";
</script>

<template>
    <div>
        <div>Home page</div>
        <NuxtLink to="/tours">
            <Button>Get tours</Button>
        </NuxtLink>
        <NuxtLink to="/tours?from=260">
            <Button>Get tours with from</Button>
        </NuxtLink>
    </div>
</template>
