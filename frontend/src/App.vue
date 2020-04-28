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
    if (this.$store.getters.isAuthenticated && !this.$store.state.user) {
      this.$store.dispatch("RE_AUTH");
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
        this.$store.commit("SHOW_SNACKBAR", value);
      }
    }
  }
};
</script>
