/* eslint-disable no-undef */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
import Vuex from 'vuex'
// import sinon from 'sinon'

import UserForm from '@/components/UserForm.vue'
import SimpleButton from '@/components/SimpleButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component', () => {
  let actions
  let store

  const checkErrors = (wrapper, usernameError, firstnameError, lastNameError) => {
    const errors = wrapper.findAll('.input__error');
    return (
      usernameError === errors.at(0).text() &&
      firstnameError === errors.at(1).text() &&
      lastNameError === errors.at(2).text()
    )
  }

  const setValues = (wrapper, username, firstname, lastName, componentType = 'add') => {
    const inputs = wrapper.findAll('.text-input__field');
    if (componentType === 'add') {
      inputs.at(0).setValue(username);
      inputs.at(1).setValue(firstname);
      inputs.at(2).setValue(lastName);
    } else {
      inputs.at(0).setValue(firstname);
      inputs.at(1).setValue(lastName);
    }
  }

  const clickSubmit = async (wrapper) => {
    const button = wrapper.findComponent(SimpleButton);
    return await button.trigger('click');
  }

  beforeEach(() => {
    actions = {
      addNewUser: jest.fn(),
      updateUser: jest.fn(),
    }
    store = new Vuex.Store({
      modules: {
        main: {
          namespaced: true,
          actions
        }
      }
    })
  })
  test('submit button is in user form', () => {
    const wrapper = shallowMount(UserForm);
    const button = wrapper.findComponent(SimpleButton);
    expect(button.exists()).toBe(true);
  })
  test('deafault type have to be "add"', () => {
    const wrapper = shallowMount(UserForm);
    expect(wrapper.props().type).toBe('add');
  })
  test('The sumbit button text must match the type prop', () => {
    const wrapper = shallowMount(UserForm);
    const button = wrapper.findComponent(SimpleButton);
    expect(button.text()).toBe(wrapper.props().type);

    const wrapperEdit = shallowMount(UserForm, {
      propsData: {
        type: 'edit',
      }
    });
    const buttonEdit = wrapperEdit.findComponent(SimpleButton);
    expect(buttonEdit.text()).toBe(wrapperEdit.props().type);
  })
  test('fields validation is working', async () => {
    const wrapper = mount(UserForm, { store, localVue });

    await clickSubmit(wrapper);
    expect(checkErrors(wrapper, 'should be between 4-5 simbols!', `shouldn't be empty!`, `shouldn't be empty!`)).toBe(true);

    setValues(wrapper, 'testMore', 'firstName', 'lastName');
    await clickSubmit(wrapper);
    expect(checkErrors(wrapper, 'should be between 4-5 simbols!', ``, ``)).toBe(true);

    setValues(wrapper, 'test', '', 'lastName');
    await clickSubmit(wrapper);
    expect(checkErrors(wrapper, '', `shouldn't be empty!`, ``)).toBe(true);

    setValues(wrapper, 'test1', 'firstName', '');
    await clickSubmit(wrapper);
    expect(checkErrors(wrapper, '', ``, `shouldn't be empty!`)).toBe(true);

    expect(actions.addNewUser).not.toHaveBeenCalled();
    expect(actions.updateUser).not.toHaveBeenCalled();
  })
  test('when all fields is valid and type is "add" must invoke addNewUser action', async () => {
    const wrapper = mount(UserForm, { store, localVue });
    setValues(wrapper, 'test', 'firstName', 'lastName');
    await clickSubmit(wrapper);
    expect(actions.addNewUser).toHaveBeenCalled()
  })
  test('when all fields is valid and type is "edit" must invoke updateUser action', async () => {
    const wrapper = mount(UserForm, {
      store,
      localVue,
      propsData: {
        type: 'edit',
        username: 'test',
        firstName: 'firstName',
        lastName: 'lastName'
      } 
    });
    await clickSubmit(wrapper);
    expect(actions.updateUser).toHaveBeenCalled()
  })
})