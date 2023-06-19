import type { PopoverProps } from '@ui/components/Popover/popover';
import type { MenuProps } from '@ui/components/Menu/menu';

export type DropdownProps = Omit<PopoverProps, 'modelValue'> & Pick<MenuProps, 'options'>;
