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
      <table id="list">
        <thead>
          <td>Title</td>
          <td>Content</td>
          <td>Created</td>
          <td>Action</td>
        </thead>
        <tbody>
          <tr v-for="note in notes" :key="note.id">
            <router-link :to="{name:'Detail', params: {id:note.id}}">
              <td>{{ note.title }}</td>
            </router-link>
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
table#list {
  width: 60%;
  table-layout: auto;
}
</style>
