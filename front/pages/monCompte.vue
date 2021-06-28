<template>
  <v-container>
    <h1 class="center">Bonjour {{ nom }} !</h1>
    <div align="center" class="padding">
      <v-data-table
        :headers="headers"
        :items="data"
        class="elevation-1"
        hide-default-footer
        ><template>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Bonjour</span>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="handleClick(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
      <template>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Modifier son profil</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem"
                        label="Nouvelle valeur"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Sauvegarder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </div>
  </v-container>
</template>
<script>

export default {
  data() {
    return {
      /* data : {
        nom: "",
        telephone: "3",
        email: "marc.durand@gmail.com",
        password: "azerty",
        confirmationPassword: "azerty",
        codeParrainage: "abababa",
    }, */
      donneesUtilisateur: this.initialize().donnees,
      modalEdit: false,
      dialog: false,
      headers: [
        {
          text: "Données personnelles",
          align: "start",
          sortable: false,
          value: "donneesUtilisateur",
        },
        {
          text: "Modifier",
          sortable: false,
          value: "actions",
        },
      ],
      editedItem: {
        nom: this.nom,
        telephone: this.telephone,
        email: this.email,
        password: this.password,
      },
      show1: false,
    };
  },

  created() {
    this.initialize();
    console.log(this.initialize().donnees.value);
  },

  methods: {
    validate(nom, telephone, email, password, codeParrainage) {
      console.log("bouton valider");
      //TODO : Authentification
    },
    redirectToConnexion() {
      router.push({ path: "/connexion" });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    handleClick(value) {
      console.log(value);

      this.dialog = true;
    },
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
        donnees
      }
    },
  },
};
</script>