<template>
  <div>
    <VForm
      :fields="fields"
      :id="0"
      :get="get"
      :save="save"
      :form-state.sync="formState"
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
          <label for="">Name</label>
          <input type="text" v-model="state.name" />
        </div>
        <div>
          <label for="">Email</label>
          <input type="email" v-model="state.email" />
          <p>{{ errors.email }}</p>
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
          out: Number,
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
          }, 1000);
        } else {
          setTimeout(() => {
            reject();
          }, 1000);
        }
      });
    },

    save(id, payload) {
      return new Promise((resolve, reject) => {
        if (!data[id]) {
          setTimeout(() => {
            console.log(payload);
            resolve(payload);
          }, 1000);
        } else {
          setTimeout(() => {
            reject({
              email: "Email already used",
            });
          }, 1000);
        }
      });
    },
  },
};
</script>
