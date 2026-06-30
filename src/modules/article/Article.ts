import { getCollection, type CollectionEntry } from "astro:content";
import type { TArticle } from "../../content.config";


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

    /**
     * 根據文章 ID 查詢其 related 陣列中的關聯文章
     * @param id 當前文章的 ID
     * @returns 關聯文章的 CollectionEntry 陣列（跳過不存在的 ID）
     */
    public static async GetRelatedArticles(id: string): Promise<Array<CollectionEntry<'articles'>>> {
        const allArticles = await getCollection('articles');
        const currentArticle = allArticles.find(a => a.data.id === id);
        if (!currentArticle) return [];

        const relatedIds = currentArticle.data.related;
        if (relatedIds.length === 0) return [];

        return relatedIds
            .map(rid => allArticles.find(a => a.data.id === rid))
            .filter((a): a is CollectionEntry<'articles'> => a !== undefined);
    }

    /**
     * 解析 references 陣列，對有 id 的項目查詢對應文章 entry
     * @param references 文章的 references 陣列
     * @returns 解析後的引用列表，包含原始 reference 資料與可選的站內文章 entry
     */
    public static async GetReferencedReferences(
        references: TArticle['references'],
    ): Promise<Array<{
        id?: string;
        url?: string;
        article: CollectionEntry<'articles'> | null;
    }>> {
        if (references.length === 0) return [];

        const allArticles = await getCollection('articles');

        return references.map(ref => ({
            id: ref.id,
            url: ref.url,
            article: ref.id
                ? allArticles.find(a => a.data.id === ref.id) ?? null
                : null,
        }));
    }
}
