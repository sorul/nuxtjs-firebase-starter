<template>
  <b-container>
    <h3>Sing Up</h3>
    <b-form @submit.prevent="registerUser">
      <b-form-group id="input-group-1" label="Nombre:" label-for="input-1" description>
        <b-form-input id="input-1" type="text"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pass:" label-for="input-2">
        <b-form-input id="input-2"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sing Up</b-button>
    </b-form>
  </b-container>
</template>

<script>


export default {
    methods: {
        async registerUser() {
            this.$fireAuth.createUserWithEmailAndPassword("fre@gmail.com", "123456789")
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
