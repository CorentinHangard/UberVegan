<template>
  <div id="app">
    <h1 class="center">Bonjour {{ nom }} !</h1>
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="donnees"
        sort-by="calories"
        class="elevation-1"        
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Modifier son compte</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nom"
                          label="Nom"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.telephone"
                          label="Téléphone"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.password"
                          label="Mot de passe"
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({
    show1: false,
    nom: '',
    //telephone: this.profile.phoneNumber,
    //email: user.usr_email,
    //password: user.usr_password,
    //codeParrainage: this.profile.sponsorCode,
    dialog: false,
    profile: [],
    user: [],
    restaurant: [],
    headers: [
      {
        text: "Données personnelles",
        align: "start",
        sortable: false,
        value: "donnees",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    donnees: [],
    editedIndex: -1,
    editedItem: {
      nom: "",
      email: 0,
      telephone: 0,
      password: 0,
    },
    defaultItem: {
      nom: "",
      email: 0,
      telephone: 0,
      password: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
        this.profile = {
            _id: "60d9c6339ff10b1134aa6646",
            fullName: "Jonathan Cohen",
            phoneNumber: 600000000,
            address: "1 rue ff",
            sponsorCode: "14ynsq",
            sponsor: null,
            userId: "10",
            __v: 0,
        },
        this.user = {
          usr_id: 10,
          usr_email: "resto2@c.c",
          usr_password: "123456",
          usr_status: 1,
          rol_id: 3,
        },
        this.restaurant = {
          _id: "60d9c6339ff10b1134aa6647",
          profileId: "60d9c6339ff10b1134aa6646",
          name: "Amazon",
          description: "Coucou",
          img: "http://img",
          rating: null,
          costOfDelivery: "3.00",
          preparationTime: 15,
          __v: 0,
        };
        this.nom = this.profile.fullName,
        this.telephone= this.profile.phoneNumber,
        this.email= this.user.usr_email,
        this.password= this.user.usr_password,
        this.codeParrainage= this.profile.sponsorCode,
        this.donnees = [
            {
                Nom: this.nom,
                telephone: this.telephone,
                email: this.email,
                password: this.password
            }
        ]
    },

    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>