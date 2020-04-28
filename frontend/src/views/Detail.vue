<template>
  <Layout>
    <v-container>
      <v-card class="mx-auto" color="blue lighten-1" dark max-width="400">
        <v-card-title>
          <v-icon large left>
            mdi-message-text
          </v-icon>
          <span class="title font-weight-bold"> {{ note.title }}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-light">
          {{ note.content }}
        </v-card-text>
      </v-card>
    </v-container>
  </Layout>
</template>

<script>
import Layout from "./Layout";
export default {
  name: "Detail",
  components: {
    Layout
  },
  computed: {
    note() {
      return (
        this.$store.state.notes.find(e => e.id == this.$route.params.id) || {}
      );
    }
  }
};
</script>

<style scoped>
div.v-card {
  margin-top: 10%;
}
</style>
