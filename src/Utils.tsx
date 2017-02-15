

export const APIRoot = "http://localhost:57092/";
export const APIs = {
    login: APIRoot + "login",
    regsiter: APIRoot + "register",
    articles: APIRoot + "articles",
    article: APIRoot + "articles/",
    tags: APIRoot + "tags",
    categories: APIRoot+ "categories",
    comments: APIRoot+"comments",
    upload: APIRoot+"upload",
    rate: APIRoot+"rating/",
};

export const JSONRequestInit = (payload)=>({
    method: "POST",
    mode: "cors",
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

export const errorMessage = {
    Network: "Network Error. :(" ,
    Others: "Something bad happened :("
}

export const registerTerms = `
Not so serious & just for fun. XD

But here is something to notice.
1. Your password will be **encrypted** and stored on my server. So your password will be secured without anyone being able to decrypt it.
2. All data transfers in this website are all through **HTTPS connection**, which is currently believed the most secured and uncrackable.
3. This account is used and only used while commenting and rating. I don't think there is much to do for a simple personal blog.
4. I promise that I will **never** leak account info intentionally (But I can't guarantee it since catastrophic accidents may happen).
5. Server and database may change **frequently** and **without advance notification**. Your account info may be lost at any time.

That is all.
`
export const padding = { padding: "8px 8px 8px 8px" };

export const twoColStyleLeft = {lg:{ span: 6, order: 1 },md:{ span: 6, order: 1 },sm:{ span: 24, order: 2 }, xs:{ span: 24, order: 2 } }
export const twoColStyleRight = {lg:{ span: 18, order: 2 },md:{ span: 18, order: 2 },sm:{ span: 24, order: 1 }, xs:{ span: 24, order: 1 } }