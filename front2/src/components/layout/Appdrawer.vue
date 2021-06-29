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
  props: ["clipped", "drawer", "isCon"],
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
