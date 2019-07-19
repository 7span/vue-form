<template lang="pug">
  .demo.p--xl
    button(@click="setVal") Call Raju
    v-form(
      ref="vForm"
      v-model="values" 
      @change="onChange" 
      :config="config" 
      :fields="fields" 
      :adapters="adapters")

      template(#repeater--add) 
        b +

      template(#repeater--remove) 
        b -

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
      this.$refs.vForm.setValue("company", "RAJU@JAGU.com");
    },
    onChange({ field, value, valuesMeta, values, valueObj, valuesObj }) {
      console.log(field, valueObj, valuesObj);
      switch (field) {
        case "po_item":
          break;

        case "gender":
          if (value == "male") {
            this.fields.husbund_name.hide = true;
            this.fields.father_name.hide = false;
          }
          if (value == "female") {
            this.fields.father_name.hide = true;
            this.fields.husbund_name.hide = false;
          }
          break;
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

