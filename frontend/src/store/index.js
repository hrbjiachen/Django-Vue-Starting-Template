import Vue from "vue";
import Vuex from "vuex";
import api from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    snackbar: {
      show: false,
      color: "",
      message: ""
    }
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },
    updateSnackbarStatus(state, show) {
      state.snackbar.show = show;
    }
  },
  actions: {
    loadNotes: async ({ commit }) => {
      const response = await api.fetchNotes();
      commit("SET_NOTES", response.data);
    },
    showMessage: ({ commit }, snackbar) => {
      commit("SET_SNACKBAR", snackbar);
    }
  },
  modules: {}
});
