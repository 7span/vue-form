<template>
  <div>
    <pre>{{ data }}</pre>

    <hr />

    <VueForm
      :fields="fields"
      :read="read"
      :create="create"
      :update="update"
      :archive="archive"
      :unarchive="unarchive"
      :delete="del"
      v-model="values"
      :item-id="route.params.itemId"
    >
      <template #default="{ context }">
        <!-- <pre>context: {{ context }}</pre> -->

        <VueFormError></VueFormError>

        <VueFormFields style="border: 2px solid gray; padding: 20px">
          <template #default="{ values, dirtyValues }">
            <pre>values: {{ values }}</pre>
            <pre>dirty: {{ dirtyValues }}</pre>

            <VueFormField name="id" v-slot="{ nativeField, error, label }">
              <label for="">{{ label }}</label>
              <input
                type="text"
                v-bind="nativeField"
                :disabled="!context.isNewItem"
              />
              <p v-if="error">Error: {{ error }}</p>
            </VueFormField>

            <VueFormField name="customInput" v-slot="{ field, error, label }">
              <label for="">{{ label }}</label>
              <CustomInput v-bind="field" />
              <p v-if="error">Error: {{ error }}</p>
            </VueFormField>

            <VueFormField name="name" v-slot="{ nativeField, label, error }">
              <label>{{ label }}</label>
              <input type="text" v-bind="nativeField" />
              <p v-if="error">Error: {{ error }}</p>
            </VueFormField>

            <VueFormField name="gender" v-slot="{ nativeField, value, label }">
              <label>{{ label }}</label>
              <label for="male">
                <input
                  id="male"
                  type="radio"
                  v-bind="nativeField"
                  value="male"
                  :checked="value == 'male'"
                />
                <span>Male</span>
              </label>
              <label for="female">
                <input
                  id="female"
                  type="radio"
                  v-bind="nativeField"
                  value="female"
                  :checked="value == 'female'"
                />
                <span>Female</span>
              </label>
            </VueFormField>

            <VueFormField name="email" v-slot="{ nativeField, label, error }">
              <label>{{ label }}</label>
              <input type="email" v-bind="nativeField" />
              <p v-if="error">Error: {{ error }}</p>
            </VueFormField>

            <VueFormField name="age" v-slot="{ nativeField, label, error }">
              <label>{{ label }}</label>
              <input type="text" v-bind="nativeField" />
              <p v-if="error">Error: {{ error }}</p>
            </VueFormField>
          </template>
        </VueFormFields>

        <VueFormCreate />
        <VueFormUpdate />
        <VueFormArchive />
        <VueFormUnarchive />
        <VueFormDelete />
      </template>
    </VueForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CustomInput from "../input.vue";

const route = useRoute();
const values = ref(null);

const fields = ref([
  { name: "id", label: "IDDDD" },
  "name",
  "customInput",
  { name: "gender", value: "male" },
  { name: "email", value: "hello@gmail.com" },
  { name: "age" },
]);

const data = ref([
  { name: "Harsh Kansagara", email: "harsh@7span.com", age: "35", id: "1" },
  {
    name: "Hemratna Bhimani",
    email: "hem@7span.com",
    age: "36",
    id: "3",
    isArchived: true,
  },
]);

const getItem = (id) => {
  return data.value.find((item) => item.id == id);
};

const getItemIndex = (id) => {
  return data.value.findIndex((item, index) => item.id == id);
};

const read = (itemId) => {
  return new Promise((resolve, reject) => {
    const item = getItem(itemId);
    setTimeout(() => {
      if (item) {
        resolve({
          values: item,
          isArchived: item.isArchived,
        });
      } else {
        console.error("Item not found");
        reject(new Error("Item not found"));
      }
    }, 2000);
  });
};

const update = (itemId, context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(itemId);

    setTimeout(() => {
      if (index > -1) {
        data.value[index] = {
          ...data.value[index],
          ...context.values,
        };

        resolve({
          values: data.value[index],
          isArchived: data.value[index].isArchived,
        });
      } else {
        reject({ email: "ID not found!" });
      }

      console.log({ data, index, itemId });
    }, 2000);
  });
};

const archive = (itemId, context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(itemId);
    setTimeout(() => {
      if (index > -1) {
        data.value[index] = {
          ...data.value[index],
          isArchived: true,
        };

        console.log("AFTER", { ...data.value[index] });

        resolve({
          values: data.value[index],
          isArchived: data.value[index].isArchived,
        });
      } else {
        reject({ email: "ID not found!" });
      }

      console.log({ data, index, itemId });
    }, 2000);
  });
};

const unarchive = (itemId, context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(itemId);
    setTimeout(() => {
      if (index > -1) {
        data.value[index] = {
          ...data.value[index],
          isArchived: false,
        };

        resolve({
          values: data.value[index],
          isArchived: data.value[index].isArchived,
        });
      } else {
        reject({ email: "ID not found!" });
      }
    }, 2000);
  });
};

const create = (context) => {
  return new Promise((resolve, reject) => {
    const itemId = context.values.id;
    const index = getItemIndex(itemId);

    setTimeout(() => {
      if (index > -1) {
        const error = new Error("There was an error!");
        error.errors = {
          id: "ID already exists!",
        };
        reject(error);
      } else {
        data.value[index] = {
          ...data.value[index],
          ...context.values,
        };
        data.value.push({
          ...context.values,
        }); // add new item to the lis
        resolve({
          values: context.values,
        });
      }

      console.log({ data, index, itemId });
    }, 2000);
  });
};

const del = (itemId, context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(itemId);

    setTimeout(() => {
      if (index > -1) {
        delete data.value[index];
        resolve({});
      } else {
        reject({ email: "ID not found!" });
      }
    }, 2000);
  });
};
</script>
