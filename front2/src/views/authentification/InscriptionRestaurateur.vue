<template>
  <v-card max-width="400" class="mx-auto pa-5" align="center" flat>
    <h1 class="center">Inscription Restaurateur</h1>
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

        <v-text-field
          v-model="user.resName"
          label="Entreprise"
          prepend-icon="mdi-domain"
          :rules="rules.resName"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.resDesc"
          label="Description entreprise"
          prepend-icon="mdi-android-messages"
          :rules="rules.resDesc"
          required
        ></v-text-field>

        <!-- <v-text-field
          v-model="user.resImg"
          label="Image de l'entreprise"
          prepend-icon="mdi-image"
          :rules="rules.resImg"
          required
        ></v-text-field> -->

        <v-text-field
          v-model="user.rescod"
          label="Cout de livraison"
          prepend-icon="mdi-currency-eur"
          :rules="rules.rescod"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.resPrep"
          label="Temps de préparation"
          prepend-icon="mdi-av-timer"
          :rules="rules.resPrep"
          required
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
        resName: "",
        resDesc: "",
        resImg: "",
        rescod: "",
        resPrep: "",
        rolId: 3,
      },
      show1: false,
      rules: {
        nom: [(v) => !!v || "Votre nom est obligatoire"],
        prenom: [(v) => !!v || "Votre prenom est obligatoire"],
        telephone: [(v) => !!v || "Votre numéro de téléphone est obligatoire"],
        adress: [(v) => !!v || "Votre adresse est obligatoire"],
        email: [(v) => !!v || "Votre email est obligatoire"],
        password: [(v) => !!v || "Votre mot de passe est obligatoire"],
        resName: [(v) => !!v || "Votre nom d'entreprise est obligatoire"],
        resDesc: [
          (v) => !!v || "Votre description d'entreprise est obligatoire",
        ],
        rescod: [
          (v) => !!v || "Votre cout de livrison d'entreprise est obligatoire",
        ],
        resPrep: [
          (v) => !!v || "Votre preparation time d'entreprise est obligatoire",
        ],
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
        resName: this.user.resName,
        resDesc: this.user.resDesc,
        resImg: this.user.resImg,
        rescod: this.user.rescod,
        resPrep: this.user.resPrep,
        rolId: this.user.rolId,
      };
      this.$store.dispatch("profileCreate", { infos: payload });
      this.$router.push({ path: "/" });
    },
  },
};
</script>
