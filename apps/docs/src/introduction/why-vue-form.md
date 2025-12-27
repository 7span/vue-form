# Why VueForm?

In frontend projects, CRUD operations are everywhere—users, products, orders, settings, and more. Yet almost every form requires the same repetitive boilerplate:

- State management flags: `isGetting`, `isSaving`, `isDeleting`
- Error handling: errors, hasError
- Validation logic repeated across forms
- Form lifecycle hooks written from scratch each time

This repetition slows development, bloats codebases, and makes consistency nearly impossible as projects scale.

---

✨ **VueForm eliminates this repetition** ✨

---

VueForm eliminates this repetition by abstracting common CRUD patterns into a reusable, headless plugin. We analyzed typical CRUD workflows and separated concerns into two layers:

**Global configuration:** Repetitive patterns that should work the same everywhere (error handling, state management, schema validation)

**Local configuration:** Form-specific details that make each CRUD unique (fields, validation rules, API Calls)
