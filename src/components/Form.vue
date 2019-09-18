<template>
  <div class="v-form">
    <!-- Form Start Slot -->
    <slot name="form--start" :value="value" />

    <!-- Group -->
    <!--  By default the first interface will always be a group of fields. -->
    <group key="v-form" :name="name" :config="config" :value="value" @input="input(arguments)">
      <!-- Passdown Slots -->
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </group>

    <!-- Form End Slot -->
    <slot name="form--end" :value="value" />
  </div>
</template>

<script>
export default {
  name: "v-form",
  props: {
    settings: {
      type: Object
    },
    adapters: {
      type: Object
    },
    fields: {
      type: Object
    },
    metaValue: {
      type: Object
    },
    value: {
      type: Object
    }
  },

  data() {
    return {
      name: "v-form",
      config: {
        fields: this.fields
      }
    };
  },

  provide() {
    return {
      SETTINGS: this.settings,
      ADAPTERS: this.adapters
    };
  },

  methods: {
    /**
     * Emits the final value
     * @param {Array} args
     * @param {Object} args[0] Contains all the fields and values.
     * @param {Array} args[1] The array of changed fields and its values.
     */
    input(args) {
      let value = args[0];
      let changed = [...args[1]]; //Cloning an array to remove reference;
      let metaValue = changed[changed.length - 1].metaValue;

      this.$emit("input", value);
      this.$emit("update:meta-value", metaValue);

      // If value is not set by the setValue function, emit the change event
      // This check will avoid infinite iteration on change and set-value
      let actions = changed.map(item => item.action);
      let emit = !actions.some(item => {
        return [
          "set-value",
          "repeater-default-value",
          "group-default-value"
        ].includes(item);
      });

      if (emit) this.$emit("change", changed);
    },

    /**
     * Both the methods emits the event at root level.
     * The field has a listner to find the required field and apply changes.
     */
    setConfig(data) {
      this.$root.$emit("v-form::set-config", data);
    },
    setValue(data) {
      this.$root.$emit("v-form::set-value", data);
    }
  }
};
</script>

<style lang="scss">
</style>


