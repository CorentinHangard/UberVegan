<template>
  <v-container>
    <v-card elevation="10" shaped>
      <h1 class="center">Devenir livreur ?</h1>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="nom"
          label="Nom"
          prepend-icon="mdi-account"
          :rules="rules.nom"
          required
        ></v-text-field>

        <v-text-field
          v-model="prenom"
          label="Prénom"
          prepend-icon="mdi-account"
          :rules="rules.prenom"
          required
        ></v-text-field>

        <v-text-field
          v-model="telephone"
          label="N° de téléphone"
          prepend-icon="mdi-phone"
          :rules="rules.telephone"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          prepend-icon="mdi-email"
          :rules="rules.email"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Mot de passe"
          prepend-icon="mdi-lock"
          :type="show1 ? 'text' : 'password'"
          :rules="rules.password"
          required
        ></v-text-field>

        <v-text-field
          v-model="confirmationPassword"
          label="Confirmez votre mot de passe"
          :type="show1 ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :rules="rules.confirmationPassword"
          required
        ></v-text-field>

        <v-text-field
          v-model="codeParrainage"
          label="Code de parrainage (facultatif)"
          prepend-icon="mdi-account-cowboy-hat"
          required
        ></v-text-field>

        <div class="center">
          <v-btn
            color="blue"
            @click="
              validate(nom, prenom, telephone, email, password, codeParrainage)
            "
          >
            Valider
          </v-btn>
          <p>
            Déjà un compte ?
            <router-link :to="{ name: 'connexion' }">Se connecter</router-link>
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
      confirmationPassword: "",
      codeParrainage: "",
      rules: {
        nom: [(v) => !!v || "Votre nom est obligatoire"],
        prenom: [(v) => !!v || "Votre prenom est obligatoire"],
        telephone: [(v) => !!v || "Votre numéro de téléphone est obligatoire"],
        email: [(v) => !!v || "Votre email est obligatoire"],
        password: [(v) => !!v || "Votre mot de passe est obligatoire"],
        confirmationPassword: [
          (v) => !!v || "Votre mot de passe est obligatoire",
        ],
      },
    };
  },

  methods: {
    validate(nom, prenom, telephone, email, password, codeParrainage) {
      console.log("bouton valider");
      //TODO : Authentification
    },
    redirectToConnexion() {
      router.push({ path: "/connexion" });
    },
  },
};
</script>