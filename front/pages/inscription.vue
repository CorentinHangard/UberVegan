<template>
  <v-container>
    <v-card elevation="10" shaped>
      <h1 class="center">Inscription</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="nom"
          label="Nom"
          required
        ></v-text-field>

        <v-text-field
          v-model="prenom"
          label="Prénom"
          required
        ></v-text-field>

        <v-text-field
          v-model="telephone"
          label="N° de téléphone"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mot de passe"
          :type="show1 ? 'text' : 'password'"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Confirmez votre mot de passe"
          :type="show1 ? 'text' : 'password'"
          required
        ></v-text-field>

        <v-text-field
          v-model="codeParrainage"
          label="Code de parrainage (facultatif)"
          required
        ></v-text-field>

        <div class="center">
          <v-btn color="blue" @click="validate(nom, prenom, telephone, email, password, codeParrainage)">
            Valider
          </v-btn>
          <p>
            Déjà un compte ?
            <router-link :to="{ name: 'connexion'}">Se connecter</router-link>
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
      show1: false,
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      password: "",
      codeParrainage: "",
    };
  },

  methods: {
    validate(nom, prenom, telephone, email, password, codeParrainage) {
        console.log("bouton valider")
      //TODO : Authentification
    },
    redirectToConnexion() {
      router.push({ path: "/connexion" });
    },
  },
};
</script>