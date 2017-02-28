
declare var APIROOTURL: string;

export const pathCombine = (...paths: string[])=>{
    return paths.join('/');
}

export const APIRoot = APIROOTURL;
export const APIs = {
    login: pathCombine(APIRoot,"login"),
    regsiter:pathCombine(APIRoot,"register"),
    articles:pathCombine(APIRoot,"articles"),
    tags:pathCombine(APIRoot, "tags"),
    categories:pathCombine(APIRoot,"categories"),
    comments:pathCombine(APIRoot,"comments"),
    upload:pathCombine(APIRoot,"upload"),
    rate:pathCombine(APIRoot,"rate"),
    filteredList: pathCombine(APIRoot,"articles","filter"),
    termsAndConditions:pathCombine(APIRoot,"info","TermsAndConditions.md"),
    about:{
        project: pathCombine(APIRoot, "info","project.md"),
        me: pathCombine(APIRoot,"info","me.md"),
        tech :pathCombine(APIRoot, "info","tech.md")
    } ,
};

export const JSONRequestInit = (payload,headers?,method?:string,)=>({
    method: method ? method : "POST",
    body: JSON.stringify(payload),
    headers:{
        ...headers,
        "Content-Type":"application/json"
    }
});

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

export const padding = { padding: "8px 8px 8px 8px" };

export const twoColStyleLeft = {lg:{ span: 6, order: 1 },md:{ span: 6, order: 1 },sm:{ span: 24, order: 2 }, xs:{ span: 24, order: 2 } }
export const twoColStyleRight = {lg:{ span: 18, order: 2 },md:{ span: 18, order: 2 },sm:{ span: 24, order: 1 }, xs:{ span: 24, order: 1 } }

export const simpleFormValidator = (values:Object):Array<string>=>{
    let emptyKeys = [];
    Object.keys(values).forEach(key=>{
        if (!values[key]){ emptyKeys.push(key);}
        if (Array.isArray(values[key]) && values[key].length ==0 ) { emptyKeys.push(key)}
    });
    return emptyKeys.length==0 ? undefined : emptyKeys;
}