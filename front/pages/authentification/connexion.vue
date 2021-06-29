<template>
  <v-container>
    <h1 class="center">Connexion</h1>
    <v-form ref="form" lazy-validation>
      <div align="center" class="padding">
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
          required
          :type="show1 ? 'text' : 'password'"
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
      show1: false,
      email: "",
      password: "",
      user: {},
      data: {},
      rules: {
        email: [v => !!v || "Votre email est obligatoire"],
        password: [v => !!v || "Votre mot de passe est obligatoire"]
      }
    };
  },

  methods: {
    validate(email, password) {
      
      localStorage.setItem('isConnected', 'true') 
      localStorage.setItem('role', 3)
  
      let data = {
        "email": email,
        "password": password,
      };

      axios
        .post("http://localhost:8000/authenticate", JSON.stringify(data), {
          headers : {
              "Content-Type": "application/json",
          }
        })
        .then((response) => {
          this.user = response.data;
          console.log(this.user.isConnected)
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("Cette erreur est survenue : ", error);
        });
        if(localStorage.getItem('role') == 1){ // Utilisateur restaurateur
          this.$router.push({name: 'index'})
        } else if (localStorage.getItem('role') == 2) { // Utilisateur livreur
          this.$router.push({name: 'livreur-livraison'})
        } else if (localStorage.getItem('role') == 3) { // Utilisateur livreur
          this.$router.push({name: 'restaurateur-article'})
        }
        
    },
  },
};

</script>
