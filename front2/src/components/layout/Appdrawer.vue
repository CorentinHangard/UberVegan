<template>
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
</template>

<script lang="ts">
import Vue from "vue";
export default {
  props: ["clipped", "drawer"],
  data: () => {
    return {
      fixed: false,
      info: {},
      items: [
        {
          icon: "mdi-truck-delivery",
          title: "Devenir livreur",
          to: {
            name: "authentification-devenirLivreur",
          },
        },
        {
          icon: "mdi-silverware-fork-knife",
          title: "Devenir restaurateur",
          to: {
            name: "authentification-devenirRestaurateur",
          },
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
