<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">Django-Vue Template</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2"><router-link to="/Login">Login</router-link></span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <slot></slot>
    </v-content>

    <v-footer dark>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>
