<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>Crear debate</h2>
        <b-form @submit="createDiscussion">
          <b-form-group
            id="input-group-1"
            label="Nombre del debate:"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="discussion.name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="discussion.description"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Crear</b-button>
        </b-form>
      </b-col>
      <b-col v-if="discussionToUpdate">
        <h2>Actualizar debate</h2>
        <b-form @submit="updateDiscussion" @reset="deleteDiscussion">
          <b-form-group
            id="input-group-1"
            label="Nombre del debate:"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="discussionToUpdate.name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="discussionToUpdate.description"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Actualizar</b-button>
          <b-button type="reset" variant="danger">Borrar</b-button>
        </b-form>
      </b-col>
    </b-row>

    <b-jumbotron
      class="mt-5"
      header="Listado de debates"
      lead="Aquí están disponibles todos los debates de la plataforma"
    />

    <b-list-group>
      <b-list-group-item
        v-for="discussion in list"
        :key="discussion.id"
        @click="edit(discussion)"
      >
        <p>{{ discussion.name }}</p>
        <span>{{ discussion.description }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      discussion: {
        name: "",
        description: ""
      },
      discussionToUpdate: null,
      list: []
    };
  },

  async created() {
    const discussions = await this.$fireStore.collection("discussions").get();
    this.list = discussions.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  methods: {
    async createDiscussion(e) {
      e.preventDefault();
      const doc = await this.$fireStore
        .collection("discussions")
        .add(this.discussion);
      this.list.push({ id: doc.id, ...this.discussion });
    },

    edit(discussion) {
      this.discussionToUpdate = { ...discussion }
    },

    async updateDiscussion(e) {
      e.preventDefault()
      await this.$fireStore
      .collection('discussions')
      .doc(this.discussionToUpdate.id)
      .set(this.discussionToUpdate)

      this.list = this.list.map(d => {
        if (d.id === this.discussionToUpdate.id) return this.discussionToUpdate
        return d
      })
      this.discussionToUpdate = null
    },

    async deleteDiscussion(e) {
      e.preventDefault()
      await this.$fireStore
      .collection('discussions')
      .doc(this.discussionToUpdate.id)
      .delete()

      this.list = this.list.filter(d => d.id !== this.discussionToUpdate.id)
      this.discussionToUpdate = null
    }
  }
};
</script>
<style>
.mt-5 {
  margin-top: 2rem;
}
</style>
