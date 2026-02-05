<template>
  <div>
    <VueForm
      :read="read"
      :create="create"
      :update="update"
      :archive="archive"
      :unarchive="unarchive"
      :schema="schema"
      :update-schema="updateSchema"
      :schema-to-fields="schemaToFields"
      :validate-schema="validateSchema"
      :error-adapter="errorAdapter"
      :delete="del"
      v-model="values"
      :item-id="route.params.itemId"
    >
      <template #default="{ context }">
        <pre>{{ context.values }}</pre>
        <pre>{{ context.dirtyValues }}</pre>
        <pre>{{ context.dirty }}</pre>
        <VueFormError></VueFormError>

        <VueFormFields class="p-8 flex flex-col gap-4">
          <template #default>
            <VueFormField name="id" v-slot="{ nativeModel, error, label }">
              <label for="">{{ label }}</label>
              <input
                type="text"
                v-bind="nativeModel"
                :disabled="context.isUpdateMode"
              />

              <VueFormFieldError />
            </VueFormField>

            <VueFormField name="customInput" v-slot="{ field, error, label }">
              <label for="">{{ label }}</label>
              <CustomInput v-bind="field" />

              <VueFormFieldError />
            </VueFormField>

            <VueFormField name="name" v-slot="{ nativeModel, label, error }">
              <label>{{ label }}</label>
              <input type="text" v-bind="nativeModel" />

              <VueFormFieldError />
            </VueFormField>

            <VueFormField
              name="gender"
              v-slot="{ nativeModel, value, label, error }"
            >
              <label>{{ label }}</label>
              <label for="male">
                <input
                  id="male"
                  type="radio"
                  v-bind="nativeModel"
                  value="male"
                  :checked="value == 'male'"
                />
                <span>Male</span>
              </label>
              <label for="female">
                <input
                  id="female"
                  type="radio"
                  v-bind="nativeModel"
                  value="female"
                  :checked="value == 'female'"
                />
                <span>Female</span>
              </label>

              <VueFormFieldError />
            </VueFormField>

            <VueFormField name="email" v-slot="{ nativeModel, label, error }">
              <label>{{ label }}</label>
              <input type="email" v-bind="nativeModel" />

              <VueFormFieldError />
            </VueFormField>

            <VueFormField name="age" v-slot="{ nativeModel, label, error }">
              <label>{{ label }}</label>
              <input type="text" v-bind="nativeModel" />

              <VueFormFieldError />
            </VueFormField>
          </template>
        </VueFormFields>

        <div class="flex gap-4 p-8">
          <VueFormCreate />
          <VueFormUpdate />
          <VueFormArchive />
          <VueFormUnarchive />
          <VueFormDelete />
        </div>
      </template>
    </VueForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CustomInput from "../input.vue";
import z from "zod";

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

const schema = z.object({
  // id: z.string().min(1, "ID is required").default("").describe("ID"),
  name: z.string().min(1, "Name is required").default("").describe("Full Name"),
  email: z.string().email("Invalid email").default("").describe("Email"),
  // customInput: z
  //   .string()
  //   .min(5, "Custom Input must be at least 5 characters")
  //   .default("")
  //   .describe("Custom Input"),
  // gender: z.enum(["male", "female"]).default("male").describe("Gender"),
  // email: z.email("Invalid email address").default("").describe("Email Address"),
  // age: z
  //   .string()
  //   .refine((val) => !isNaN(Number(val)), { message: "Age must be a number" })
  //   .default("0")
  //   .describe("Age"),
});

const updateSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .default("")
      .describe("Full Name"),
    email: z.string().email("Invalid email").default("").describe("Email"),
  })
  .partial();

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

const validateSchema = (context) => {
  const { schema, dirtyValues, values, mode, createSchema, updateSchema } =
    context;

  let targetSchema;
  if (mode === "CREATE" && createSchema) {
    targetSchema = createSchema;
  } else if (mode === "UPDATE" && updateSchema) {
    targetSchema = updateSchema;
  } else {
    targetSchema = schema;
  }

  let valuesToValidate = values;
  if (mode === "UPDATE") {
    valuesToValidate = dirtyValues;
  }

  return new Promise((resolve, reject) => {
    const res = targetSchema.safeParse(valuesToValidate);
    if (!res.success) {
      reject(res.error);
    }
    resolve(true);
  });
};

const errorAdapter = (error, context) => {
  if (error.name == "ZodError") {
    const flattened = z.flattenError(error);
    const fieldErrors = Object.keys(flattened.fieldErrors).reduce(
      (acc, item) => {
        acc[item] = flattened.fieldErrors[item][0];
        return acc;
      },
      {},
    );

    return {
      name: "Form Validation Failed!",
      message: "Check fields and try again!",
      fieldErrors,
    };
  } else {
    return {
      name: error.name,
      message: error.message,
    };
  }
};

const schemaToFields = (schema) => {
  return Object.keys(schema.def.shape).map((key) => {
    const defaultValue = schema.def.shape[key].def.defaultValue;
    const label = schema.def.shape[key].def.description;

    return {
      name: key,
      label: label || key.charAt(0).toUpperCase() + key.slice(1),
      value: defaultValue,
    };
  });
};

const getItem = (id) => {
  return data.value.find((item) => item.id == id);
};

const getItemIndex = (id) => {
  return data.value.findIndex((item, index) => item.id == id);
};

const read = ({ itemId }) => {
  return fetch(`https://products.7span.in/items/plugins_test/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return {
        values: res.data,
      };
    });
};

const update = (context) => {
  console.log({ context });
  return fetch(
    `https://products.7span.in/items/plugins_test/${context.itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context.dirtyValues),
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return {
        values: res.data,
      };
    });
};

const archive = (context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(context.itemId);
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

      console.log({ data, index, itemId: context.itemId });
    }, 2000);
  });
};

const unarchive = (context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(context.itemId);
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
  return fetch("https://products.7span.in/items/plugins_test", {
    method: "POST",
    body: JSON.stringify(context.values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return {
        values: res.data,
      };
    });
};

const del = (context) => {
  return new Promise((resolve, reject) => {
    const index = getItemIndex(context.itemId);

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
