import { parse, stringify, type defaultDecoder } from "qs";
import type { LocationQueryRaw } from "vue-router";

const toValue = (mix: string) => {
    if (!mix) return "";

    const str = decodeURIComponent(mix);

    if (str === "false") return false;
    if (str === "true") return true;

    return +str * 0 === 0 ? +str : str;
};

const decoder = (
    str: string,
    defaultDecoder: defaultDecoder,
    charset: string,
    type: "key" | "value"
) => (type === "value" ? toValue(str) : str);

export const parseQuery = (search: string) => parse(search, { decoder, ignoreQueryPrefix: true });
export const stringifyQuery = (value: LocationQueryRaw) => stringify(value, { encode: false });
