export const typographyVariants = {
    h1: 'text-2xl md:text-3xl font-semibold tracking-tight',
    h2: 'text-2xl font-semibold tracking-tight',
    h3: 'text-xl font-semibold tracking-tight',
    h4: 'text-lg font-semibold tracking-tight',
    h5: 'font-semibold',
    secondary: 'text-secondary-500',
    description: 'text-secondary-500 text-sm',
};

export const typographyDefaultProps = {
    as: 'div',
    variant: undefined,
} as const;

export type TypographyProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
    variant?: keyof typeof typographyVariants;
};
