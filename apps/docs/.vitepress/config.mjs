import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Form",
  description: "Dynamic forms for Vue 2 & 3",
  themeConfig: {
    nav: [
      { text: "Introduction", link: "/" },
      { text: "Configurations", link: "/configurations" },
      { text: "Components", link: "/components" },
    ],
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
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
