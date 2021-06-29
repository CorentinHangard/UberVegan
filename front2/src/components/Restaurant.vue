<template>
  <v-card>
    <v-img height="150" v-bind:src="img"></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">{{ cod }} € • Cout de livraison</div>

      <div>
        {{ description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script Lang="ts">
export default {
  props: ["name", "description", "src", "cod"],
  computed: {
    img() {
      return this.src != ""
        ? require("@/assets/restaurants/" + this.src)
        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
    },
  },
};
</script>

<style></style>
