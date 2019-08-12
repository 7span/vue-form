<template lang="pug">
  .demo.p--xl

    .blocks
      .block
        p Set Values
        .gy--sm
          button.button(@click='setValue({field: "email",value: "harsh@7span.com"})') Value
          button.button(@click='setValue({field: "education",value: "BTECH",index: 1})') Repeater Value w/ Index
          button.button(@click='setValue({field: "education",value: "B.E."})') Repeater Value w/o Index
          button.button(@click='setValue({field: "company",value: "7Span"})') Group Value
          button.button(@click='setValue({field: "e_company",value: "7Span Tech",index: 1})') Grouped Repeater Value w/ Index
          button.button(@click='setValue({field: "e_company",value: "7Span Tech"})') Grouped Repeater Value w/o Index
      .block
        p Set Config
        .gy--sm.mb--xl
          button.button(@click='setConfig({field: "email",key:"after",value: "#"})') Config
          button.button(@click='setConfig({field: "education",key:"after",value: "#",index: 1})') Repeater Config w/ Index
          button.button(@click='setConfig({field: "education",key:"after",value: "#"})') Repeater Config w/o Index
          button.button(@click='setConfig({field: "company",key:"after",value: "#"})') Group Config
          button.button(@click='setConfig({field: "e_company",key:"after",value: "#",index: 1})') Grouped Repeater Config w/ Index
          button.button(@click='setConfig({field: "e_company",key:"after",value: "#"})') Grouped Repeater Config w/o Index


    v-form(
      ref="vForm"
      v-model="values" 
      :meta-value.sync="metaValue"
      @change="onChange" 
      :settings="settings" 
      :fields="fields" 
      :adapters="adapters")
      
      //template(slot="repeater--add") 
        span ADDDDDDDD

      template(#form--start="data")
        h2 VForm

      //template(#field--end--training="data") 
        span  {{data}}

      //template(#field--end--education--1="data") 
        span {{data}}

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
      metaValue: null,
      settings: sampleForm.config,
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
      let _changed = data[0];
      //Change unit
      if (_changed.field == "years") {
        let unit = _changed.metaValue.value.unit;
        this.$refs.vForm.setValue({
          field: "salary",
          value: 2 * _changed.value
        });
      }
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

