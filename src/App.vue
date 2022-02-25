<template>
  <div>
    <VForm
      :fields="fields"
      :id="0"
      :get="get"
      :save="save"
      :form-state.sync="formState"
    >
      <template #default="{ state, mode, saveItem, setValue, isLoading }">
        <h1>Loading: {{ isLoading }}</h1>
        <div>
          <label for="">Name</label>
          <input type="text" v-model="state.name" />
        </div>
        <div>
          <label for="">Email</label>
          <input type="email" v-model="state.email" />
        </div>
        <div>
          <label for="">Age</label>
          <input type="email" v-model="state.age" />
        </div>

        <div>
          <button @click="saveItem()">Save</button>
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

<script>
const data = [
  {
    name: "Harsh",
    email: "harsh@7span.com",
    age: 31,
  },
  {
    name: "Hem",
    email: "hem@7span.com",
    age: 35,
  },
];

export default {
  data() {
    return {
      formState: null,

      fields: [
        "name",
        {
          name: "email",
          value: "hello@gmail.com",
        },
        {
          name: "age",
          type: Number,
          parse: (value) => value + 5,
        },
      ],
    };
  },

  methods: {
    get(id) {
      return new Promise((resolve, reject) => {
        if (data[id]) {
          setTimeout(() => {
            resolve(data[id]);
          }, 3000);
        } else {
          setTimeout(() => {
            reject();
          }, 3000);
        }
      });
    },

    save(id, payload) {
      return new Promise((resolve, reject) => {
        if (data[id]) {
          setTimeout(() => {
            console.log(payload);
            resolve(payload);
          }, 3000);
        } else {
          setTimeout(() => {
            reject();
          }, 3000);
        }
      });
    },
  },
};
</script>
