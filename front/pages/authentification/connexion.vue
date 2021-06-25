<template>
  <v-container>
    <h1 class="center">Connexion</h1>
    <v-form ref="form" lazy-validation>
      <div align="center" class="padding">
        <v-text-field
          v-model="email"
          label="E-mail"
          prepend-icon="mdi-account"
          :rules="rules.email"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mot de passe"
          prepend-icon="mdi-lock"
          required
          :rules="rules.password"
        ></v-text-field>
      </div>

      <div class="center padding">
        <v-btn color="blue" @click="validate(email, password)" class="v-btn">
          Se connecter
        </v-btn>
        <p class="padding">
          Vous découvrer UberVegan ?
          <router-link :to="{ name: 'authentification-inscription' }"
            >Créez un compte</router-link
          >
        </p>
      </div>
      <br />
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        email: [(v) => !!v || "Votre email est obligatoire"],
        password: [(v) => !!v || "Votre mot de passe est obligatoire"],
      },
    };
  },

  methods: {
    validate(email, password) {
      console.log("Bouton connexion");
      console.log("Email: " + email + " - Mot de passe : " + password);
      axios
        .get("https://localhost:3000")
        .then((response) => (this.info = response));
      console.log(this.info);
    },
    //TODO : Authentification
  },
};
</script>