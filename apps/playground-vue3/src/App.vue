<template>
  <div class="prose">
    <div class="bg-gray-200 flex justify-between items-center px-8">
      <h1>Vue 3 Playground</h1>
      <div class="flex gap-4 [&>*]:py-4">
        <RouterLink :to="{ name: 'item', params: { itemId: '+' } }">
          Create Item
        </RouterLink>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8">
      <div>
        <table class="border w-full">
          <tr>
            <td class="border px-4">Name</td>
            <td class="border px-4">Edit</td>
          </tr>
          <tr v-for="item in items" :key="item.id">
            <td class="border px-4">
              <pre>{{ item }}</pre>
            </td>
            <td class="border px-4">
              <RouterLink :to="{ name: 'item', params: { itemId: item.id } }">
                Edit
              </RouterLink>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const items = ref([]);
fetch("https://products.7span.in/items/plugins_test")
  .then((res) => res.json())
  .then((res) => {
    items.value = res.data;
  });
</script>

<style>
label {
  display: block;
}
input {
  border: 1px solid #dadada;
}
button {
  background: #000;
  color: #fff;
  padding: 2px 8px;
}
</style>
