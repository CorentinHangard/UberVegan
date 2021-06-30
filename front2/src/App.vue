<template>
  <v-app id="app">
    <appbar :isConnectedVal="isConnectedFunc" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Appbar from "./components/layout/Appbar.vue";
export default Vue.extend({
  name: "App",

  components: {
    Appbar,
  },

  computed: {
    isConnectedFunc() {
      return this.$store.getters.isConnected;
    },
  },

  data: () => ({
    //
  }),
});
</script>
