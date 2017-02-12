

export const APIRoot = "http://localhost:57092/";
export const APIs = {
    login: APIRoot + "login",
    regsiter: APIRoot + "register",
    articles: APIRoot + "articles",
    article: APIRoot + "articles/",
    tags: APIRoot + "tags",
    categories: APIRoot+ "categories",
    comments: APIRoot+"comments"
};

export const JSONRequestInit = (payload)=>({
    method: "POST",
    //mode: "cors",
    body: JSON.stringify(payload),
    headers:{
        "Content-Type":"application/json"
    }
} as RequestInit);

export const ArticleListUpdateMinutesSpan = 30;

export const attachQueryString = (url: string, params: Object): string => {
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return url+"?"+query;
}