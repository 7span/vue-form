# validateSchema

A global configuration function that validates form data against a validation schema (e.g., Zod, Yup) before executing create or update methods. Define this once globally and reuse across all `<VueForm>` instances.

### Why It Exists

When using validation libraries like Zod or Yup, you want to validate form data before making API calls. Instead of writing validation logic in every form, validateSchema centralizes validation handling, ensuring consistent behavior across your application.

### Benefits

- Single validation logic for all forms
- Automatic validation before create/update calls
- Prevent invalid API requests
- Consistent error handling with `errorAdapter`

### How It Works

- User clicks the create/update button
- VueForm calls validateSchema with the schema and form values
- If validation passes, the create/update method is called
- If validation fails, errors are processed through `errorAdapter` and displayed
- API call is prevented when validation fails

### Example: Zod Integration

```js
{
  validateSchema: (context) => {
    const { schema, values } = context;
    return new Promise((resolve, reject) => {
      const res = schema.safeParse(values);
      if (!res.success) {
        reject(res.error);
      }
      resolve(true);
    });
  },
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
