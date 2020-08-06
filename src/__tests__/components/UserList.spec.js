/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
// import sinon from 'sinon'

import UsersList from '@/components/UsersList.vue'
import UserForm from '@/components/UserForm.vue'
import SimpleButton from '@/components/SimpleButton.vue'


describe('Component', () => {

  // const clickSubmit = async (wrapper) => {
  //   const button = wrapper.findComponent(SimpleButton);
  //   return await button.trigger('click');
  // }
  const checkSearch = async (searchInput, wrapper, searchString, expectedUsersLength) => {
    searchInput.setValue(searchString);
    await flushPromises()
    const usersItems = wrapper.findAll('.items__item');
    expect(usersItems.length).toBe(expectedUsersLength);
  }
  const usersArray = [
    {
      username: 'test',
      firstName: 'firstName',
      lastName: 'lastName'
    },
    {
      username: 'test1',
      firstName: 'Boby',
      lastName: 'lastName'
    },
    {
      username: 'test2',
      firstName: 'Boby',
      lastName: 'lastName'
    },
  ]

  test('list must show users', () => {
    const wrapper = mount(UsersList, {
      propsData: {
        users: usersArray
      }
    });
    const usersItems = wrapper.findAll('.items__item');

    expect(usersItems.length).toBe(usersArray.length);
  })
  test('filter is working', async () => {
    const wrapper = mount(UsersList, {
      propsData: {
        users: usersArray
      }
    });

    const searchInput = wrapper.find('.text-input__field');

    await checkSearch(searchInput, wrapper, '1', 1);
    await checkSearch(searchInput, wrapper, '2', 1);
    await checkSearch(searchInput, wrapper, 'Boby', 2);
    await checkSearch(searchInput, wrapper, '', 3);
    await checkSearch(searchInput, wrapper, 'unexpected', 0);
  })
  test('form to edit user must uppear when edit button clicked', async () => {
    const wrapper = mount(UsersList, {
      propsData: {
        users: usersArray
      }
    });
    const button = wrapper.findComponent(SimpleButton);
    await button.trigger('click');
    await flushPromises()

    const editForm = wrapper.findComponent(UserForm);
    expect(editForm.exists()).toBe(true);
    expect(editForm.props().type).toBe('edit');
  })
})