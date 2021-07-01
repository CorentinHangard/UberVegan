<template>
  <v-card max-width="1500" class="mx-auto pa-5" align="center" flat>
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
              <div>
                <span
                  >Voici le composant Menu permettant l'affichage des menus dans
                  l'application. Pour le télécharger veuillez entrer la commande
                  suivante dans votre command prompt :<br />
                  <strong>npm i uberveganmenugroupetroiscesirouen</strong>
                </span>
              </div>
            </v-col>
            <v-col>
              <Menu
                v-bind="restaurants"
                :name="restaurants[0].name"
                :description="restaurants[0].description"
                :id="restaurants[0].id"
                :price="restaurants[0].cod"
              />
            </v-col>
          </v-row>
          <br />
          <br />
          <v-row>
            <iframe
              id="myFrame"
              width="1500"
              height="1500"
              src="https://npm-stat.com/charts.html?package=uberveganmenugroupetroiscesirouen&from=2020-06-30&to=2021-06-30"
            ></iframe>
          </v-row>
        </div>
      </v-container>
    </v-row>
  </v-card>
</template>
<script>
import Menu from "@/components/Menu.vue";
// import MenuImp from "uberveganmenugroupetroiscesirouen"

export default {
  components: { Menu },

  mounted() {
    var iframe = document.getElementById("myFrame");
    var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
    elmnt.style.display = "none";
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
      wk: "",
    };
  },
};
</script>
