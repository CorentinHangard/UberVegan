<template>
  <v-container>
    <v-btn @click="$router.go(-1)">
      <v-icon dark small class="pr-1">
        mdi-arrow-left
      </v-icon>
      Retour
    </v-btn>
    <v-card max-width="400" class="mx-auto pa-5" align="center" flat>
      <h1 class="center">Créer un article</h1>
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
            prepend-icon="mdi-android-messages"
            :rules="rules.description"
            required
          ></v-text-field>
          <v-text-field
            v-model="menue.price"
            label="Prix"
            prepend-icon="mdi-currency-eur"
            :rules="rules.price"
            required
          ></v-text-field>
          <!-- <v-text-field
          v-model="menue.img"
          label="Image"
          prepend-icon="mdi-image"
          :rules="rules.img"
          required
        ></v-text-field> -->
          <v-text-field
            v-model="menue.category"
            label="Catégorie"
            prepend-icon="mdi-account"
            :rules="rules.category"
          ></v-text-field>
        </div>
        <br />
        <div class="center">
          <v-btn color="blue" @click="validate()">
            Valider
          </v-btn>
        </div>
        <br />
      </v-form>
    </v-card>
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
        this.$store.dispatch("articleCreate", { infos: payload }).finally();
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>
