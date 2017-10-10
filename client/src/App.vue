<template>
  <div id="app">
    <div class="container">
      <p><b> Silakan Login Fb di bawah ini !!!</b></p>
      <Login></Login>
      <!-- <button type="button" name="button" @click="Regiter" class="btn btn-primary">Register</button> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Home from './components/Home'
import Login from './components/Login'
export default {
  name: 'app',
  components: {
    Login,
    Home
  },
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    Regiter () {
      this.$router.push('/register')
    }
  },
  created () {
    if (this.token == null) {
      this.$router.push('/')
    }
  }
  // methods: {
  //   register () {
  //     this.$router.push('/register')
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  background-image: url(./assets/gambar-admin-1.jpeg);
}
</style>
