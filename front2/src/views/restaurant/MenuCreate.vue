<template>
  <v-container>
    <v-btn @click="$router.go(-1)">
      <v-icon dark small class="pr-1">
        mdi-arrow-left
      </v-icon>
      Retour
    </v-btn>
    <v-card max-width="400" class="mx-auto pa-5" align="center" flat>
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
          <v-col cols="12">
            <v-autocomplete
              v-model="menue.articlesListId"
              :items="articles"
              item-text="name"
              item-value="_id"
              dense
              chips
              small-chips
              label="Articles"
              multiple
              solo
            ></v-autocomplete>
          </v-col>
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
  props: ["id"],
  data() {
    return {
      articles: [],
      articlesValues: [],
      menue: {
        name: "",
        description: "",
        price: "",
        img: "",
        articlesListId: null,
      },
      rules: {
        name: [(v) => !!v || "Nom du menu obligatoire"],
        description: [(v) => !!v || "description du menu obligatoire"],
        price: [(v) => !!v || "price du menuobligatoire"],
        img: [(v) => !!v || "img du menu obligatoire"],
        articlesListId: [(v) => !!v || "articlesListId du menu obligatoire"],
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
          articlesListId: this.menue.articlesListId,
        };
        this.$store.dispatch("menuCreate", { infos: payload }).finally();
        this.$router.push({ path: "/" });
      }
    },
  },
  async created() {
    await this.$store.dispatch("articles", {
      infos: { id: this.$props.id },
    });
    this.articles = this.$store.getters.getArticles;
  },
};
</script>
