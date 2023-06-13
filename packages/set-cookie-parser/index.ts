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
    return str.split('; ').reduce((a: any, b: any, index) => {
        const [name, value] = b.split('=');

        if (index === 0) {
            a.name = name;
            a.value = value;
        } else {
            !a.serializeOptions && (a.serializeOptions = {});

            const formattedName = toName(name);
            const formmattedValue = toValue(value);

            a.serializeOptions[formattedName] = formattedName === 'expires' ? new Date(value) : formmattedValue;
        }

        return a;
    }, {});
};
