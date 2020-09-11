<template>
  <b-container>
      <b-form @submit.prevent="createUser">
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="input-1"
            description="">
            <b-form-input
              id="input-1"
              type="text"
              
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Pass:"
            label-for="input-2">
            <b-form-input
              id="input-2"
              
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Sing Up</b-button>
        </b-form>
  </b-container>
</template>

<script>

export default {
    methods: {
        async createUser() {
            try {
                await this.$fireAuth.createUserWithEmailAndPassword(
                'foo@foo.foo',
                'test123456'
                )
            } catch (e) {
                console.log(e)
            }
        }
  }
}
</script>

<style>

</style>