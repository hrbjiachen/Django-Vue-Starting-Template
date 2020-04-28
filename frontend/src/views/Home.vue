<template>
  <Layout>
    <div class="d-flex flex-wrap">
      <v-card class="mx-auto mt-8 mr-4 pa-10 align-self-start" outlined>
        <div class="display-1">Add Note to test RESTful APIs</div>
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
          <v-btn color="primary" type="submit">submit</v-btn>
        </form>
      </v-card>

      <v-card class="mx-auto mt-8 pa-10" outlined>
        <div class="display-1">Note List</div>
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
      </v-card>
    </div>
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
      }
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    submitNote() {
      this.handlePromise(
        api.addNote,
        [this.formData],
        "Note added succesfully!"
      );
      this.formData = {
        title: "",
        content: ""
      };
    },
    deleteNote(id) {
      this.handlePromise(api.deleteNote, [id], "Note deleted succesfully!");
    },
    async handlePromise(func, params, successMsg) {
      try {
        const response = await func(...params);
        this.$store.dispatch("showMessage", {
          show: true,
          color: "success",
          message: successMsg
        });
        this.$store.dispatch("loadNotes");
      } catch (error) {
        this.$store.dispatch("showMessage", {
          show: true,
          color: "error",
          message: error.response.data
        });
      }
    }
  }
};
</script>

<style scoped>
div.v-card:first-child {
  flex: 1;
}

div.v-card:nth-child(2) {
  flex: 2;
}
</style>
