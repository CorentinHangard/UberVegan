<template>
  <router-link :to="{ name: 'restaurant', params: { id: id } }">
    <v-card>
      <v-img height="150" v-bind:src="img"></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>
        <div class="my-4 text-subtitle-1">{{ cod }} € • Cout de livraison</div>
        <div>
          {{ description }}
        </div>
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script Lang="ts">
export default {
  props: ["name", "description", "src", "cod", "id"],
  computed: {
    img() {
      return this.src != "img"
        ? require("@/assets/restaurants/" + this.src)
        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
    },
  },
};
</script>

<style></style>
