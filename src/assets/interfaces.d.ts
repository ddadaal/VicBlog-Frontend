
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

declare type Article = ArticleBrief & {content: string}

