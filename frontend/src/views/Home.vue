<template>
  <Layout>
    <v-card class="mx-auto" outlined>
      <div class="form">
        <h2>Add Note to test RESTful APIs</h2>
        <form v-on:submit.prevent="submitNote">
          <v-text-field
            v-model="formData.title"
            :counter="20"
            label="Title"
            required
          ></v-text-field>
          <v-textarea
            v-model="formData.content"
            label="Content"
            hint="Content"
          ></v-textarea>
          <v-btn class="mr-4" type="submit">submit</v-btn>
        </form>
      </div>
    </v-card>

    <v-card class="mx-auto" outlined>
      <div class="list">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <td>Title</td>
              <td>Content</td>
              <td>Action</td>
            </thead>
            <tbody>
              <tr v-for="note in notes" :key="note.id">
                <router-link :to="{ name: 'Detail', params: { id: note.id } }">
                  <td>{{ note.title }}</td>
                </router-link>
                <td>{{ note.created }}</td>
                <td>
                  <v-btn color="error" @click="deleteNote(note.id)"
                    >delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
            <tbody></tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>

    <hr />
    <div>{{ message }}</div>
  </Layout>
</template>

<script>
import api from "../api/index";
import Layout from "./Layout";

export default {
  name: "Home",
  components: {
    Layout
  },
  data() {
    return {
      formData: {
        title: "",
        content: ""
      },
      message: ""
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    submitNote() {
      this.handlePromise(api.addNote, [this.formData]);
      this.formData = {
        title: "",
        content: ""
      };
    },
    deleteNote(id) {
      this.handlePromise(api.deleteNote, [id]);
    },
    async handlePromise(func, params) {
      const response = await func(...params).catch(err => {
        this.message = err.response.data;
      });
      this.message = response.data;
      this.$store.dispatch("loadNotes");
    }
  }
};
</script>

<style scoped>
div.form,
div.list {
  padding: 40px;
  margin: auto;
}

div.v-card {
  margin-bottom: 10px;
}
</style>
