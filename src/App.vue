<template lang="pug">
  .demo.p--xl
    button(@click="setVal") Set Value
    button(@click="setConfig") Set Config
    v-form(
      ref="vForm"
      v-model="values" 
      @change="onChange" 
      :config="config" 
      :fields="fields" 
      :adapters="adapters")

      //- template(#repeater--add) 
      //-   b +

      //- template(#repeater--remove) 
      //-   b -

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
      config: sampleForm.config,
      fields: sampleForm.fields,
      values: null,
      adapters: {
        po_title: {
          choices(res) {
            return res.data.data;
          }
        }
      }
    };
  },
  methods: {
    setVal() {
      this.$refs.vForm.setValue("e_company", "RAJU@JAGU.com", 1);
    },
    setConfig() {
      this.$refs.vForm.setConfig({
        field: "education",
        key: "placeholder",
        value: "LALLALA",
        index: 2
      });
    },
    onChange(data) {
      console.log("DATA:", data.changed);
    }
  }
};
</script>

<style lang="scss">
.demo {
  max-width: 700px;
  margin: 0 auto;
}
</style>

