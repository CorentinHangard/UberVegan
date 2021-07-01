<template>
  <v-card align="center" class="">
    <router-link
      :to="{ name: 'menu', params: { id: id } }"
      style="text-decoration: none; color: inherit;"
    >
      <v-img height="150" v-bind:src="img"></v-img>
      <v-row align="center" class="px-5">
        <v-col cols="8" align="left">
          <v-card-title class="px-0">{{ name }}</v-card-title>
        </v-col>
        <v-col cols="4" align="right">{{ price }} €</v-col>
      </v-row>
    </router-link>
    <div v-if="isValid">
      <v-divider />
      <br />
    </div>
    <v-row v-if="role == 1">
      <v-col>
        <v-btn color="success" @click="ajoutCart">
          Ajouter au panier
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="getUserRole">
      <v-col>
        <v-btn color="error" @click="supprimer">
          Supprimer
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script Lang="ts">
export default {
  data() {
    return {
      isValid: false,
      role: null,
    };
  },
  props: ["name", "description", "src", "price", "id", "restoId"],
  methods: {
    ajoutCart() {
      this.$store
        .dispatch("cart", { infos: { id: this.id, count: 1 } })
        .finally();
      this.isValid = true;
    },
    supprimer() {
      this.$store.dispatch("menuDelete", { infos: { id: this.id } }).finally();
    },
  },
  mounted() {
    const infos = this.$store.getters.getInfos;
    if (infos.user) {
      this.role = this.$store.getters.getInfos.user.role;
    }
    return 1;
  },
  computed: {
    img() {
      // return this.src != "img"
      //   ? require("@/assets/restaurants/" + this.src)
      //   : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
      return require("@/assets/restaurants/sushi.jpg");
    },
    getUserRole() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {
        if (this.$store.getters.getInfos.user.role === 3) {
          if (this.$store.getters.getUser.restaurant) {
            if (
              this.$props.restoId === this.$store.getters.getUser.restaurant._id
            ) {
              return true;
            }
          }
        }
      }

      return false;
    },
  },
};
</script>

<style></style>
