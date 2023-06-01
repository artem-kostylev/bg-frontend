import type { Dayjs } from 'dayjs';

export type CalendarProps = {
    modelValue: string | string[];
    valueFormat?: string;
    range?: boolean;
    dateDisabled?: (date: Dayjs) => boolean;
};

export const defaultCalendarProps = {
    valueFormat: 'YYYY-MM-DD',
    modelValue: '',
};
