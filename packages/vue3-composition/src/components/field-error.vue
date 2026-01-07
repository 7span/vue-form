<template>
    <div v-if="fieldError && fieldError.message" class="vue-form__field-error">
        {{ fieldError.message }}
    </div>
</template>

<script setup>
import { inject } from 'vue'

const fieldError = inject('errorMessage')
</script>