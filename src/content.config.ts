import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type SchemaContext } from "astro:content";

const ArticleSchema = ({ image }: SchemaContext) => z.object({

    // nanoid is a tiny, secure, URL-friendly, unique string ID generator for JavaScript.
    id: z.string().readonly(),

    /**
     *
     * @example 邏輯結構
     * ```plaintext
     * /english
     * /chinese
     * /gaming
     * /gaming/minecraft
     * /gaming/wow
     * /programming
     * /programming/java
     * /programming/java/part1
     * /programming/java/part1/overview
     * ```
     *
     * 真實的articles文件全部位於content/articles/...中
     */
    category: z.string().readonly(),

    /**
     * 用於排序，數字越小越靠前，默認為1
     * @example plaintext
     * ```
     * 第一天.md -> order: 1
     * 第四天.md -> order: 1.25
     * 第三天.md -> order: 1.5
     * 第五天.md -> order: 1.75
     * 第六天.md -> order: 1.875
     * 第二天.md -> order: 2
     * ```
     */
    order: z.number().default(1),

    hasOverview: z.boolean().default(false),
    overview: z.string().nullable().default(null),

    status: z.object({
        isDraft: z.boolean().default(false),
        isVisible: z.boolean().default(false),
        isFeatured: z.boolean().default(false),
    }),

    // For SEO
    meta: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string().default('kai-orion'),
        keywords: z.array(z.string()).default([]),
        createdAt: z.coerce.date(),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
        /**
         * @example
         * ```plaintext
         * en, en-US, en-GB
         * zh, zh-CN, zh-TW, zh-Hant, zh-Hans, zh-Hant-TW, zh-Hans-CN
         * ```
         */
        language: z.string().default('en'),
    }),

    hasCover: z.boolean().default(false),
    cover: z.object({
        image: image().nullable().default(null),
        alt: z.string().nullable().default(null),
    }),
})
    .strict()
    .refine((data) => data.hasOverview ? data.overview !== null && data.overview.trim().length > 0 : true, {
        message: "If hasOverview is true, overview must be provided and cannot be empty",
        path: ['overview'],
    })
    .refine((data) => data.hasCover ? data.cover !== null && data.cover.image !== null : true, {
        message: "If hasCover is true, cover and cover.image must be provided",
        path: ['cover'],
    })

const ArticleCollection = defineCollection({
    loader: glob({ base: './src/content/articles',  pattern: '**/*.{md,mdx}' }),
    schema: ArticleSchema,
})

export type TArticle = z.infer<ReturnType<typeof ArticleSchema>>

export const collections = {
    'articles': ArticleCollection,
}
