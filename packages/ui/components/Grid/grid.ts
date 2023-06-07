export const gridColumns = {
    '4': 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '2': 'md:grid-cols-2',
};

export const gridGaps = {
    '5': 'gap-5',
    '2.5': 'gap-2.5',
    '8': 'gap-8',
};

export const gridDefaultProps = {
    cols: undefined,
    gap: undefined,
} as const;

export type GridProps = {
    cols?: keyof typeof gridColumns;
    gap?: keyof typeof gridGaps;
};
