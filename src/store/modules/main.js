const state = {
  users: [],
};

const getters = {};

const mutations = {
  SET_USERS(state, payload) {
    state.users = [...payload];
  },
  ADD_USER(state, payload) {
    state.users.push(payload);
  },
  UPDATE_USER(state, payload) {
    const userIndex = state.users.findIndex((item) => item.username === payload.username);
    state.users[userIndex].firstName = payload.firstName;
    state.users[userIndex].lastName = payload.lastName;
  },
};

const actions = {
  isUsernameExist({ state }, username) {
    return state.users.find((item) => item.username === username);
  },
  async addNewUser({ commit, dispatch }, payload) {
    const isUsernameExist = await dispatch('isUsernameExist', payload.username);
    if (!isUsernameExist) {
      commit('ADD_USER', payload);
      return 'success';
    } else {
      return 'error';
    }
  },
  updateUser({ commit }, payload) {
    commit('UPDATE_USER', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
