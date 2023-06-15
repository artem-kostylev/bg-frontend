export type AuthenticationForm = 'login' | 'registration' | 'reset' | 'auth';

export type AuthenticationTitle =
    | 'Пароль'
    | 'Регистрация'
    | 'Восстановление пароля'
    | 'Создание пароля'
    | 'Код подтверждения'
    | 'Подтверждение регистрации'
    | 'Вход';

export type LoginType = 'email' | 'phone';

export type LoginInfo = {
    loginType: LoginType | null;
    loginValue: string | null;
    isVerified: boolean;
};

export type NextAuthForm = {
    form: AuthenticationForm;
    data?: LoginInfo;
};

export type AuthFormProps = {
    error?: string | null;
    pending?: boolean;
    btnDisabled?: boolean;
};

export type RegisterForm = {
    first_name: string;
    last_name: string;
    second_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
};

export type ResetForm = {
    password: string;
    password_confirmation: string;
    email?: string;
    code?: string;
};
