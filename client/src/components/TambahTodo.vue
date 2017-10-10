<template lang="html">
  <div class="container">
    <div class="">
      <button type="button" name="button" v-on:click="openForm" v-show="!isCreating" class="glyphicon glyphicon-pencil btn btn-success"> Tambah TodoList</button>
    </div>

    <div class="row">
      <div class="panel panel-primary  tambahTodoStyle" v-show="isCreating">
        <!-- <div class="panel-heading"> -->
          <label>Title</label>
          <input type="text" v-model="title" class="form-control">
        <!-- </div> -->
        <div class="panel-content">
          <label>Content</label>
          <input type="text" v-model="content" class="form-control">
        </div><br>
        <div>
          <button class="btn btn-success" type="button" name="button" v-on:click="sendForm()">
            Create
          </button>
          <button class="btn btn-danger" type="button" name="button" v-on:click="closeForm">
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      content: '',
      isCreating: false
    }
  },
  methods: {
    openForm () {
      console.log('haloooo -----<')
      this.isCreating = true
    },
    closeForm () {
      this.isCreating = false
    },
    sendForm () {
      if (this.title.length > 0 && this.content.length > 0) {
        const title = this.title
        const content = this.content
        this.$emit('create-todo', {
          title,
          content,
          done: false
        })
        this.title = ''
        this.content = ''
        this.isCreating = false
      }
    }
  }
}
</script>

<style lang="css">
.panel.panel-primary.tambahTodoStyle {
    padding: 10px;
}
</style>
