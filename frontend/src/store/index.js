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
    token: localStorage.getItem("user-token") || "",
    status: "",
    user: null
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    SET_NOTES: (state, notes) => {
      state.notes = notes;
    },
    SET_SNACKBAR: (state, snackbar) => {
      state.snackbar = snackbar;
    },
    SHOW_SNACKBAR: (state, show) => {
      state.snackbar.show = show;
    },
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, data) => {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    AUTH_ERROR: state => {
      state.status = "error";
    },
    AUTH_LOGOUT: state => {
      state.status = "";
      state.token = "";
      state.user = null;
      state.notes = [];
    }
  },
  actions: {
    LOAD_NOTES: async ({ commit, state }) => {
      try {
        const response = await api.fetchNotes(state.token);
        commit("SET_NOTES", response.data);
      } catch (error) {
        commit("SET_NOTES", []);
      }
    },
    SHOW_MESSAGE: ({ commit }, snackbar) => {
      commit("SET_SNACKBAR", snackbar);
    },
    AUTH_LOGOUT: ({ commit, state }) => {
      return new Promise(async (resolve, reject) => {
        await api.logout(state.token);
        commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token");
        resolve();
      });
    },
    AUTH_REQUEST: ({ commit }, data) => {
      return new Promise(async (resolve, reject) => {
        commit("AUTH_REQUEST");
        try {
          const response = await api.login(data);
          localStorage.setItem("user-token", response.data.token);
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        } catch (error) {
          commit("AUTH_ERROR", error);
          localStorage.removeItem("user-token");
          reject(error);
        }
      });
    },
    RE_AUTH: ({ commit, state }) => {
      return new Promise(async (resolve, reject) => {
        commit("AUTH_REQUEST");
        try {
          const response = await api.getUser(state.token);
          const data = { user: response.data, token: state.token };
          commit("AUTH_SUCCESS", data);
          resolve(data);
        } catch (error) {
          commit("AUTH_ERROR", error);
          localStorage.removeItem("user-token");
          reject(error);
        }
      });
    }
  },
  modules: {}
});
