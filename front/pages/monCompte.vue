<template>
  <div id="app">
    <h1 class="center">Mon profil</h1>
    <br />
    <v-app id="inspire">
      <v-col align="center" justify="center">
        <v-row cols="12" sm="3" style="display: block">
          <v-text-field
            :value="infoUtilisateur.donnees.nom"
            v-model="infoUtilisateur.donnees.nom"
            label="Nom complet"
            outlined
            :readonly='!readonly'
          ></v-text-field>
        </v-row>
        <v-row cols="12" sm="3" style="display: block">
          <v-text-field
            :value="infoUtilisateur.donnees.telephone"
            v-model="infoUtilisateur.donnees.telephone"
            label="N° de téléphone"
            outlined
            :readonly='!readonly'
          ></v-text-field>
        </v-row>
        <v-row cols="12" sm="3" style="display: block">
          <v-text-field
            :value="infoUtilisateur.donnees.email"
            v-model="infoUtilisateur.donnees.email"
            label="Adresse e-mail"
            outlined
            :readonly='!readonly'
          ></v-text-field>
        </v-row>
        <v-row cols="12" sm="3" style="display: block">
          <v-text-field
            :value="infoUtilisateur.donnees.password"
            v-model="infoUtilisateur.donnees.password"
            label="Mot de passe"
            outlined
            :type="show1 ? 'text' : 'password'"
            :readonly='!readonly'
          ></v-text-field>
        </v-row>
        <v-btn color="red" @click="cancel()" v-if='readonly' class="px-6" >Annuler</v-btn>
        <v-btn color="green" @click="save()" v-if='readonly' class="px-6">Modifier</v-btn>
        <v-btn color="blue" @click="changerReadOnly()" v-if='!readonly'>Activer la modification</v-btn>
      </v-col>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoUtilisateur: this.initialize(),
      show1: false,
      dialog: false,
      readonly: false
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    initialize() {
      const donneesUtilisateur = {
        profile: {
          _id: "60d9c6339ff10b1134aa6646",
          fullName: "Jonathan Cohen",
          phoneNumber: 600000000,
          address: "1 rue ff",
          sponsorCode: "14ynsq",
          sponsor: null,
          userId: "10",
          __v: 0,
        },
        user: {
          usr_id: 10,
          usr_email: "resto2@c.c",
          usr_password: "123456",
          usr_status: 1,
          rol_id: 3,
        },
        restaurant: {
          _id: "60d9c6339ff10b1134aa6647",
          profileId: "60d9c6339ff10b1134aa6646",
          name: "Amazon",
          description: "Coucou",
          img: "http://img",
          rating: null,
          costOfDelivery: "3.00",
          preparationTime: 15,
          __v: 0,
        },
      };
      const donnees = {
        nom: donneesUtilisateur.profile.fullName,
        telephone: donneesUtilisateur.profile.phoneNumber,
        email: donneesUtilisateur.user.usr_email,
        password: donneesUtilisateur.user.usr_password,
        codeParrainage: donneesUtilisateur.profile.sponsorCode,
      };
      return {
        donneesUtilisateur,
        donnees,
      };
    },
    changerReadOnly(){
      this.readonly=!this.readonly
    },
    cancel(){
      this.infoUtilisateur.donnees.nom = this.initialize().donnees.nom
      this.infoUtilisateur.donnees.telephone = this.initialize().donnees.telephone
      this.infoUtilisateur.donnees.email = this.initialize().donnees.email
      this.infoUtilisateur.donnees.password = this.initialize().donnees.password
      this.readonly=!this.readonly

    },
    save(){
      const payload = {
        "usr_id": this.infoUtilisateur.donneesUtilisateur.user.usr_id,
        "nom": this.infoUtilisateur.donnees.nom,
        "telephone": this.infoUtilisateur.donnees.telephone,
        "email": this.infoUtilisateur.donnees.email,
        "password": this.infoUtilisateur.donnees.password,
      }
      console.log(payload)
      this.readonly=!this.readonly
    }
  },
};
</script>