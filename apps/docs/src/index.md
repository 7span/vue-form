---
layout: home

hero:
  name: VueForm
  text: Build consistent CRUD forms, faster.
  tagline: Write your form schema & API calls, let VueForm handle the rest - state, lifecycle, and updates.
  image:
    src: /hero.svg
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/why-vue-form
    - theme: alt
      text: View on GitHub
      link: https://github.com/7span/vue-form
features:
  - icon: 🧠
    title: Headless
    details: Completely UI-agnostic. It gives you full control over the markup via scoped slots.
  - icon: 🔁
    title: Consistency
    details: Write forms the same way everywhere. Scale without friction.
  - icon: ⚡
    title: Speed
    details: Copy existing forms and customize. Ship features faster.
  - icon: 💾
    title: Opinionated
    details: Built-in structure enforces best practices across your team.
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/7span.png',
    name: '7Span',
    title: 'Sponsor',
    links: [
      { icon: 'github', link: 'https://github.com/7span' },
      { icon: 'x', link: 'https://x.com/7SpanHQ' }
    ]
  },
  {
    avatar: 'https://github.com/theharshin.png',
    name: 'Harsh Kansagara',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/theharshin' },
      { icon: 'x', link: 'https://x.com/theharshin' }
    ]
  },
   

]
</script>

---

### 🙌 Credits

> A huge shoutout to the brilliant folks behind `<VueForm>`\
> Thank you for turning "ugh, another form" into "oh hey, that was easy." 🚀

<VPTeamMembers size="small" :members />
