import { abortNavigation, defineNuxtRouteMiddleware } from "#imports";

export default defineNuxtRouteMiddleware(async () => {
    const isAuthenticated = false;

    if (!isAuthenticated) return abortNavigation();
});
