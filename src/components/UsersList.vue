<template>
  <div class="user-list" :style="styles">
    <div class="user-list__title">
      Users list:
    </div>
    <div class="user-list__search search">
      <div class="search__lable">Search: </div>
      <TextInput v-model="searchString" />
    </div>
    <div class="user-list__items items">
      <div class="items__item item" v-for="user in filteredUsers" :key="user.username">
        <div class="item__field field">username: <span class="field__value">{{ user.username }}</span></div>
        <div class="item__field field">first name: <span class="field__value">{{ user.firstName }}</span></div>
        <div class="item__field field">last name: <span class="field__value">{{ user.lastName }}</span></div>
        <div class="item__button">
          <SimpleButton width="100px" @click="showEditor(user.username)" >{{ getButtonText(user.username) }}</SimpleButton>
        </div>
        <UserForm
          class="item__form"
          v-if="edittingUsername === user.username"
          type="edit"
          :username="user.username"
          :firstName="user.firstName"
          :lastName="user.lastName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm';
import SimpleButton from './SimpleButton';
import TextInput from './TextInput';

export default {
  name: 'UsersList',
  components: {
    UserForm,
    SimpleButton,
    TextInput,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      edittingUsername: '',
      searchString: '',
    }
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    filteredUsers() {
      if (this.searchString === '') {
        return this.users;
      }
      return this.users.filter(item => {
        return (
          item.username.includes(this.searchString) ||
          item.firstName.includes(this.searchString) ||
          item.lastName.includes(this.searchString)
        );
      })
    }
  },
  methods: {
    showEditor(username) {
      if (this.edittingUsername === username) {
        this.edittingUsername = '';
      } else {
        this.edittingUsername = username;
      }
    },
    getButtonText(username) {
      if (this.edittingUsername === username) {
        return 'close';
      } else {
        return 'edit';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  border: 1px solid $orange;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  max-height: 550px;
  overflow: auto;
  &__title {
    margin-bottom: 15px;
  }
  &__search {
    display: flex;
    padding: 10px;
    .search__lable {
      padding-right: 10px;
      margin-top: 3px;
    }
  }
  .items {
    &__item {
      margin-bottom: 10px;
    }
    .item {
      border: 1px solid $grey;
      border-radius: 10px;
      padding: 10px;
      &__field {
        text-align: left;
        .field__value {
          font-weight: bold;
        }
      }
      &__button {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
      &__form {
        margin-top: 10px;
      }
    }
  }
}
</style>
