export const defaultSliderProps = {
    step: 1,
    modelValue: undefined,
} as const;

export type SliderProps = {
    min: number;
    max: number;
    step?: number;
    range?: boolean;
    modelValue?: number | number[];
    disabled?: boolean;
};
