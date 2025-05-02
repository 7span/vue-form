<template>
  <div>
    <h1>Vue 3 Playground</h1>
    <ul>
      <li>
        <RouterLink :to="{ name: 'item', params: { itemId: 1 } }">
          Get Item 1
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'item', params: { itemId: 2 } }">
          Get Item 2
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'item', params: { itemId: 3 } }">
          Get Item 3
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'item', params: { itemId: '+' } }">
          New Item
        </RouterLink>
      </li>
    </ul>

    <RouterView />
  </div>
</template>
