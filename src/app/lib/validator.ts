import {
    required as vRequired,
    email as vEmail,
    helpers,
    or,
    and,
    numeric,
    minLength,
    maxLength,
} from '@vuelidate/validators';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const required = helpers.withMessage('Поле обязательно для заполнения', vRequired);

export const email = helpers.withMessage('Введите корректный email', vEmail);

export const isValidDate = helpers.withMessage('Введите корректную дату', (value: string) => {
    if (value.length < 10) return false;
    return dayjs(value, 'DD.MM.YYYY', true).isValid();
});

export const birthday = helpers.withMessage(
    'Дата не может быть больше текущей',
    (value: string) => {
        return dayjs().isSameOrAfter(dayjs(value, 'DD.MM.YYYY', true));
    }
);

export const documentTill = helpers.withMessage('Неверный срок действия', (value: string) => {
    return dayjs().isSameOrBefore(dayjs(value, 'DD.MM.YYYY', true));
});

export const cyrillicReg = helpers.regex(/^[а-яА-ЯёЁ]+$/);

export const latinReg = helpers.regex(/^[a-zA-Z]+$/);

export const latinText = helpers.withMessage('Заполнение возможно только на латинице', latinReg);

export const cyrillicText = helpers.withMessage(
    'Заполнение возможно только на кириллице',
    cyrillicReg
);

export const phoneNumber = helpers.regex(/(\+7)[\s(]*\d{3}[)\s]*\d{3}[\s]?\d{2}[\s]?\d{2}/);

export const emailOrNumber = helpers.withMessage(
    'Введите корректный e-mail или номер телефона',
    or(vEmail, phoneNumber)
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

export const commentLength = helpers.withMessage(
    'Длина комментария не может быть больше чем 2000 символов',
    maxLength(2000)
);
