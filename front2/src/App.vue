<template>
  <v-app id="app">
    <appbar :isConnectedVal="isConnectedFunc" />
    <appfooter />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Appbar from "./components/layout/Appbar.vue";
import Appfooter from "./components/layout/Appfooter.vue";

export default Vue.extend({
  name: "App",

  components: {
    Appbar,
    Appfooter
  },

  computed: {
    isConnectedFunc() {
      return this.$store.getters.isConnected;
    },
  },

  data: () => ({
    
  }),
});

</script>
