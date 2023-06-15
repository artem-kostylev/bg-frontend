import type { RegisterForm, ResetForm, LoginType } from '@/auth/types';

export type LoginExistError = {
    status: number;
    data: {
        message: string;
        loginType: LoginType;
    };
};

export type ConfirmError = {
    status: number;
    data: {
        errors: {
            code: string[];
        };
    };
};

export type SubmitError = {
    status: number;
    data: {
        message: string;
    };
};

export type RegisterError = {
    status: number;
    data: {
        errors: RegisterErrors;
    };
};

export type RegisterErrors = {
    [k in keyof RegisterForm]?: string[];
};

export type ResetErrors = {
    [k in keyof ResetForm]?: string[];
};

export type ResetError = {
    status: number;
    data: {
        errors: ResetErrors;
    };
};
