<template>
  <v-card max-width="1000" class="mx-auto pa-5" align="center" flat>
    <v-row justify="center" align="center">
      <v-container>
        <h1 class="center">Composant pour developpeur</h1>
        <div align="center" class="padding">
          <span>
            Voici la liste des composants disponibles pour vos applications :
          </span>
          <br />

          <br />
          <v-row>
            <v-col>
              <span
                >Voici le composant Menu permettant l'affichage des menus dans
                l'application. Pour le télécharger veuillez entrer la commande suivante dans votre commande prompt : npm i UberVeganMenu
              </span>
            </v-col>

            <Menu
              v-bind="restaurants"
              :name="restaurants[0].name"
              :description="restaurants[0].description"
              :id="restaurants[0].id"
              :price="restaurants[0].cod"
            />
          </v-row>
        </div>
      </v-container>
    </v-row>
  </v-card>
</template>
<script>
//import Menu from "@/components/Menu.vue";
// import MenuImp from "uberveganmenugroupetroiscesirouen"

export default {
  // components: {...MenuImp},
  mounted() {
    console.log(this.restaurants[0].id);
  },
  data() {
    return {
      restaurants: [
        {
          id: 1,
          name: "Menu",
          description: "Description du menu",
          cod: "25",
        },
      ],
    };
  },
};
</script>
