# schemaToFields

A global configuration function that converts validation schemas (e.g., Zod, Yup) into VueForm's field configuration format. Define this once globally and reuse across all `<VueForm>` instances.

### Why It Exists

When using validation libraries like Zod or Yup, you define your form structure in a schema. Instead of manually duplicating this structure into VueForm's fields array, `schemaToFields` automatically transforms your schema into the required format.

### Example: Zod Integration

```js
{
  schemaToFields: (schema) => {
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
}
```

```vue
<template>
  <VueForm :schema="userSchema" />
</template>

<script setup>
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18),
});
</script>
```
