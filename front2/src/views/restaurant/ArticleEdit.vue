<template>
  <v-card max-width="500" class="mx-auto pa-5" align="center" flat>
    <h1 class="center">Modifier un article</h1>
    <br />
    <v-col align="center" justify="center">
      <v-row cols="12" sm="3" style="display: block">
        <v-text-field
          v-model="menue.name"
          label="Nom"
          prepend-icon="mdi-account"
          :readonly="!readonly"
        ></v-text-field>
        <v-text-field
          v-model="menue.description"
          label="Description"
          prepend-icon="mdi-android-messages"
          :readonly="!readonly"
        ></v-text-field>
        <v-text-field
          v-model="menue.price"
          label="Prix"
          prepend-icon="mdi-currency-eur"
          :readonly="!readonly"
        ></v-text-field>
        <!-- <v-text-field
          v-model="menue.img"
          label="Image"
          prepend-icon="mdi-image"
          :readonly="!readonly"
        ></v-text-field> -->
        <v-text-field
          v-model="menue.category"
          label="Catégorie"
          prepend-icon="mdi-account"
          :readonly="!readonly"
        ></v-text-field>
      </v-row>
      <br />
      <v-btn color="red" @click="cancel()" v-if="readonly" class="px-6">
        Annuler
      </v-btn>
      <v-btn color="green" @click="save()" v-if="readonly" class="px-6 ml-5">
        Modifier
      </v-btn>
      <v-btn color="blue" @click="changerReadOnly()" v-if="!readonly">
        Activer la modification
      </v-btn>
    </v-col>
  </v-card>
</template>
<script>
import Vuetify from "vuetify";
export default {
  props: ["id"],
  data() {
    return {
      menue: {},
      show1: false,
      dialog: false,
      readonly: false,
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    changerReadOnly() {
      this.readonly = !this.readonly;
    },
    cancel() {
      this.readonly = !this.readonly;
    },
    save() {
      const payload = {
        id: this.menue._id,
        name: this.menue.name,
        description: this.menue.description,
        price: this.menue.price,
        img: this.menue.img,
        category: this.menue.category,
      };
      this.$store.dispatch("articleEdit", { infos: payload });
      this.readonly = !this.readonly;
    },
  },
  async created() {
    await this.$store.dispatch("article", { infos: { id: this.$props.id } });
    this.menue = this.$store.getters.getArticle;
  },
};
</script>
