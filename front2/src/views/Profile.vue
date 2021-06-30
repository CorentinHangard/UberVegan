<template>
  <v-card max-width="500" class="mx-auto pa-5" align="center" flat>
    <h1 class="center">Mon profil</h1>
    <br />
    <v-col align="center" justify="center">
      <v-row cols="12" sm="3" style="display: block">
        <v-text-field
          v-model="user.profile.fullName"
          label="Nom complet"
          outlined
          :readonly="!readonly"
        ></v-text-field>
      </v-row>
      <v-row cols="12" sm="3" style="display: block">
        <v-text-field
          v-model="user.profile.phoneNumber"
          label="N° de téléphone"
          outlined
          :readonly="!readonly"
        ></v-text-field>
      </v-row>
      <v-row cols="12" sm="3" style="display: block">
        <v-text-field
          v-model="user.user.usr_email"
          label="Adresse e-mail"
          outlined
          :readonly="!readonly"
        ></v-text-field>
      </v-row>
      <v-row cols="12" sm="3" style="display: block">
        <v-text-field
          v-model="user.user.usr_password"
          label="Mot de passe"
          outlined
          :type="show1 ? 'text' : 'password'"
          :readonly="!readonly"
        ></v-text-field>
      </v-row>
      <v-btn color="red" @click="cancel()" v-if="readonly" class="px-6">
        Annuler
      </v-btn>
      <v-btn color="green" @click="save()" v-if="readonly" class="px-6">
        Modifier
      </v-btn>
      <v-btn color="blue" @click="changerReadOnly()" v-if="!readonly">
        Activer la modification
      </v-btn>
    </v-col>
  </v-card>
</template>
<script>
import Vuetify from "vuetify";
export default {
  data() {
    return {
      user: {},
      show1: false,
      dialog: false,
      readonly: false,
    };
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    changerReadOnly() {
      this.readonly = !this.readonly;
    },
    cancel() {
      this.readonly = !this.readonly;
    },
    save() {
      const payload = {
        usr_id: this.user.user.usr_id,
        fullName: this.user.profile.fullName,
        phoneNumber: this.user.profile.phoneNumber,
        email: this.user.user.usr_email,
        password: this.user.user.usr_password,
      };
      console.log(payload);
      this.$store.dispatch("profileEdit", { infos: payload });
      this.readonly = !this.readonly;
    },
  },
  async created() {
    await this.$store.dispatch("profile");
    this.user = this.$store.getters.getUser;
  },
};
</script>
