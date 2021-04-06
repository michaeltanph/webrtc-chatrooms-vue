//import ApiService from "@/common/api.service";
import router from "@/router"

const state = {
  roomName: '',
  roomTitle: '',
};

const getters = {
  
};

const actions = {
  createRoom({commit}, title){
    commit('SET_ROOM_TITLE', title);
    router.push('/room')
  },
  clearRoomTitle({commit}){
    commit('SET_ROOM_TITLE', '')
  },
  joinRoom({commit}, {name, title, url}){
    commit('SET_ROOM_NAME', name)
    commit('SET_ROOM_TITLE', title)
    router.push(url)
  }
};

const mutations = {
  SET_ROOM_NAME(state, value){
    state.roomName = value;
  },
  SET_ROOM_TITLE(state, value){
    state.roomTitle = value;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};