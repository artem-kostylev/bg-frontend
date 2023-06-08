export type AuthenticationForm = 'login' | 'registration' | 'reset' | 'auth';

export type AuthenticationLabel =
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
    data: LoginInfo;
};
