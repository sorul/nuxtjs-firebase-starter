<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>Crear debate</h2>
        <!-- Estos formularios agrupados se pueden buscar en bootstrap vue -->
        <b-form @submit.prevent="createDiscussion">
          <b-form-group
            id="input-group-1"
            label="Nombre del debate:"
            label-for="input-1"
            description="">
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
            label-for="input-2">
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
        <b-form @submit.prevent="updateDiscussion" @reset.prevent="deleteDiscussion">
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
    >
      <logo/>
    </b-jumbotron>

    <b-list-group>
      <b-list-group-item
        v-for="discussion in list"
        :key="discussion.id"
        @click="edit(discussion)">
        <!-- La propiedad de click hace que cada debate de la lista sea clickable -->
        <p>{{ discussion.name }}</p>
        <span>{{ discussion.description }}</span>
      </b-list-group-item>
    </b-list-group>
  </b-container>
  
</template>

<script>


export default {
  name: "IndexPage", //el nombre que se le da al componente actual y el cual tendrá que ser llamado en las etiquetas <IndexPage> en componentes padres


  data() {
    return {
      discussion: { //estructura del objeto tipo debate
        name: "",
        description: ""
      },
      discussionToUpdate: null, //objeto tipo debate que se rellenará cuando clickemos en un debate de la lista y se imprimirá en el formulario de editar/borrar
      list: [] //lista de objetos tipo debate
    };
  },

  async created() { //este método se llamará solo una vez cuando se cargue el componente porque está declarado fuera de los 'methods' de abajo
    const discussions = await this.$fireStore.collection("discussions").get(); //usar await cuando haya que hacer una llamada a la API, de esta forma el código esperará hasta que la API responda
    this.list = discussions.docs.map(doc => ({ id: doc.id, ...doc.data() }) ); //.docs es necesario para obtener un array con todos los registros y .data es necesario para obtener los campos de cada registro
    //Los puntos suspensivos aquí permiten que el json que esta devolviendo {} empiece en primer lugar por el id (sacado directamente del doc) y después del resto de campos (sacados en el data) ordenados tal y como vienen,
    //los puntos suspensivos se encargan de encajar cada atributo en la estructura de tipo debate creada
  },

  methods: {
    async createDiscussion(e) {
      // e.preventDefault();
      const doc = await this.$fireStore
        .collection("discussions")
        .add(this.discussion);
      this.list.push({ id: doc.id, ...this.discussion });
    },

    //invocado cuando se clica sobre un elemento de la lista
    edit(discussion) {
      this.discussionToUpdate = { ...discussion } //{...} sirve para clonarse el objeto de la lista al formulario de edicion/borrado
      // this.discussionToUpdate = discussion
    },

    async updateDiscussion(e) {
      // e.preventDefault()
      await this.$fireStore
      .collection('discussions')
      .doc(this.discussionToUpdate.id)
      .set(this.discussionToUpdate)

      this.list = this.list.map(d => {
        if (d.id === this.discussionToUpdate.id){
          return this.discussionToUpdate  
        }else{
          return d
        }
      })
      this.discussionToUpdate = null
    },

    async deleteDiscussion(e) {
      // e.preventDefault()
      await this.$fireStore
      .collection('discussions')
      .doc(this.discussionToUpdate.id)
      .delete()

      this.list = this.list.filter(d => d.id !== this.discussionToUpdate.id) //Filtramos el listado para eliminar el debate borrado
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
