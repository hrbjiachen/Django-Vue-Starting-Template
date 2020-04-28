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
    },
    token: "",
    user: null
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
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    loadNotes: async ({ commit }) => {
      const response = await api.fetchNotes();
      commit("SET_NOTES", response.data);
    },
    showMessage: ({ commit }, snackbar) => {
      commit("SET_SNACKBAR", snackbar);
    },
    login: ({ commit }, data) => {
      const { user, token } = data;
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
    },
    logout: async ({ commit, state }) => {
      await api.logout(state.token);
      commit("SET_TOKEN", "");
      commit("SET_USER", null);
    }
  },
  modules: {}
});
