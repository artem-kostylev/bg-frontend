import type { Component } from 'vue';

export type TabValue = string | number;

export type Tab = {
    label: string;
    value: TabValue;
    startIcon?: Component;
    endIcon?: Component;
    disabled?: boolean;
};

export type TabsProps = {
    tabs: Tab[];
    modelValue: TabValue;
};
