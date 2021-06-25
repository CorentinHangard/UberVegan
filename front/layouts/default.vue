<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div align="center" class="padding">
        <router-link :to="{ name: 'authentification-connexion' }">
          <v-btn class="blue"> Se connecter </v-btn>
        </router-link>
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
          src="UberVeganTitle.png"
          style="height: 75px; width: auto; display: flex"
      /></router-link>
      <v-spacer />
      <v-btn>
        <v-icon> mdi-cart </v-icon>
      </v-btn>
      <router-link :to="{ name: 'authentification-connexion' }">
        <v-btn class="blue"> Se connecter </v-btn>
      </router-link>
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
          icon: "mdi-truck-delivery",
          title: "Devenir livreur",
          to: {
            name: "authentification-devenirLivreur"
          }
        },
        {
          icon: "mdi-silverware-fork-knife",
          title: "Devenir restaurateur",
          to: {
            name: "authentification-devenirRestaurateur"
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },

  methods: {
    // Fonction retournant tous les éléments d'une table
    selectAll(cible) {
      axios
        .get("https://localhost:8000/" + cible + "/")
        .then(response => (this.info = response));
    },
    // Fonction retournant un élément précis d'une table en fonction de son ID
    selectOne(cible, idElement) {
      axios
        .get("https://localhost:8000/" + cible + "/" + idElement + "/")
        .then(response => (this.info = response));
    }
  }
};
</script>
<style>
@import "../assets/css/layout.css";
</style>
