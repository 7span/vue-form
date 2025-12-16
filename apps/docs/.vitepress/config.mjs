import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  srcDir: "src",
  title: "Vue Form",
  description: "Dynamic forms for Vue 2 & 3",
  base: "/open-source/vue-form/",
  themeConfig: {
    nav: [{ text: "Home", link: "/index" }],
    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "What is Vue Form?", link: "/introduction" }],
      },
      {
        text: "Configurations",
        items: [{ text: "Plugin Options", link: "/configurations" }],
      },
      {
        text: "Components",
        items: [{ text: "Component Guide", link: "/components" }],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/7span/vue-form" },
    ],
  },
});
