<template>
  <div class="text-input">
    <input
      v-model="inputValue"
      v-bind="$attrs"
      type="text"
      class="text-input__field"
      name="name"
      autocomplete="off"
      required
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

.text-input {
  position: relative;
  width: 100%;
  &__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid $grey;
    outline: 0;
    font-size: 1.3rem;
    color: $main-text-color;
    padding: 3px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }
  }
  &__field:focus {
    border-image: linear-gradient(to right, $orange,#e2897a);
    border-image-slice: 1;
  }
  &__field{
    &:required,&:invalid { box-shadow:none; }
  }
}


</style>
