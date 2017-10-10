<template>
  <div>
    <fb-signin-button
      :params="fbSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Facebook
    </fb-signin-button>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email,user_likes,public_profile,publish_actions,manage_pages,publish_pages',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess (response) {
      // FB.api('/me', dude => {
      //   console.log(`Good to see you, ${dude.name}.`)
      // })
      console.log('mausk', response)
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)

      axios({
        method: 'post',
        url: 'http://localhost:3000/user/loginFb',
        headers: {
          fbaccesstoken: localStorage.getItem('fbaccesstoken')
          // token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log('ini response dari fb client', response)
        localStorage.setItem('token', response.data.token)
        this.$router.push('/home')
      })
      .catch((err) => {
        console.log('ini jika eroor', err)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
