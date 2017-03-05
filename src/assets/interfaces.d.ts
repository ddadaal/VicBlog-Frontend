
interface ArticleBrief {
    id: string,
    username: string,
    submitTime: number,
    lastEditedTime: number,
    category: string,
    tags: string[]
    title: string,
    rate: number
}

declare type Article = ArticleBrief & { content: string }

interface User {
    username: string,
    role: UserRole,
    token: string
}

declare const enum UserRole {
    User,
    Admin,
    Unclear
}


