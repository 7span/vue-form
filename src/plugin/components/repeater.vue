<template lang="pug">
.field.repeater

  // Repeater Label
  //- When the repeater mode is on, display the name of the field here to avoid repeatation in child fields.
  label.repeater__label {{name | titleCase}}

  .repeater__items
    .repeater__item(v-for="(item,i) in repeaterValue" v-show="item && !item._delete")
      
      // Repeater Input
      .repeater__input
        
        // Field
        //- Passdowm index value to child field to let it know the index.
        component(
          :is="componentType(mergedConfig)"
          :name="name" 
          :key="`${name}--${i}`"
          :index="indexWithoutDeleted(i)"
          :config="mergedConfig"
          :value="repeaterValue[i] && repeaterValue[i].value"
          parent-interface="repeater"
          :parent-value="repeaterValue"
          :parent-meta-value="repeaterMetaValue"
          @setRepeaterConfig="setConfig($event)"
          @input="input(arguments,i)")

          // Passdown Slots
          template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
            slot(:name="slot" v-bind="scope")

      // Remove Repeater
      .repeater__remove(v-if="canRemoveRepeat")
        button.button.is-danger.is-trn.p--0.is-square(@click="removeRepeat(i)") 
          slot(name="repeater--remove")
            icon-remove.button__icon
  
  //Desc
  small(v-if="config.desc") {{config.desc}}

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
  mixins: [require("@/plugin/mixins/fields").default],
  components: {
    IconRemove: require("@/plugin/components/icons/remove").default,
    IconAdd: require("@/plugin/components/icons/add").default
  },
  inject: ["SETTINGS"],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      // Need to clone values to avoid directly mutating props.
      repeaterValue: [],
      repeaterMetaValue: []
    };
  },

  created() {
    this.setDefaultValues();
  },

  computed: {
    repeaterCount() {
      return this.repeaterValue.filter(item => !item._delete).length;
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
    /**
     * Sets the default values of Repeater fields.
     * Ensures the minimum repeater required fields.
     */
    setDefaultValues() {
      let min = this.config.repeater.min || 1;
      let defalutValueCount = this.value.length;
      let diff = min - defalutValueCount;
      this.repeaterValue = [...this.value];
      this.repeaterMetaValue = [...this.value];

      // If the diffrence of minimum required fields and default values is greater than 0
      // Need to push the blank values in repeater values to show minimum required fields
      if (diff > 0) {
        for (var i = 0; i < diff; i++) {
          this.repeaterValue.push({ value: null });
          this.repeaterMetaValue.push({ value: null });
        }
      }

      this.$emit("input", this.repeaterValue, [
        {
          field: this.name,
          action: "repeater-default-value",
          value: this.repeaterValue,
          metaValue: this.repeaterMetaValue
        }
      ]);
    },

    //Ignores $delete:true items
    indexWithoutDeleted(index) {
      if (index == null) return null;

      let newIndex = index + 0;
      for (var i = 0; i < index; i++) {
        if (this.repeaterValue[i] && this.repeaterValue[i]._delete === true) {
          newIndex--;
        }
      }
      return newIndex;
    },

    repeat() {
      if (this.canRepeat) {
        // This adds an object with null values
        let index = this.repeaterValue.length;
        this.$set(this.repeaterValue, index, {
          value: null
        });

        this.$emit("input", this.repeaterValue, [
          {
            field: this.name,
            value: this.repeaterValue,
            metaValue: this.repeaterMetaValue,
            action: "repeater-add",
            index: this.indexWithoutDeleted(index)
          }
        ]);
      }
    },

    removeRepeat(index) {
      //If the `id` is existing in repeater item, it is saved on server
      //We need to keep it and set $delete:true to let api know to remove item.
      if (this.repeaterValue[index]._id) {
        this.$set(this.repeaterValue, index, {
          ...this.repeaterValue[index],
          _delete: true
        });
      } else {
        this.repeaterValue.splice(index, 1);
      }

      this.$emit("input", this.repeaterValue, [
        {
          field: this.name,
          value: this.repeaterValue,
          action: "repeater-remove",
          metaValue: this.repeaterMetaValue,
          index: this.indexWithoutDeleted(index)
        }
      ]);
    },

    /**
     * On the input of child fields, merges the values in local values and emits the merged value.
     * @param {Array} args Contains 2 values. 1st is original value, 2nd is metaValue
     * @param {String,Object,Array} args[0] The field value
     * @param {Array} args[1] The array of changed fields and its values.
     */
    input(args, index) {
      let value = args[0];
      let changed = [...args[1]];

      // Merging the original value
      this.$set(this.repeaterValue, index, {
        value: args[0]
      });

      // Merging the meta value
      this.$set(this.repeaterMetaValue, index, {
        value: changed[changed.length - 1].metaValue
      });

      changed.push({
        field: this.name,
        action: "repeater-input",
        value: this.repeaterValue,
        metaValue: this.repeaterMetaValue,
        index: index
      });

      this.$emit("input", this.repeaterValue, changed);
    },

    /**
     * When the configuration of the repeater child is updated and no index is provided,
     * The configuration should apply to all existing and upcoming repeater fields.
     * @param {Obj} args
     * @param {String} args.field Which field's config to update
     * @param {String} args.key Option to update
     * @param {String} args.value Option's value to set
     */
    setConfig({ key, value, field }) {
      //If field is defined, the request came from form-group and hence merge it with fields.
      if (field) {
        let fields = {
          ...this.config.fields,
          [field]: {
            ...this.config.fields[field],
            [key]: value
          }
        };
        this.$set(this.localConfig, "fields", fields);
      } else {
        this.$set(this.localConfig, key, value);
      }
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
    align-items: center;
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
  }
}
</style>
