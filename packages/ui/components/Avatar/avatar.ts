export const avatarDefaultProps = {
    src: '',
    width: '',
    height: '',
    initials: '',
    shape: 'square',
} as const;

export type AvatarProps = {
    src?: string;
    width?: string;
    height?: string;
    initials?: string;
    shape?: 'rounded' | 'square';
};
