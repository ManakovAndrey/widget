/* eslint-disable no-undef */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppComponent from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component', () => {
  let state
  let store

  beforeEach(() => {
    state = {
      main: {
        users: []
      }
    }
    store = new Vuex.Store({
      state
    })
  })
  test('main app is a Vue instance', () => {
    const wrapper = mount(AppComponent, { store, localVue })
    expect(wrapper.vm).toBeTruthy()
  })
})