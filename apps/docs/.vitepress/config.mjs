import { defineConfig } from "vitepress";
import { version } from "../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VueForm",
  description:
    "Write your form schema, let VueForm handle the rest—state, lifecycle, and updates.",
  base: "/open-source/vue-form/",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  srcDir: "src",
  themeConfig: {
    siteTitle: "VueForm",
    logo: "/logo.svg",
    nav: [{ text: "Home", link: "/index.md" }],
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    outline: [2, 3],
    sidebar: [
      {
        text: "👋 Introduction",
        items: [
          { text: "Why VueForm?", link: "/introduction/why-vue-form" },
          {
            text: "How It Works",
            link: "/introduction/how-it-works",
          },
          {
            text: "Getting Started",
            link: "/introduction/getting-started",
          },
        ],
      },
      {
        text: "⚙️ Configuration",
        items: [
          { text: "Options", link: "/configuration/options" },
          { text: "isNewItemCheck", link: "/configuration/new-item-check" },
          { text: "Context Object", link: "/configuration/context-object" },
          { text: "Response Object", link: "/configuration/response-object" },
        ],
      },
      {
        text: "🧩 Components",
        items: [
          {
            text: "Introduction",
            link: "/components/intro",
          },
          { text: "VueForm", link: "/components/form" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/7span/vue-list" },
    ],
    footer: {
      message: `Version ${version}`,
      copyright: "🧑‍💻 Built @7Span.",
    },
  },
});
