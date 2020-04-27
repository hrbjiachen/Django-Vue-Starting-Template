<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span><router-link to="/">Django-Vue Template</router-link></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2"><router-link to="/Login">Login</router-link></span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div class="myContainer">
        <slot></slot>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}

div.myContainer {
  margin: 5px;
  min-height: 45em;
  background-color: #fafafa !important;
}
</style>
