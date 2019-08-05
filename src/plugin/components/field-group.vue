<template lang="pug">
.field__group
  .field__before(v-if="config.before") {{config.before}}

  component(
    :index="index"
    :is="`v-${config.interface}`"
    v-bind="{name,values,valuesObj,...config}"
    :value="value"
    :valueObj="valueObj"
    @loading="$emit('loading',$event)"
    @input="$emit('input',arguments[0],arguments[1])")

    //slot(
      v-for="slot,slotName in SLOTS" 
      :slot="slotName" 
      slot-scope="scope" 
      :name="slotName"
      :scope="scope")

  .field__after(v-if="config.after") {{config.after}}
</template>

<script>
export default {
  props: {
    index: {
      default: null,
      type: Number
    },
    config: {
      type: Object
    },
    name: {
      default: null
    },
    value: {
      default: null
    },
    valueObj: {
      default: null
    },
    values: {
      default: null
    },
    valuesObj: {
      default: null
    },
    config: {
      default: null
    }
  }
};
</script>

