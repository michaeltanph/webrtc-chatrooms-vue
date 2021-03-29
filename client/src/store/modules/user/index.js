//import ApiService from "@/common/api.service";

const state = {
  username: ''
};

const getters = {
  
};

const actions = {
  logIn({commit}, username){
    commit('SET_USERNAME', username);
  }
};

const mutations = {
  SET_USERNAME(state, value){
    state.username = value;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};