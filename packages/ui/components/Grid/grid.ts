export const gridColumns = {
    '4': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '2': 'grid-cols-1 md:grid-cols-2',
    '1': 'grid-cols-1',
};

export const gridGaps = {
    '4': 'gap-4',
    '5': 'gap-5',
    '6': 'gap-6',
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
