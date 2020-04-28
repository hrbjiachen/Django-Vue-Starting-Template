<template>
  <v-app>
    <router-view />
    <v-snackbar v-model="show" bottom :color="color" :timeout="timeout">
      {{ message }}
      <v-btn @click="snackbar = false" text>Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import api from "./api/index";

export default {
  name: "app",
  data() {
    return {
      timeout: 2000
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token !== "undefined" && token) {
      this.verifyToken(token);
    }
  },
  computed: {
    ...mapState({
      color: state => state.snackbar.color,
      message: state => state.snackbar.message
    }),
    show: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set(value) {
        this.$store.commit("updateSnackbarStatus", value);
      }
    }
  },
  methods: {
    async verifyToken(token) {
      try {
        const response = await api.getUser(token);
        this.$store.dispatch("login", { user: response.data, token });
        if (this.$router.currentRoute.path != "/") {
          this.$router.push("/");
        }
      } catch (error) {
        // no valid session
      }
    }
  }
};
</script>
