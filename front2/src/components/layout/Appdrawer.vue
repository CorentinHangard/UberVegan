<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <div align="center" class="padding">
      <v-btn v-if="!isCon" class="blue" to="/login"> Se connecter </v-btn>
    </div>
    <v-list v-if="getUserRole == 1">
      <v-list-item
        v-for="(item, i) in itemsClient"
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
    <v-list v-else-if="getUserRole == 2">
      <v-list-item
        v-for="(item, i) in itemsLivreur"
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
    <v-list v-else-if="getUserRole == 3">
      <v-list-item
        v-for="(item, i) in itemsRestaurant"
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
    <v-list v-else-if="getUserRole == false">
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
</template>

<script >
import Vue from "vue";
export default {
  props: ["clipped", "drawer", "isCon", ""],
  data: () => {
    return {
      fixed: false,
      info: {},
      items: [
        {
          icon: "mdi-truck-delivery",
          title: "Devenir livreur",
          to: {
            name: "signupLivreur",
          },
        },
        {
          icon: "mdi-silverware-fork-knife",
          title: "Devenir restaurateur",
          to: {
            name: "signupRestaurateur",
          },
        },
      ],
      itemsLivreur: [
        {
          icon: "mdi-bike",
          title: "Gestion livraison",
          to: {
            name: "livreur-livraison",
          },
        },
        {
          icon: "mdi-account-cowboy-hat",
          title: "Parrainer livreur",
          to: {
            name: "livreur-parrainageLivreur",
          },
        },
      ],

      itemsRestaurant: [
        {
          icon: "mdi-food-fork-drink",
          title: "Mes articles",
          to: {
            name: "restaurateur-article",
          },
        },
        {
          icon: "mdi-food",
          title: "Mes menus",
          to: {
            name: "restaurateur-menu",
          },
        },
        {
          icon: "mdi-truck-delivery",
          title: "Commandes",
          to: {
            name: "restaurateur-commande",
          },
        },
        {
          icon: "mdi-bike",
          title: "Suivre une livraison",
          to: {
            name: "restaurateur-suiviLivraison",
          },
        },
        {
          icon: "mdi-history",
          title: "Historique commandes",
          to: {
            name: "restaurateur-historiqueCommande",
          },
        },
        {
          icon: "mdi-account-cowboy-hat",
          title: "Parrainer restaurateur",
          to: {
            name: "restaurateur-parrainageRestaurateur",
          },
        },
      ],

      itemsClient: [
        {
          icon: "mdi-account",
          title: "Mon compte",
          to: {
            name: "profile",
          },
        },
        {
          icon: "mdi-hamburger",
          title: "J'ai faim",
          to: {
            name: "/",
          },
        },
          {
          icon: "mdi-bike",
          title: "Suivre ma livraison",
          to: {
            name: "/",
          },
        },
        {
          icon: "mdi-file-document-multiple",
          title: "Historiques des commandes",
          to: {
            name: "commandHistory",
          },
        },
         {
          icon: "mdi-account-cowboy-hat",
          title: "Je parraîne",
          to: {
            name: "ParrainageClient",
          },
        },
      
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },

  computed: {
    getUserRole() {
      const infos = this.$store.getters.getInfos;

      if (infos.user) {
        return this.$store.getters.getInfos.user.role;
      }
      return false;
    },
  },
};
</script>
