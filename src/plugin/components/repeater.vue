<template lang="pug">
.field.repeater

  label.repeater__label {{name | titleCase}}

  .repeater__items
    .repeater__item(v-for="(item,i) in repeaterValue" v-show="item && !item._delete")
      .repeater__input
        
        //Field
        component(
          :is="componentType(mergedConfig)"
          :index="indexWithoutDeleted(i)"
          :config="mergedConfig"
          :name="name" 
          :key="`${name}--${i}`"
          :value="repeaterValue[i] && repeaterValue[i].value"
          @input="input(arguments,{index:i})")

          //Passdown Slots
          template(v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope")
            slot(:name="slot" v-bind="scope")

      //Remove Repeater
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
  mixins: [
    require("@/plugin/helper").default,
    require("@/plugin/mixins/fields").default
  ],
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
    setDefaultValues() {
      let min = this.config.repeater.min || 1;
      let defalutValueCount = this.value.length;
      let diff = min - defalutValueCount;

      if (diff > 0) {
        let diffArray = new Array(diff);
        let defaultValue = [...this.value, ...diffArray];
        this.$set(this, "repeaterValue", defaultValue);
        this.$set(this, "repeaterMetaValue", defaultValue);
      } else {
        let defaultValue = [...this.value];
        this.$set(this, "repeaterValue", defaultValue);
        this.$set(this, "repeaterMetaValue", defaultValue);
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
        // To make sure that every fields added in DOM has respective key.
        let defaultValues = null;
        if (this.config.fields) {
          defaultValues = this.defaultValues(this.config.fields);
        }
        let index = this.repeaterValue.length;
        this.$set(this.repeaterValue, index, {
          value: defaultValues
        });

        this.$emit("input", this.repeaterValue, [
          {
            field: this.name,
            value: this.repeaterValue,
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
          index: this.indexWithoutDeleted(index)
        }
      ]);
    },

    input(args, { index }) {
      var changeMerged;
      console.log("==>>", JSON.stringify(this.repeaterValue));
      this.$set(this.repeaterValue, index, {
        value: args[0]
      });
      console.log("==>>", JSON.stringify(this.repeaterValue));

      this.$set(this.repeaterMetaValue, index, {
        value: args[1][args[1].length - 1].metaValue
      });

      let changed = {
        field: this.name,
        action: "repeater-input",
        value: this.repeaterValue,
        metaValue: this.repeaterMetaValue,
        index: index
      };
      changeMerged = [...args[1], changed];

      this.$emit("input", this.repeaterValue, changeMerged);
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
