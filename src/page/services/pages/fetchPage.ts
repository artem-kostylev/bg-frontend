import type { Meta } from "@/app/types";
import { http } from "@/app/lib";
import type { Page } from "@/page/types";

export type FetchPageResponse = {
    meta: Meta;
    data: Page;
};

export const fetchPage = (slug: string) => {
    return http<FetchPageResponse>(`page/${slug}`);
};
