<template>
  <v-container>
    <h1 class="center">Bonjour {{ prenom }} {{ nom }} !</h1>
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
                  <span class="text-h5">{{ data.nomChamps }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

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
            <template>
              <v-icon small class="mr-2" @click="editItem(data)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
      </div>
    </v-container  >
</template>
<script>
export default {
  data() {
    return {
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      dialog: false,
      headers: [
        {
          text: "Données personnelles",
          align: "start",
          sortable: false,
          value: "nomChamps",
        },
        {
          text: "Modifier",
          sortable: false,
          value: "image",
        },
      ],
      data: [
        {
          nomChamps: "Nom",
          value: this.nom,
          image: this.nom
        },
        {
          nomChamps: "Prénom",
          value: this.prenom,
        },
        {
          nomChamps: "N° de téléphone",
          value: this.telephone,
        },
        {
          nomChamps: "E-mail",
          value: this.email,
        },
        {
          nomChamps: "Mot de passe",
          value: this.password,
        },
        {
          nomChamps: "Code de parrainage",
          value: this.codeParrainage,
        },
      ],
      show1: false,
      nom: "Durand",
      prenom: "Marc",
      telephone: "0616020283",
      email: "marc.durand@gmail.com",
      password: "azerty",
      confirmationPassword: "azerty",
      codeParrainage: "abababa",
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
  },
};
</script>