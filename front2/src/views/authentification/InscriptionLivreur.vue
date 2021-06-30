<template>
  <v-card max-width="400" class="mx-auto pa-5" align="center" flat>
    <h1 class="center">Inscription livreur</h1>
    <v-form ref="form" lazy-validation>
      <div align="center" class="padding">
        <v-text-field
          v-model="user.fullName"
          label="Nom"
          prepend-icon="mdi-account"
          :rules="rules.nom"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.phoneNumber"
          label="N° de téléphone"
          prepend-icon="mdi-phone"
          :rules="rules.telephone"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.address"
          label="Adresse"
          prepend-icon="mdi-home"
          :rules="rules.address"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.usr_email"
          label="E-mail"
          prepend-icon="mdi-email"
          :rules="rules.email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.usr_password"
          label="Mot de passe"
          prepend-icon="mdi-lock"
          :type="show1 ? 'text' : 'password'"
          :rules="rules.password"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.sponsor"
          label="Code de parrainage (facultatif)"
          prepend-icon="mdi-account-cowboy-hat"
        ></v-text-field>
      </div>
      <div class="center">
        <v-btn color="blue" @click="validate()">
          Valider
        </v-btn>
        <p class="mt-5">
          Déjà un compte ?
          <router-link :to="{ name: 'login' }">Se connecter</router-link>
        </p>
      </div>
      <br />
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        fullName: "",
        phoneNumber: "",
        usr_email: "",
        usr_password: "",
        address: "",
        sponsor: null,
        rolId: 2,
      },
      show1: false,
      rules: {
        nom: [(v) => !!v || "Votre nom est obligatoire"],
        prenom: [(v) => !!v || "Votre prenom est obligatoire"],
        telephone: [(v) => !!v || "Votre numéro de téléphone est obligatoire"],
        address: [(v) => !!v || "Votre adresse est obligatoire"],
        email: [(v) => !!v || "Votre email est obligatoire"],
        password: [(v) => !!v || "Votre mot de passe est obligatoire"],
        confirmationPassword: [
          (v) => !!v || "Votre mot de passe est obligatoire",
        ],
      },
    };
  },

  methods: {
    validate() {
      const payload = {
        fullName: this.user.fullName,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
        email: this.user.usr_email,
        password: this.user.usr_password,
        sponsor: this.user.sponsor,
        rolId: this.user.rolId,
      };
      this.$store.dispatch("profileCreate", { infos: payload }).finally();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
