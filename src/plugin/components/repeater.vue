<template lang="pug">
.field.repeater
  .repeater__items
    .repeater__item(v-for="(item,i) in repeaterValues" v-show="!item._delete")
      .repeater__input
        
        //Field
        field(
          :index="indexWithoutDeleted(i)"
          :config="config"
          :name="name"
          :value="value && value[i] && value[i].value"
          :value-obj="valueObj && valueObj[i] && valueObj[i].value"
          @loading="loading=$event"
          @input="input($event,{index:i})")

          //Passdown Slots
          template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
            slot(:name="slot" v-bind="scope")

      //Remove Repeater
      .repeater__remove(v-if="canRemoveRepeat")
        button.button.is-danger.is-trn.p--0.is-square(@click="removeRepeat(i)") 
          slot(name="repeater--remove")
            icon-remove.button__icon
  
  //Desc
  small(v-if="desc") {{desc}}

  //Add Repeater
  .repeater__add
    button.button.is-primary.is-trn.p--0.mt--sm(
      v-if="config.repeater && canRepeat"
      @click="repeat") 
        slot(name="repeater--add")
          icon-add.button__icon
          span Add More
</template>

<script>
export default {
  name: "repeater",
  mixins: [require("@/plugin/helper").default],
  components: {
    IconRemove: require("@/plugin/components/icons/remove").default,
    IconAdd: require("@/plugin/components/icons/add").default
  },
  inject: ["CONFIG"],
  props: {
    index: {
      type: Number,
      default: null
    },
    fields: {
      default: null
    },
    name: {
      default: null
    },
    value: {
      type: Array,
      default: () => []
    },
    valueObj: {
      type: Array,
      default: () => []
    },
    config: {
      default: null
    }
  },

  data() {
    return {
      state: null,
      loading: false,
      //Clones the values.
      repeaterValues: [...this.value],
      repeaterValuesObj: [...this.valueObj]
    };
  },

  computed: {
    repeaterCount() {
      return this.repeaterValues.filter(item => !item._delete).length;
    },

    desc() {
      let messages = this.config.messages;
      if (!messages) return null;
      if (this.state == "valid" && messages.valid) {
        return messages.valid;
      } else if (this.state == "invalid" && messages.invalid) {
        return messages.invalid;
      } else if (this.state === null && messages.desc) {
        return messages.desc;
      } else {
        return null;
      }
    },

    canRepeat() {
      if (!this.config.repeater.max) {
        return true;
      } else {
        return this.repeaterCount < this.config.repeater.max;
      }
    },

    canRemoveRepeat() {
      if (!this.config.repeater.min) {
        return true;
      } else {
        return this.repeaterCount > this.config.repeater.min;
      }
    }
  },

  methods: {
    //Ignores $delete:true items
    indexWithoutDeleted(index) {
      if (index == null) return null;

      let newIndex = index + 0;
      for (var i = 0; i < index; i++) {
        if (this.repeaterValues[i] && this.repeaterValues[i]._delete === true) {
          newIndex--;
        }
      }
      return newIndex;
    },

    repeat() {
      if (this.canRepeat) {
        // This adds an object with null values
        // To make sure that every fields added in DOM has respective key.
        let defaultValues = null;
        if (this.config.fields) {
          defaultValues = this.defaultValues(this.config.fields);
        }
        let index = this.repeaterValues.length;
        this.$set(this.repeaterValues, index, {
          value: defaultValues
        });
        this.$set(this.repeaterValuesObj, index, {
          value: defaultValues
        });

        this.$emit("input", {
          field: this.name,
          value: this.repeaterValues,
          valueObj: this.repeaterValuesObj,
          changed: [
            {
              field: this.name,
              value: this.repeaterValues,
              valueObj: this.repeaterValuesObj,
              action: "repeater-add",
              index: this.indexWithoutDeleted(index)
            }
          ]
        });
      }
    },

    removeRepeat(index) {
      //If the `id` is existing in repeater item, it is saved on server
      //We need to keep it and set $delete:true to let api know to remove item.
      if (this.repeaterValues[index]._id) {
        this.$set(this.repeaterValues, index, {
          ...this.repeaterValues[index],
          _delete: true
        });
        this.$set(this.repeaterValuesObj, index, {
          ...this.repeaterValuesObj[index],
          _delete: true
        });
      } else {
        this.repeaterValues.splice(index, 1);
        this.repeaterValuesObj.splice(index, 1);
      }

      this.$emit("input", {
        field: this.name,
        value: this.repeaterValues,
        valueObj: this.repeaterValuesObj,
        changed: [
          {
            field: this.name,
            value: this.repeaterValues,
            valueObj: this.repeaterValuesObj,
            action: "repeater-remove",
            index: this.indexWithoutDeleted(index)
          }
        ]
      });
    },

    input(data, { index }) {
      this.$set(this.repeaterValues, index, {
        value: data.value
      });
      this.$set(this.repeaterValuesObj, index, {
        value: data.valueObj
      });

      this.$emit("input", {
        field: this.name,
        value: this.repeaterValues,
        valueObj: this.repeaterValuesObj,
        changed: data.changed
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.repeater {
  &__items {
    flex-direction: column;
    display: flex;
  }
  &__item {
    display: flex;
    + .repeater__item {
      margin-top: 10px;
    }
  }
  &__input {
    flex: 1 1 auto;
  }
  &__remove {
    flex: 0 0 auto;
    margin-left: 10px;
    align-self: flex-end;
  }
}
</style>
