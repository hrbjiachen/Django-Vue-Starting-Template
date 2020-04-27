<template>
  <div id="app">
    <form v-on:submit.prevent="submitNote">
      <div>
        <label>Title1</label>
        <input type="text" v-model="formData.title" />
        <label>Content</label>
        <textarea type="text" v-model="formData.content"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>

    <div>
      <table>
        <thead>
          <td>Title</td>
          <td>Content</td>
          <td>Created</td>
          <td>Action</td>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note.id">
            <td>{{ note.title }}</td>
            <td>{{ note.content }}</td>
            <td>{{ note.created }}</td>
            <td>
              <button @click="deleteNote(note.id)">delete</button>
            </td>
          </tr>
        </tbody>
        <tbody></tbody>
      </table>
    </div>
    <hr />
    <div>{{ message }}</div>
  </div>
</template>

<script>
import api from "../api/index";

export default {
  name: "Home",
  data() {
    return {
      formData: {
        title: "",
        content: ""
      },
      notes: [],
      message: ""
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    submitNote() {
      this.handlePromise(api.addNote, [this.formData]);
    },
    deleteNote(id) {
      this.handlePromise(api.deleteNote, [id]);
    },
    async handlePromise(func, params) {
      const response = await func(...params).catch(err => {
        this.message = err.response.data;
      });
      this.message = response.data;
      this.fetchNotes();
    },
    async fetchNotes() {
      const response = await api.fetchNotes();
      this.notes = response.data;
    }
  }
};
</script>
