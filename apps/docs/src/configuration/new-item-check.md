# isNewItemCheck

A function that determines whether the form should operate in create mode or edit mode. When the form component mounts, `<VueForm>` calls `isNewItemCheck` with the `context`. Within context, you can find `itemId` prop and it's value which can be useful to identify the mode.

```js
{
  isNewItemCheck: (context) => {
    const { itemId } = context;
    // Return true for create mode, false for update mode
    return itemId == "+" || itemId == "create";
  };
}
```

- Returns `false`: Form enters create mode. No API call is made; default field values are used.
- Returns `true`: Form enters edit mode. The `read` function is called with `itemId` to fetch existing data.

Most applications use the same component for both creating and editing records. The URL pattern typically looks like:

```
https://localhost:7777/users/+      // Create mode
https://localhost:7777/users/7      // Edit mode (ID: 7)
```

Based on the params received from URL here, "+" means a new user needs to be created. A unique ID means we need to open this form in edit mode and hence call `read` function with the "7" as argument.
