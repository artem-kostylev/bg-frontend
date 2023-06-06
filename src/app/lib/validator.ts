import { required as vRequired, helpers, email, or } from '@vuelidate/validators';

export const required = helpers.withMessage('Поле обязательно для заполнения', vRequired);

export const phoneNumber = helpers.regex(/(\+7)[\s(]*\d{3}[)\s]*\d{3}[\s]?\d{2}[\s]?\d{2}/);

export const emailOrNumber = helpers.withMessage(
    'Введите корректный e-mail или номер телефона',
    or(email, phoneNumber)
);
