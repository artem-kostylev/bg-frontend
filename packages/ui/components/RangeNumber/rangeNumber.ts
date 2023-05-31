export type RangeNumberModelValue = number | number[] | null;

export type RangeNumberProps = {
    modelValue: RangeNumberModelValue;
    start?: number;
    end?: number;
    range?: boolean;
    numberDisabled?: (num: number) => boolean;
    renderLabel?: (modelValue: RangeNumberModelValue) => string | number;
};

export const defaultRangeNumberProps = {
    start: 1,
    end: 28,
};
