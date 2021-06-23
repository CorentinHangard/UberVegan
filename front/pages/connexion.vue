<template>
  <v-container>
    <v-card elevation="10" shaped>
      <h1 class="center">Connexion</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mot de passe"
          required
        ></v-text-field>

        <div class="center">
          <v-btn color="blue" @click="validate(email, password)">
            Se connecter
          </v-btn>
          <p>
            Pas encore inscrit ?
            <router-link :to="{ name: 'inscription'}">S'inscrire</router-link>
          </p>
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
      email: "",
      password: "",
    };
  },

  methods: {
    validate(email, password) {
      console.log("Bouton connexion")
      console.log("Email: "+ email + " - Mot de passe : "+password)
      //TODO : Authentification
    },
  },
};
</script>