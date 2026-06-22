import { getCollection, type CollectionEntry } from "astro:content";


export class Article {
    private constructor() {}

    public static GetAllArticles(): Promise<Array<CollectionEntry<'articles'>>> {
        return getCollection('articles')
    }

    public static SortByPublishTime(articles: Array<CollectionEntry<'articles'>>) {
        return articles.sort((a, b) => b.data.meta.publishedAt.valueOf() - a.data.meta.publishedAt.valueOf());
    }

    public static async GetFeaturedArticles() {
        return (await getCollection('articles')).filter(article => article.data.status.isFeatured)
    }

}
