import { phoneMask } from '@/app/lib/helpers';

export const useMaskOptions = () => {
    const options = {
        mask: (value: string) => {
            const unmasked = Number(value.replace(/[\s+)()-]/g, ''));

            if (phoneMask.completed(value)) return null;

            if ((Number(value.charAt(0)) || value.charAt(0) === '+') && !isNaN(unmasked)) {
                return '+7 (###) ### ## ##';
            } else return null;
        },
        postProcess: (value: string) => {
            const unmasked = Number(value.replace(/[\s+)()-]/g, ''));

            if (
                (Number(value.charAt(0)) || value.charAt(0) === '+') &&
                !isNaN(unmasked) &&
                value.length < 19
            ) {
                return value;
            } else {
                let result = value;

                if (value.includes('@') || isNaN(Number(value))) {
                    result = result.replace(/[\s)()]/g, '');

                    if (value.charAt(0) === '+') {
                        result = result.substring(1);
                    }
                }

                return result;
            }
        },
    };

    return { options };
};
