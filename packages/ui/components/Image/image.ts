export type ImageProps = {
    src?: string;
    width?: string;
    height?: string;
    alt?: string;
};

export const imageDefaultProps = {
    alt: '',
    src: '',
    width: '',
    height: '',
} as const;
