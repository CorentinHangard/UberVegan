<template>
  <v-container>
    <v-card elevation="10" shaped>
      <h1 class="center">Connexion</h1>
      <v-form ref="form" lazy-validation>
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

        <div class="center">
          <v-btn color="blue" @click="validate(email, password)">
            Se connecter
          </v-btn>
          <p>
            Pas encore inscrit ?
            <router-link :to="{ name: 'inscription' }">S'inscrire</router-link>
          </p>
        </div>
        <br />
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import axios from 'axios'
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
        .get('https://localhost:3000')
        .then(response => (this.info = response))
      console.log(this.info)
    }
      //TODO : Authentification
  },
};
</script>