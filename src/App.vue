<template>
  <div id="app">
    <section class="main-section">
      <UserEditor />
    </section>
  </div>
</template>

<script>
import UserEditor from './components/UserEditor.vue'

export default {
  name: 'App',
  components: {
    UserEditor
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-text-color;
  margin-top: 60px;
  font-size: 1.3rem;
  .main-section {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
