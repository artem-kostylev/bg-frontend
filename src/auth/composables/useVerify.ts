import { ref, type Ref } from 'vue';
import { fetchVerifySend } from '@/auth/services';
import type { LoginInfo, SubmitError } from '@/auth/types';

export function useVerify(loginInfo: LoginInfo, pending: Ref<boolean>, error: Ref<string | null>) {
    const showConfirmation = ref(false);
    const verifySent = ref(false);
    const verifySendError = ref(false);

    async function verify() {
        try {
            error.value = null;
            pending.value = true;
            showConfirmation.value = true;
            await fetchVerifySend(loginInfo);
            verifySent.value = true;
        } catch (e) {
            const err = e as SubmitError;

            if (err.status === 422) {
                error.value = err.data.message;
            } else {
                error.value = 'Неизвестная ошибка';
            }

            verifySendError.value = true;
            showConfirmation.value = false;
        } finally {
            pending.value = false;
        }
    }

    return {
        showConfirmation,
        verifySent,
        verifySendError,
        verify,
    };
}
