<template>
  <v-container>
    <v-card elevation="10" shaped>
      <h1 class="center">Connexion</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="identifiant"
          :rules="nameRules"
          label="Identifiant"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Mot de passe"
          required
        ></v-text-field>

        <div class="center">
          <v-btn color="blue" @click="validate(identifiant, password)">
            Se connecter
          </v-btn>
          <p>
            Pas encore inscrit ?
            <button @click="redirectToInscription()">S'inscrire</button>
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
      password: "",
      identifiant: "",
    };
  },

  methods: {
    validate(identifiant, password) {
      //TODO : Authentification
    },
    redirectToInscription() {
      this.$router.push({ path: "/devenirLivreur" });
    },
  },
};
</script>