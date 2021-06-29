<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div v-if="!isConnected || isConnected == 'false'">
      <div align="center" class="padding">
        <router-link :to="{ name: 'authentification-connexion'}">
          <v-btn class="blue"> Se connecter </v-btn>
        </router-link>
      </div>
         </div>
         <div v-else>
            <div align="center" class="padding">
        <router-link :to="{ name: 'monCompteRestaurateur'}">
           <v-btn>
       <v-icon> mdi-account</v-icon>
             <span>mon compte</span>
      </v-btn>
        </router-link>
      </div>
         </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
    
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    
      <router-link :to="{ name: 'index' }"
        ><img
          src="../assets/images/UberVeganTitle.png"
          style="height: 75px; width: auto; display: flex"
      /></router-link>
      <v-spacer />
           <v-btn>
        <v-icon> mdi-cart </v-icon>
        <span>panier</span>
      </v-btn>
      <div v-if="isConnected && isConnected == 'true'">
             <router-link :to="{ name: 'monCompteRestaurateur' }">
          <v-btn>
            <v-icon> mdi-account</v-icon>
             <span>mon compte</span>
             </v-btn>
        </router-link>
      </div>
      <div v-else>
   
         <router-link :to="{ name: 'authentification-connexion' }">
          <v-btn class="blue"> Se connecter </v-btn>
        </router-link>
       
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      info: {},
      items: [
        {
          icon: "mdi-food-fork-drink",
          title: "Mes articles",
          to: {
            name: "restaurateur-article"
          }
        },
        {
          icon: "mdi-food",
          title: "Mes menus",
          to: {
            name: "restaurateur-menu"
          }
        },
        {
          icon: "mdi-truck-delivery",
          title: "Commandes",
          to: {
            name: "restaurateur-commande"
          }
        },
        {
          icon: "mdi-bike",
          title: "Suivre une livraison",
          to: {
            name: "restaurateur-suiviLivraison"
          }
        },
        {
          icon: "mdi-history",
          title: "Historique commandes",
          to: {
            name: "restaurateur-historiqueCommande"
          }
        },
        {
          icon: "mdi-account-cowboy-hat",
          title: "Parrainer restaurateur",
          to: {
            name: "restaurateur-parrainageRestaurateur"
          }
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      role : localStorage.getItem('role'),
      isConnected : localStorage.getItem('isConnected')
    };
  },

  methods: {
    // Fonction retournant tous les éléments d'une table
    selectAll(cible) {
      axios
        .get("https://localhost:3000/" + cible + "/")
        .then((response) => (this.info = response));
    },
    // Fonction retournant un élément précis d'une table en fonction de son ID
    selectOne(cible, idElement) {
      axios
        .get("https://localhost:3000/" + cible + "/" + idElement + "/")
        .then((response) => (this.info = response));
    },
  },
};
</script>
<style>
@import "../assets/css/layout.css";
</style>