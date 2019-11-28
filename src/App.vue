<template lang="pug">
  .demo.p--xl

    s-blocks(gap="sm")
      s-block(:size="6")
        p Set Values
        s-list(stack group)
          s-button(color="primary" style_="outline" @click.native='setValue("email","harsh@7span.com")') Value
          s-button(color="primary" style_="outline" @click.native='setValue("education","BTECH", 1)') Repeater Value w/ Index
          s-button(color="primary" style_="outline" @click.native='setValue("education",[{value:"B.E. 1"},{value:"B.E. 2"}])') Repeater Value w/o Index
          s-button(color="primary" style_="outline" @click.native='setValue("company","7Span")') Group Value
          s-button(color="primary" style_="outline" @click.native='setValue("e_company","7Span Tech",1)') Grouped Repeater Value w/ Index
          s-button(color="primary" style_="outline" @click.native='setValue("e_company","7Span Tech")') Grouped Repeater Value w/o Index
      s-block(:size="6")
        p Set Config
        s-list(stack group)
          s-button(color="primary" style_="outline" @click.native='setConfig("email","after","#")') Config
          s-button(color="primary" style_="outline" @click.native='setConfig("education","after","#", 1)') Repeater Config w/ Index
          s-button(color="primary" style_="outline" @click.native='setConfig("education","after","#")') Repeater Config w/o Index
          s-button(color="primary" style_="outline" @click.native='setConfig("company","after","#")') Group Config
          s-button(color="primary" style_="outline" @click.native='setConfig("e_company","after","#", 1)') Grouped Repeater Config w/ Index
          s-button(color="primary" style_="outline" @click.native='setConfig("e_company","after","#")') Grouped Repeater Config w/o Index


    v-form(
      ref="vForm"
      v-model="values" 
      :meta-value.sync="metaValue"
      @init="init()"
      @change="onChange" 
      :settings="settings" 
      :callback="callback"
      :fields="fields")
      template(#form--start="data")
        h2 VForm


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
      callback: {
        email({ setValue, changed }) {
          setValue("father_name", changed.value);
        }
      }
    };
  },

  methods: {
    init() {
      console.log(this.values);
    },

    setValue(field, value, index) {
      this.$refs.vForm.setValue(field, value, index);
    },

    setConfig(field, key, value, index) {
      this.$refs.vForm.setConfig(field, key, value, index);
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
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.demo {
  max-width: 700px;
  margin: 0 auto;
}
</style>

