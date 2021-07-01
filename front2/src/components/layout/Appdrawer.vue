<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <div v-if="!isCon" align="center" class="pt-10">
      <v-btn  class="blue" to="/login"> Se connecter </v-btn>
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

<script>
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
            name: "livraison",
          },
        },
        {
          icon: "mdi-bike",
          title: "Mes livraisons",
          to: {
            name: "mesLivraisons",
          },
        },
      ],
      itemsRestaurant: [],
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
            name: "Home",
          },
        },
        {
          icon: "mdi-bike",
          title: "Suivre ma livraison",
          to: {
            name: "command",
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
  async created() {
    if (
      this.$store.getters.getInfos.user &&
      this.$store.getters.getInfos.user.role === 3
    ) {
      this.itemsRestaurant = [
        {
          icon: "mdi-food",
          title: "Mon restaurant",
          to: {
            name: "restaurant",
            params: { id: this.$store.getters.getUser.restaurant._id },
          },
        },
        {
          icon: "mdi-truck-delivery",
          title: "Commandes",
          to: {
            name: "commandRestaurant",
            params: { id: this.$store.getters.getUser.restaurant._id },
          },
        },
        {
          icon: "mdi-bike",
          title: "Suivre une livraison",
          to: {
            name: "SuiviCommandClient",
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
            name: "ParrainageRestaurateur",
          },
        },
      ];
    }

    if (
      this.$store.getters.getInfos.user &&
      this.$store.getters.getInfos.user.role === 1
    ) {
      this.itemsClient = [
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
            name: "Home",
          },
        },
        {
          icon: "mdi-bike",
          title: "Suivre ma livraison",
          to: {
            name: "command",
            params: { id: this.$store.getters.getCommand._id },
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
      ];
    }
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
