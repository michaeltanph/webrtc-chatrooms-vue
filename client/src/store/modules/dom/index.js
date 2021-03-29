//import ApiService from "@/common/api.service";

const state = {
  windowWidthValue: 0,
  windowWidthXS: 320,
  windowWidthS: 640,
  windowWidthL: 1024
};

const getters = {
  
};

const actions = {
  
};

const mutations = {
  SET_WINDOW_WIDTH (state, value) {
    state.windowWidth = value
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};