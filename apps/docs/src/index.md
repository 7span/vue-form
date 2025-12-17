---
layout: home

hero:
  name: VueForm
  text: Dynamic forms for Vue 2 & 3
  tagline: Dynamic forms for Vue 2 & 3
  image:
    src: /hero.svg
    alt: VueForm
  actions:
    - theme: brand
      text: Get Started
      link: /introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/7span/vue-form
features:
  - icon: 🧠
    title: Vue 2 & 3
    details: Vue 2 & 3 support.
  - icon: 🔁
    title: Vue 3 (composition API bundle)
    details: Vue 3 (composition API bundle) support.
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

### 🙌 Credits

> A huge shoutout to the brilliant folks behind `<VueForm>`\
> Thank you for turning "ugh, another form" into "oh hey, that was easy." 🚀

<VPTeamMembers size="small" :members />
