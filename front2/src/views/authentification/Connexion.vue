<template>
  <v-container>
    <h1 class="center">Connexion</h1>
    <v-form ref="form" lazy-validation>
      <div align="center" class="padding">
        <v-text-field
          v-model="data.email"
          label="E-mail"
          prepend-icon="mdi-email"
          required
          :rules="rules.email"
        ></v-text-field>

        <v-text-field
          v-model="data.password"
          label="Mot de passe"
          prepend-icon="mdi-lock"
          required
          :type="show1 ? 'text' : 'password'"
          :rules="rules.password"
        ></v-text-field>
      </div>

      <div class="center padding">
        <v-btn color="blue" @click="validate()" class="v-btn">
          Se connecter
        </v-btn>
        <p class="padding">
          Vous découvrer UberVegan ?
          <router-link :to="'/inscription'"
            >Créez un compte</router-link
          >
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
      show1: false,
      data: { email: "", password: "" },
      rules: {
        email: [(v) => !!v || "Votre email est obligatoire"],
        password: [(v) => !!v || "Votre mot de passe est obligatoire"],
      },
    };
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("authenticate", { infos: this.data })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            if (this.$store.getters.isConnected) {
              this.$router.push("/");
            }
          });
      }
    },
  },
};
</script>
