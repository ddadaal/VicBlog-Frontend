
declare var APIROOTURL: string;

export const pathCombine = (...paths: string[]) => paths.join('/');

export const APIRoot = APIROOTURL;

export const APIs = {
    login: `${APIROOTURL}/login`,
    regsiter: `${APIROOTURL}/register`,
    articles: `${APIROOTURL}/articles`,
    tags: `${APIROOTURL}/tags`,
    categories: `${APIROOTURL}/categories`,
    comments: `${APIROOTURL}/comments`,
    upload: `${APIROOTURL}/upload`,
    rate: `${APIROOTURL}/rate`,
    filteredList: `${APIROOTURL}/articles/filter`,
    termsAndConditions: `${APIROOTURL}/info/TermsAndConditions.md`,
    about: {
        project: `${APIROOTURL}/info/project.md`,
        me: `${APIROOTURL}/info/me.md`,
        tech: `${APIROOTURL}/info/tech.md`,
    },
    backendVersion: `${APIROOTURL}/info/version.json`,
    pv: `${APIROOTURL}/pv`,
};

export const JSONRequestInit = (payload, headers?, method?: string, ) => ({
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers: {
        ...headers,
        "Content-Type": "application/json"
    }
});

export const ArticleListUpdateMinutesSpan = 30;
export const PVFetchSecondsSpan = 5 * 60;
export const ArticleFetchMinutesSpan = 30;
export const CommentFetchMinutesSpan = 30;

export const attachQueryString = (url: string, params: Object): string => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return url + "?" + query;
}

export const errorMessage = {
    Network: "Network Error. :(",
    Others: "Something bad happened :("
}

export const padding = { padding: "8px 8px 8px 8px" };

export const twoColStyleLeft = { lg: { span: 6, order: 1 }, md: { span: 6, order: 1 }, sm: { span: 24, order: 2 }, xs: { span: 24, order: 2 } }
export const twoColStyleRight = { lg: { span: 18, order: 2 }, md: { span: 18, order: 2 }, sm: { span: 24, order: 1 }, xs: { span: 24, order: 1 } }

export const simpleFormValidator = (values: Object): Array<string> => {
    const emptyKeys = Object.keys(values).filter(key => (!values[key] || (Array.isArray(values[key]) && values[key].length == 0)));
    return emptyKeys.length == 0 ? undefined : emptyKeys;
}