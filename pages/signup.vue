<template>
  <b-container>
    <h3>Sing Up</h3>
    <b-form @submit.prevent="registerUser">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1" description>
        <b-form-input id="input-1" type="email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input id="input-2" type="password" v-model="password"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sing Up</b-button>
    </b-form>
  </b-container>
</template>

<script>


export default {
  data(){
    return {
      email: '',
      password: '',
      errors:''
    }
  },
    methods: {
        async registerUser() {
            this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
              .then(user => {
                console.log(user);
                this.$router.push("/");
                })
              .catch(error => {
                this.errors = error;
                console.log(error)
              }) 
        }
  }
}
</script>

<style>
</style>
