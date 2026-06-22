// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://blog.sandlada.com",
    trailingSlash: "always",
    output: "static",
    integrations: [mdx({}), sitemap()],
    vite: {
    resolve: {
        tsconfigPaths: true,
    },
        plugins: [tailwindcss()]
    },
    devToolbar: { enabled: false, },
    markdown: {
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            defaultColor: false,
        },
    },
    redirects: {
        "/article/proxy/clash-verge-configuration": "/article/nEY3yeeXWvTN2Qb5SFTN0",
        "/article/english/english-adjective-intro": "/article/Gokx1NjEvB-PW05kzKoZu",
        "/article/english/english-sentence-structures": "/article/S92QymZnQ9khEJNMVNDom",
        "/article/english/noun-phrase": "/article/34OQk74yCup8KKNRYGRT1",
        "/article/general/commonly-used-tolls-and-websites-summary": "/article/dMt_wh1IIylMc5LSjrfbv",
        "/article/general/console-menu": "/article/YD21YBlDyhMP9B2Z56qy6",
        "/article/general/intro-tailwindcss-material-tokens": "/article/xUTaWvVq0vMXVA-Px9GeW",
        "/article/general/intro-taiwan-bopomofo": "/article/YU-ncb9uGs67a926G2hKo",
        "/article/general/intro-widget": "/article/w50O4l8xlj1aTGlQ-uM0Q",
        "/article/general/learn-about-material-design-3-in-simple-terms-and-explore-the-past-and-present-of-material-you": "/article/R8zTHiE0aKeJjxAOmhKrf",
        "/article/general/vue-lifecycle": "/article/OepEXjd5_BSVEztcrc4gx",
        "/article/logic/propositional-logic": "/article/OL9xz3zu_PSPqVag4ds7y",
        "/article/programming/ddd": "/article/BRPf9zYeqAD0Jgg3p-abG",
        "/article/react-learning-notes/01": "/article/dulukHEzRAVSiajMWTLao",
        "/article/react-learning-notes/02": "/article/LxjweVVQLhwDyyYCO0MTO",
        "/article/react-learning-notes/03": "/article/XEziOxkNzFPr3lpC3uSV6",
        "/article/react-learning-notes/04": "/article/dzu7MJQuq-HMQ0Tl3BXZh",
        "/article/react-learning-notes/05": "/article/X-wEeuobC4AZfCFyvvl10",
        "/article/react-learning-notes/06": "/article/nsysHpD9k2cSvO2Asabdu",
    },
})
