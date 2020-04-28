<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">Django-Vue Template</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <span v-if="auth">
        <span>Hello, {{user.username}}!</span>
        <v-btn class="mx-2 red--text" text @click="dialog=true">Logout</v-btn>
      </span>
      <v-btn v-else text>
        <span class="mr-2">
          <router-link to="/Login">Login</router-link>
        </span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <slot></slot>
    </v-content>

    <v-footer dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Do you want to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" text @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user || {}
    }),
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("AUTH_LOGOUT");
      this.dialog = false;
    }
  }
};
</script>


<style scoped>
.v-application a {
  text-decoration: none;
}
</style>
