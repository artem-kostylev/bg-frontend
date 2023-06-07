export const spinColors = {
    white: 'text-white',
    current: 'text-current',
    primary: 'text-primary-500',
};

export const spinDefaultProps = {
    width: '2.5em',
    height: '2.5em',
    color: 'current',
} as const;

export type SpinProps = {
    width?: string;
    height?: string;
    color?: keyof typeof spinColors;
};
