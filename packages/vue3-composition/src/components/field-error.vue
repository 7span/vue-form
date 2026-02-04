<template>
  <div v-if="fieldError" class="vue-form__field-error">
    {{ fieldError }}
  </div>
</template>

<script setup>
import { inject } from 'vue'
const fieldError = inject('fieldError')
</script>
