<template>
  <div>
    <VForm :fields="fields" id="3" :get="get" :save="save">
      <template #default="{ state, mode, saveItem }">
        <input type="text" v-model="state.name" />
        <input type="email" v-model="state.email" />
        <button @click="saveItem()">Save</button>
        <p>{{ state }}</p>
        <p>{{ mode }}</p>
      </template>
    </VForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "name",
        {
          name: "email",
          value: "hello@gmail.com",
        },
      ],
    };
  },

  methods: {
    get(id) {
      console.log({ id });
    },
    save(id, payload) {
      console.log(id, payload);
    },
  },
};
</script>
