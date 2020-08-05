<template>
  <div class="user-form" :style="styles">
    <div class="user-form__title">{{ titleText }}</div>
    <div class="user-form__inputs">
      <div class="input" v-if="showUsername">
        <div class="input__lable">
          username:
        </div>
        <TextInput v-model="fields.username" @input="clearError('username')" class="input__field" />
        <div class="input__error">{{ errors.username }}</div>
      </div>
      <div class="input">
        <div class="input__lable">
          first name:
        </div>
        <TextInput v-model="fields.firstName" @input="clearError('firstName')" class="input__field" />
        <div class="input__error">{{ errors.firstName }}</div>
      </div>
      <div class="input">
        <div class="input__lable">
          last name:
        </div>
        <TextInput v-model="fields.lastName" @input="clearError('lastName')" class="input__field" />
        <div class="input__error">{{ errors.lastName }}</div>
      </div>
    </div>
    <div class="user-form__submit">
      <SimpleButton type="success" width="100px" @click="submitAction()" >{{ buttonText }}</SimpleButton>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput';
import SimpleButton from './SimpleButton';
import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../assets/consts.js'
import { mapActions } from 'vuex';

export default {
  name: 'UserForm',
  components: {
    TextInput,
    SimpleButton,
  },
  props: {
    type: {
      type: String,
      default: 'add',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
    username: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fields: {
        username: '',
        firstName: '',
        lastName: '',
      },
      errors: {
        username: '',
        firstName: '',
        lastName: '',
      }
    };
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    buttonText() {
      return this.type === 'add' ? 'add' : 'edit';
    },
    showUsername() {
      return this.type === 'add';
    },
    titleText() {
      return this.type === 'add' ? 'Add new user' : `Edit user's info`;
    },
    firstNameValid() {
      return this.fields.firstName !== '';
    },
    lastNameValid() {
      return this.fields.lastName !== '';
    },
    usernameValid() {
      const usernameLength = this.fields.username.length;
      return usernameLength >= MIN_USERNAME_LENGTH && usernameLength <= MAX_USERNAME_LENGTH;
    },
    allFieldsValid() {
      return (
        this.firstNameValid &&
        this.lastNameValid &&
        this.usernameValid
      )
    },
  },
  methods: {
    ...mapActions('main', [
      'addNewUser',
      'updateUser',
    ]),
    async submitAction() {
      if (this.allFieldsValid) {
        if (this.type === 'add') {
          const res = await this.addNewUser({
            username: this.fields.username,
            firstName: this.fields.firstName,
            lastName: this.fields.lastName,
          });
          if (res === 'error') {
            this.errors.username = 'username is already exist!'
          }
        } else {
          this.updateUser({
            username: this.fields.username,
            firstName: this.fields.firstName,
            lastName: this.fields.lastName,
          });
        }
      } else {
        this.checkValidation();
      }
      
    },
    clearError(errorFieldName) {
      this.errors[errorFieldName] = '';
    },
    checkValidation() {
      if (!this.firstNameValid) {
        this.errors.firstName = `shouldn't be empty!`
      }
      if (!this.lastNameValid) {
        this.errors.lastName = `shouldn't be empty!`
      }
      if (!this.usernameValid) {
        this.errors.username = `should be between 4-5 simbols!`
      }
    },
  },
  mounted() {
    this.fields.username = this.username;
    this.fields.firstName = this.firstName;
    this.fields.lastName = this.lastName;
  },
}
</script>

<style lang="scss" scoped>
.user-form {
  border: 1px solid $green;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  &__title {
    text-align: center;
    margin-bottom: 15px;
  }
  &__inputs {
    .input {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 25px;
      position: relative;
      &__lable {
        margin-top: 3px;
        margin-right: 5px;
      }
      &__field {
        max-width: 190px;
      }
      &__error {
        position: absolute;
        left: 0;
        top: 100%;
        color: $red;
      }
    }
  }
  &__submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
