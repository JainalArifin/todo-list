<template lang="html">
  <div class="continer jarak">
    <div class="panel panel-primary  tambahTodoStyle" style="padding:10px">
      <!-- <div class="panel-heading"> -->
        <label>username</label>
        <input type="text" class="form-control" placeholder="username">
      <!-- </div> -->
      <div class="panel-content">
        <label>password</label>
        <input type="password" class="form-control" placeholder="password">
      </div><br>
      <div>
        <button class="btn btn-success" type="button" name="button" v-on:click.prevent="register()">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataUser: []
    }
  },
  methods: {
    register () {
      this.$http.post(`/user/register`, {
        username: this.dataUser.username,
        password: this.dataUser.password
      })
    }
  }
}
</script>

<style lang="css">
.tambahTodoStyle{
  width: 300px;
  margin: auto;
}
.continer.jarak {
    margin: 10px 0px;
}
</style>
