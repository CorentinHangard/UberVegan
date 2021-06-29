<template>
  <v-container>
    <h1 class="center">Créer un menu</h1>
    <v-form ref="form" lazy-validation>
      <div align="center" class="padding">
        <v-text-field
          v-model="menue.name"
          label="Nom"
          prepend-icon="mdi-account"
          :rules="rules.name"
          required
        ></v-text-field>
        <v-text-field
          v-model="menue.description"
          label="Description"
          prepend-icon="mdi-account"
          :rules="rules.description"
          required
        ></v-text-field>
        <v-text-field
          v-model="menue.price"
          label="Prix"
          prepend-icon="mdi-account"
          :rules="rules.price"
          required
        ></v-text-field>
        <v-text-field
          v-model="menue.img"
          label="Image"
          prepend-icon="mdi-account"
          :rules="rules.img"
          required
        ></v-text-field>
        <v-text-field
          v-model="menue.category"
          label="category"
          prepend-icon="mdi-account"
          :rules="rules.category"
        ></v-text-field>
      </div>
      <div class="center">
        <v-btn color="blue" @click="validate()">
          Valider
        </v-btn>
        <p>
          Déjà un compte ?
          <router-link :to="{ name: 'menueCreate' }">Se connecter</router-link>
        </p>
      </div>
      <br />
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      menue: {
        name: "",
        description: "",
        price: "",
        img: "",
        category: "",
      },
      rules: {
        name: [(v) => !!v || "Nom du menu obligatoire"],
        description: [(v) => !!v || "description du menu obligatoire"],
        price: [(v) => !!v || "price du menuobligatoire"],
        img: [(v) => !!v || "img du menu obligatoire"],
        category: [(v) => !!v || "articlesListId du menu obligatoire"],
      },
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.menue.name,
          description: this.menue.description,
          price: this.menue.price,
          img: this.menue.img,
          category: this.menue.category,
        };
        console.log(payload);
        this.$store.dispatch("articleCreate", { infos: payload }).finally();
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>
