<template>
  <v-container>
    <appdrawer :clipped="clipped" :drawer="drawer" :isCon="isConnectedVal" />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link :to="route"
        ><img
          src="@/assets/UberVeganTitle.png"
          style="height: 50%; width: 50%; display: flex"
      /></router-link>
      <v-spacer />
      <v-badge
        color="blue"
        :content="cartCount"
        left
        inline
        v-if="isConnectedVal && role == 1"
      >
        <v-btn icon to="/cart">
          <v-icon> mdi-cart </v-icon>
        </v-btn>
      </v-badge>

      <v-btn v-if="!isConnectedVal" class="info" to="/login">
        Se connecter
      </v-btn>
      <v-menu v-if="isConnectedVal">
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="green" size="40">
              <span class="white--text text-h5">{{ name }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn depressed rounded text to="/profile"> Mon Compte </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout">
                Déconnexion
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
import Vue from "vue";
import Appdrawer from "./Appdrawer.vue";

export default {
  components: {
    Appdrawer,
  },
  props: ["isConnectedVal"],
  methods: {
    logout() {
      this.$store.dispatch("logout").finally(() => {
        this.$router.push("/");
      });
    },
  },

  data: () => {
    return {
      clipped: false,
      drawer: false,
      route: {
        name: "",
        params: {
          id: "",
        },
      },
      role: null,
    };
  },

  mounted() {
    const infos = this.$store.getters.getInfos;
    if (this.$store.getters.getUser.profile) {
      this.name = this.$store.getters.getUser.profile.fullName.charAt(0);
    } else {
      this.name = "D";
    }

    if (infos.user) {
      const role = this.$store.getters.getInfos.user.role;
      this.role = this.$store.getters.getInfos.user.role;
      if (role == 1) {
        this.route.name = "Home";
      } else if (role == 2) {
        this.route.name = "livraison";
      } else if (role == 3) {
        this.route.name = "restaurant";
        this.route.params.id = this.$store.getters.getUser.restaurant._id;
      }
      return true;
    } else {
      this.route.name = "Home";
    }
    return false;
  },
  computed: {
    cartCount() {
      if (this.$store.getters.getCart.length != 0) {
        var count = 0;
        for (
          let index = 0;
          index < this.$store.getters.getCart.length;
          index++
        ) {
          count += this.$store.getters.getCart[index].count;
        }
        return count;
      }
      return "0";
    },
  },
};
</script>
