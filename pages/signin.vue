<template>
  <b-container>
    <h3>Login</h3>
    <b-form @submit.prevent="loginUser">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1" description>
        <b-form-input id="input-1" type="email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input id="input-2" type="password" v-model="password"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sign In</b-button>
      <nuxt-link to="/signup">Sign Up</nuxt-link>
    </b-form>
  </b-container>
</template>

<script>


export default {

  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
      async loginUser() {
          this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.$router.push("/")        
              })
            .catch(error => {
              alert(error.message)
            }) 
      }
  }
}
</script>

<style>
</style>