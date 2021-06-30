<template>
  <v-card max-width="400" class="mx-auto pa-5" align="center">
    <v-img height="150" v-bind:src="img"></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <div>{{ description }}</div>
      <div>{{ price }}€</div>
      <v-btn :to="{ name: 'menu', params: { id: id } }">
        Voir
      </v-btn>
      <v-btn @click="ajoutCart">
        Ajouter
      </v-btn>
      <v-btn v-if="getUserRole" @click="supprimer">
        Supprimer
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script Lang="ts">
export default {
  props: ["name", "description", "src", "price", "id", "restoId"],
  methods: {
    ajoutCart() {
      this.$store
        .dispatch("cart", { infos: { id: this.id, count: 1 } })
        .finally();
    },
    supprimer() {
      this.$store.dispatch("menuDelete", { infos: { id: this.id } }).finally();
    },
  },
  computed: {
    img() {
      // return this.src != "img"
      //   ? require("@/assets/restaurants/" + this.src)
      //   : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
      return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
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
