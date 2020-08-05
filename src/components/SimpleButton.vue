<template>
  <div class="button" :style="styles" @click="clickEvent()">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'SimpleButton',
  props: {
    type: {
      type: String,
      default: 'common',
      validator: (value) => {
        return ['common', 'success', 'error'].indexOf(value) !== -1;
      },
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    }
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
        backgroundColor: this.backgroundColor,
      };
    },
    backgroundColor() {
      switch(this.type) {
        case 'common':
          return '#0a75ed';
        case 'success':
          return '#46bd87';
        case 'error':
          return '#da1f26';
        default:
          return '#0a75ed';
      }
    },
  },
  methods: {
    clickEvent() {
      this.$emit('click');
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  border-radius: 8px;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>
