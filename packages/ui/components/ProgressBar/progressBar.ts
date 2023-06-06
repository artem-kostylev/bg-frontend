export const progressBarColors = {
    primary: 'bg-primary-500',
    danger: 'bg-danger-500',
};

export type ProgressBarProps = {
    percentage?: number;
    color?: keyof typeof progressBarColors;
};

export const defaultProgressBarProps = {
    percentage: 0,
    color: 'primary',
} as const;
