<template lang="pug">
  .demo.p--xl
    v-form(v-model="values" :config="sampleForm.config" :fields="sampleForm.fields")
</template>

<script>
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
  max-width: 700px;
  margin: 0 auto;
}
</style>

