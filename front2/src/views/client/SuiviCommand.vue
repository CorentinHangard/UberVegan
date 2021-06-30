<template>
  <v-row justify="center" align="center">
    <v-card
      class="mx-auto my-4"
      max-width="374"
      v-for="deliverie in deliveries"
      :key="deliverie.id"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>{{ deliverie.restaurant[0].name }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-home</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.restaurant[0].address }}
          </div>
        </v-row>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-phone</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.restaurant[0].phoneNumber }}
          </div>
        </v-row>
        <div class="my-4 text-subtitle-1">
          Prix de la commande : {{ deliverie.order[0].totalPrice }} euros
        </div>
        <v-divider class="mx-4"></v-divider>
      </v-card-text>
      <v-card-title>Information du livreur</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-home</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.user.profile.address }}
          </div>
        </v-row>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-phone</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.user.profile.phoneNumber }}
          </div>
        </v-row>
      </v-card-text>
      <v-card-title>Information de la commande :</v-card-title>
      <v-card-text>{{ deliverie.status }}</v-card-text>
     
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  middleware: ["auth", "livreurMiddleware"],
  layout: "livreurLayout",

  data() {
    return {
      loading: false,
      deliveries: [],
    };
  },
  methods: {

  },
  async created() {
    await this.$store.dispatch("deliveries");
    const del = this.$store.getters.getDeliveries;
    const user = this.$store.getters.getDeliveries;

    for (let index = 0; index < del.length; index++) {
        this.deliveries.push(del[index]);
      
    }

    console.log(this.deliveries);
  },
};
</script>
