<template lang="pug">
  .demo
    v-form(v-model="values" :config="sampleForm.config" :fields="sampleForm.fields")
</template>

<script>
import axios from "axios";
import sampleForm from "./sampleForm";

export default {
  name: "app",
  watch: {
    values: {
      deep: true,
      handler(nv) {
        //console.log(nv);
      }
    }
  },
  data() {
    return {
      sampleForm,
      values: null
    };
  }
};
</script>

<style lang="scss">
.demo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #dadada;
  margin-top: 50px;
}
</style>
