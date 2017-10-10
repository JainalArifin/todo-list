<template lang="html">
  <div class="container">
    <div class="row text-center">
      <h2>Completed Tasks: {{todosData.filter(todo => {return todo.done === true}).length}}</h2>
      <h2>Pending Tasks: {{todosData.filter(todo => {return todo.done === false}).length}}</h2>
    </div>
    <Todo v-on:delete-todo="deleteTodo"  v-on:completed="completeTodo(todo, index)" v-for="todo in todosData" v-bind:todoAnak="todo" :todoAnak.sync="todo"></Todo>
  </div>
</template>

<script>
import sweetalert from 'sweetalert'
import Todo from './Todo'
export default {
  props: ['todosData'],
  components: {
    Todo
  },
  methods: {
    deleteTodo (todo) {
      // console.log(todo._id, ' <-------')
      this.$http.delete(`/todo/${todo._id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log(response.data, '<----- ini req id -----')
        if (response.data === `anda tidak boleh meng akses ini`) {
          sweetalert('Tida bisa di hapus!', 'ini bukan punya anda "SILAHKAN BUAT TODO SENDIRI"!!!!', 'DELETE gagal')
        } else {
          const todoIndex = this.todosData.indexOf(todo)
          this.todosData.splice(todoIndex, 1)
          sweetalert('Success!', 'DATA berhasil DI HAPUSS !!!!', 'DELETE SUCCESS')
        }
      })
      .catch(() => {
        sweetalert('Tida bisa di hapus!', 'ini bukan punya anda !!!!', 'DELETE gagal')
      })
    }
  }
}
</script>

<style lang="css">
</style>
