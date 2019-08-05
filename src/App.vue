<template lang="pug">
  .demo.p--xl

    p Set Values
    .gx--sm
      button.button(@click='setValue({field: "email",value: "harsh@7span.com"})') Value
      button.button(@click='setValue({field: "education",value: "BTECH",index: 1})') Repeater Value
      button.button(@click='setValue({field: "company",value: "7Span"})') Group Value
      button.button(@click='setValue({field: "e_company",value: "7Span Tech",index: 1})') Grouped Repeater Value

    p Set Config
    .gx--sm.mb--xl
      button.button(@click='setConfig({field: "email",key:"after",value: "#"})') Config
      button.button(@click='setConfig({field: "education",key:"after",value: "#",index: 1})') Repeater Config
      button.button(@click='setConfig({field: "company",key:"after",value: "#"})') Group Config
      button.button(@click='setConfig({field: "e_company",key:"after",value: "#",index: 1})') Grouped Repeater Config


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
    setValue(obj) {
      this.$refs.vForm.setValue(obj);
    },
    setConfig(obj) {
      this.$refs.vForm.setConfig(obj);
    },

    onChange(data) {
      console.log("DATA:", data);
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

