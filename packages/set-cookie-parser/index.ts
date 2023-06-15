const toName = (str: string) => {
    const value = str.toLowerCase();

    switch (value) {
        case 'httponly':
            return 'httpOnly';
        case 'samesite':
            return 'sameSite';
        case 'max-age':
            return 'maxAge';
        default:
            return value;
    }
};

const toValue = (str?: string) => (!str ? true : +str * 0 === 0 ? +str : str);

export const parse = (str: string) => {
    return str.split('; ').reduce(
        (
            a: {
                name: string;
                value: string;
                serializeOptions?: Record<string, string | number | boolean | Date>;
            },
            b: string,
            index: number
        ) => {
            const [name, value] = b.split('=');

            if (index === 0) {
                a.name = name;
                a.value = value;
            } else {
                !a.serializeOptions && (a.serializeOptions = {});

                const formattedName: string = toName(name);
                const formattedValue: string | number | boolean | Date = toValue(value);

                a.serializeOptions[formattedName] =
                    formattedName === 'expires' ? new Date(value) : formattedValue;
            }

            return a;
        },
        {} as {
            name: string;
            value: string;
            serializeOptions?: Record<string, string | number | boolean | Date>;
        }
    );
};
