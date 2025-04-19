<template>
  <div>
    VUE 3
    <VForm
      :fields="fields"
      :id="0"
      :get="get"
      :save="save"
      v-model:formState="formState"
    >
      <template
        #default="{
          state,
          mode,
          saveItem,
          setValue,
          isLoading,
          errors,
          hasError,
        }"
      >
        <h1>Loading: {{ isLoading }}</h1>
        <h2>Error: {{ hasError }}</h2>

        <div>
          <label>Name</label>
          <input type="text" v-model="state.name" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" v-model="state.email" />
          <p>{{ errors.email }}</p>
        </div>

        <div>
          <label>Age</label>
          <input type="text" v-model="state.age" />
        </div>

        <div>
          <button @click="saveItem">Save</button>
        </div>

        <div>
          <button @click="setValue('email', 'haha@ahha.com')">Set Email</button>
        </div>

        <div>
          <p>STATE: {{ state }}</p>
          <p>MODE: {{ mode }}</p>
        </div>
      </template>
    </VForm>

    <div>
      <h1>Form State in Parent Component</h1>
      <p>{{ formState }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const formState = ref(null);
const fields = ref([
  "name",
  { name: "email", value: "hello@gmail.com" },
  { name: "age", out: Number },
]);

const data = [
  { name: "Harsh", email: "harsh@7span.com", age: "31" },
  { name: "Hem", email: "hem@7span.com", age: "35" },
];

const get = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data[id] ? resolve(data[id]) : reject();
    }, 1000);
  });
};

const save = (id, payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data[id]) {
        console.log(payload);
        resolve(payload);
      } else {
        reject({ email: "Email already used" });
      }
    }, 1000);
  });
};
</script>
