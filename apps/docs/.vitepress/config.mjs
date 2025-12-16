import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vue Form",
  description: "Dynamic forms for Vue 2 & 3",
  base: "/open-source/vue-form/",
  themeConfig: {
    nav: [{ text: "Introduction", link: "/" }],
    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "What is Vue Form?", link: "/" }],
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
