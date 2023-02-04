import { $fetch } from "ofetch";

const http = $fetch.create({
    baseURL: "https://api.bgagent3.bgit.ru/v1/",
    headers: {
        Accept: "application/json",
    },
});

export default http;
