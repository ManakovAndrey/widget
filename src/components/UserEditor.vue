<template>
  <div class="user-editor" :style="styles">
    <div class="user-editor__title">
      User Editor:
    </div>
    <UserForm class="user-editor__new-user-form"/>
    <UsersList :users="users" />
  </div>
</template>

<script>
import UserForm from '@/components/UserForm';
import UsersList from '@/components/UsersList';
import { mapState } from 'vuex';

export default {
  name: 'UserEditor',
  components: {
    UserForm,
    UsersList,
  },
  props: {
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
    ...mapState({
      users: state => state.main.users,
    }),
    styles() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.user-editor {
  border: 1px solid $grey;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  &__title {
    margin-bottom: 15px;
    text-align: left;
  }
  &__new-user-form {
    margin-bottom: 20px;
  }
}
</style>
