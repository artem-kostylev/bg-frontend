import { required as vRequired, email as vEmail, helpers } from '@vuelidate/validators';
import dayjs from 'dayjs';

export const required = helpers.withMessage('Поле обязательно для заполнения', vRequired);

export const email = helpers.withMessage('Введите корректный email', vEmail);

export const isValidDate = helpers.withMessage('Введите корректную дату', (value: string) => {
    if (value.length < 10) return false;
    return dayjs(value, 'dd.MM.yyyy').isValid();
});

export const birthday = helpers.withMessage(
    'Дата не может быть больше текущей',
    (value: string) => {
        return dayjs(value, 'dd.MM.yyyy') <= dayjs(Date(), 'dd.MM.yyyy');
    }
);

export const documentTill = helpers.withMessage('Неверный срок действия', (value: string) => {
    return dayjs(value, 'dd.MM.yyyy') >= dayjs(Date(), 'dd.MM.yyyy');
});

export const cyrillicReg = helpers.regex(/^[а-яА-ЯёЁ]+$/);

export const latinReg = helpers.regex(/^[a-zA-Z]+$/);

export const latinText = helpers.withMessage('Заполнение возможно только на латинице', latinReg);

export const cyrillicText = helpers.withMessage(
    'Заполнение возможно только на кириллице',
    cyrillicReg
);
