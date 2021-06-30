<template>
  <div>
    <v-alert
      v-if="message"
      type="info"
      icon="mdi-alert-decagram"
      dismissible
      max-width="600"
      justify="center"
      align="center"
      class="mx-auto ma-5"
      color="red"
    >
      {{ message }}
    </v-alert>
    <v-card max-width="400" class="mx-auto pa-5" align="center" flat>
      <h1 class="center">Connexion</h1>
      <br />
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
        <br />
        <v-btn color="blue" @click="validate()">
          Connexion
        </v-btn>
        <br />
        <p class="mt-5">
          Vous découvrer UberVegan ?
          <router-link :to="{ name: 'signup' }">Créez un compte</router-link>
        </p>
        <br />
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      message: "",
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
            if (err.toString().split("500")) {
              this.message = "Email / Mot de passe incorrect";
            }
          })
          .finally(async () => {
            if (this.$store.getters.isConnected) {
              await this.$store.dispatch("profile");
              if (this.$store.getters.getInfos.user.role == 1) {
                this.$router.push({ name: "Home" });
              } else if (this.$store.getters.getInfos.user.role == 2) {
                this.$router.push({ name: "livraison" });
              } else if (this.$store.getters.getInfos.user.role == 3) {
                this.$router.push({
                  name: "restaurant",
                  params: { id: this.$store.getters.getUser.restaurant._id },
                });
              }else if (this.$store.getters.getInfos.user.role == 4) {
                this.$router.push({ name: "developpeur" });

              }
            }
          });
      }
    },
  },
};
</script>
