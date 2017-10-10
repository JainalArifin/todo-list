<template>
  <div>
    <button type="button" name="button" @click="logout" class="btn btn-danger">LogOut</button><br>
    <!-- / di sini saat nambah  -->
    <div class="col-md-4"><br><br>
      <div class="panel panel-primary  tambahTodoStyle" style="padding:10px">
        <!-- <div class="panel-heading"> -->
          <label>Title</label>
          <input type="text" v-model="postData.title" class="form-control">
        <!-- </div> -->
        <div class="panel-content">
          <label>Content</label>
          <input type="text" v-model="postData.content" class="form-control">
        </div><br>
        <div>
          <button class="btn btn-success" type="button" name="button" v-on:click.prevent="tambah()">
            Create
          </button>
        </div>
      </div>
    </div>
    <!--/ end of tambah  -->
    <Todolist v-bind:todosData="todos"></Todolist>
  </div>
</template>

<script>
import axios from 'axios'
import sweetalert from 'sweetalert'
import TambahTodo from './TambahTodo'
import Todolist from './Todolist'
export default {
  components: {
    TambahTodo,
    Todolist
  },
  data () {
    return {
      todos: [],
      postData: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    getTodo () {
      this.$http.get('/todo', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((dataTodo) => {
        console.log(dataTodo, '<-----dataTodo----')
        this.todos = dataTodo.data
      })
    },
    // addTodo (newTodo) {
    //   // this.$http.postData(`/todo`)
    //   console.log(newTodo, ' <-----masuk kesini newTodo')
    //   this.todos.push(newTodo)
    //   sweetalert('Success!', 'trimakasi mas zainal!', 'success')
    // },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('fbaccesstoken')
      this.$router.push('/')
    },
    tambah () {
      // console.log('--------->, masuk sini')
      var self = this
      axios.post(`http://localhost:3000/todo`, {
        // console.log(self.postData.title, '<-----------postData---'),
        title: self.postData.title,
        content: self.postData.content
      }, {
        headers: {
          // console.log()
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        this.todos.push(response.data)
        this.$router.push('/home')
        sweetalert('Success!', 'trimakasi mas zainal!', 'success')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getTodo()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
