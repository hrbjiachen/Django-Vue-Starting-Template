import Vue from "vue";
import Vuex from "vuex";
import api from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    loadNotes: async ({ commit }) => {
      const response = await api.fetchNotes();
      commit("SET_NOTES", response.data);
    }
  },
  modules: {}
});
