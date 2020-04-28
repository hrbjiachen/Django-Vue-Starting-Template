<template>
  <v-app>
    <router-view />
    <v-snackbar v-model="show" top :color="color" :timeout="timeout">
      {{ message }}
      <v-btn @click="snackbar = false" text>
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      timeout: 2000
    };
  },
  created() {
    this.$store.dispatch("loadNotes");
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
  }
};
</script>
