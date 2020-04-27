<template>
  <div>
    <div>ID: {{note.id}}</div>
    <div>Title: {{note.title}}</div>
    <div>Content: {{note.content}}</div>
  </div>
</template>

<script>
export default {
  name: "Detail",
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
</style>