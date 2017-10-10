<template lang="html">
  <div class="col-md-3">
    <div class="panel panel-primary" v-show="!isEditing">

      <div class="panel-heading">
        <i>Judul: </i><p>{{todoAnak.title}}</p>
      </div>
      <div class="panel-body">
        <i>Content: </i><p>{{todoAnak.content}}</p>
        <span>
          <button type="button" class="btn btn-info" v-show="!isEditing && todoAnak.done" v-on:click="kembaliDone(todoAnak)">
            Completed
          </button>
          <button type="button" class="btn btn-success glyphicon glyphicon-ok" v-show="!isEditing && !todoAnak.done" v-on:click="completeTodo(todoAnak)">
           done click
          </button>
        </span>
        <span v-on:click="deleteTodo(todoAnak)">
          <button class="glyphicon glyphicon-trash btn btn-danger"> Hapus </button>
        </span>
      </div>
    </div>

    <!-- waktu edit -->
    <!-- <div class="panel panel-primary" v-show="isEditing">
      <div class="panel-heading">
        <label>Title</label>
        <input type="text" v-model="todoAnak.title" class="form-control">
      </div>
      <div class="panel-body">
        <label>Content</label>
        <input type="text" v-model="todoAnak.content" class="form-control">
      </div>
      <div class="text-center">
        <button type="button" name="button" v-on:click="hideForm" class="btn btn-danger">
           Close X
        </button><br><br>
      </div>
    </div> -->

    <!-- <div class="text-center">
      <button type="button" class="btn btn-info" v-show="!isEditing && todoAnak.done">
        Completed
      </button>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-danger glyphicon glyphicon-ok" v-show="!isEditing && !todoAnak.done" v-on:click="completeTodo(todoAnak)">
          Click Pending
      </button>
    </div> -->

  </div>
</template>

<script>
import sweetalert from 'sweetalert'
export default {
  props: ['todoAnak'],
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    showForm () {
      this.isEditing = true
    },
    hideForm () {
      this.isEditing = false
    },
    deleteTodo (todoAnak) {
      this.$emit('delete-todo', todoAnak)
    },
    completeTodo (todoAnak) {
      console.log(todoAnak, '<---- todoAnak ----')
      this.$http.put(`/todo/${todoAnak._id}`, {
        title: todoAnak.title,
        content: 'halo',
        done: true
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data === `anda tidak boleh meng akses ini`) {
          sweetalert('GAGAl!', 'anda tidak boleh meng akses ini bukan todo anda "silahkan buat TODO anda sendiri"', 'todo buakn punya anda')
        } else {
          event.preventDefault()
          todoAnak.done = true
          sweetalert('Success!', 'oke sudah selesai', 'completed todo list')
        }
      })
      .catch((err) => {
        console.log('gagal', err)
      })
      // this.$emit('completed', todoAnak)
    },
    kembaliDone (todoAnak) {
      console.log(todoAnak, '<---- todoAnak ----')
      this.$http.put(`/todo/${todoAnak._id}`, {
        title: todoAnak.title,
        content: 'halo',
        done: false
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data === `anda tidak boleh meng akses ini`) {
          sweetalert('GAGAl!', 'anda tidak boleh meng akses ini "silahkan buat TODO anda sendiri" ', 'todo buakn punya anda')
        } else {
          event.preventDefault()
          todoAnak.done = false
          sweetalert('Success!', 'oke sudah selesai', 'completed todo list')
        }
      })
      .catch((err) => {
        console.log('gagal', err)
      })
      // this.$emit('completed', todoAnak)
    }
  }
}
</script>

<style lang="css">
.row.text-center {
    color: #fff;
}
</style>
