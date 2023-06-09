import {
    required as vRequired,
    helpers,
    email as defaultEmail,
    or,
    and,
    numeric,
    minLength,
    maxLength,
} from '@vuelidate/validators';

export const required = helpers.withMessage('Поле обязательно для заполнения', vRequired);

export const phoneNumber = helpers.regex(/(\+7)[\s(]*\d{3}[)\s]*\d{3}[\s]?\d{2}[\s]?\d{2}/);

export const email = helpers.withMessage('Введите корректный email', defaultEmail);

export const emailOrNumber = helpers.withMessage(
    'Введите корректный e-mail или номер телефона',
    or(defaultEmail, phoneNumber)
);

export const confirmationCode = helpers.withMessage(
    'Введите корректный 4-х значный код подтверждения',
    and(numeric, minLength(4))
);

export const firstNameLength = helpers.withMessage(
    'Длина имени не может быть больше чем 100 символов',
    maxLength(100)
);

export const lastNameLength = helpers.withMessage(
    'Длина фамилии не может быть больше чем 100 символов',
    maxLength(100)
);

export const secondNameLength = helpers.withMessage(
    'Длина отчества не может быть больше чем 100 символов',
    maxLength(100)
);

export const maskedPhoneNumber = helpers.withMessage(
    'Номер телефона должен содержать не менее 11 символов',
    minLength(18)
);

export const minPassword = helpers.withMessage(
    'Пароль должен содержать не менее 8 символов',
    minLength(8)
);

export const digit = helpers.regex(/(?=.*[0-9])/);

export const minOneDigit = helpers.withMessage('Пароль должен содержать минимум одну цифру', digit);

export const cases = helpers.regex(/^(?=.*[A-ZА-ЯЁ])(?=.*[a-zа-яё])/);

export const upperAndLowerCase = helpers.withMessage(
    'Пароль должен содержать минимум одну заглавную и одну строчную букву',
    cases
);

export const specialSymbol = helpers.regex(/(?=.*[!@#$%^&*<>{}+])/);

export const minOneSpecialSymbol = helpers.withMessage(
    'Пароль должен содержать минимум один спецсимвол',
    specialSymbol
);
