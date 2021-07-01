<template>
  <div class="checkout-box">
    <h2>Les livraisons disponibles :</h2>
    <div v-if="deliveries.length === 0" class="pt-5 pl-10">
      <h3>Pas de livraison pour le moment...</h3>
      <!-- <router-link to="/">Retour vers la page principale</router-link> -->
    </div>
    <v-row>
      <v-col v-for="deliverie in deliveries" :key="deliverie._id">
        <v-card class="mx-auto my-4" max-width="374">
          <v-card-title>{{ deliverie.restaurant[0].name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-icon>mdi-home</v-icon>
              <div class="grey--text ms-4">
                {{ deliverie.restaurant[0].address }}
              </div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              Prix de la commande :
              <span style="font-weight:bold">{{
                deliverie.order[0].totalPrice
              }}</span>
              €
            </div>
            <v-divider class="mx-4"></v-divider>
          </v-card-text>
          <v-card-title>Information client</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-icon>mdi-account</v-icon>
              <div class="grey--text ms-4">
                {{ deliverie.user.profile.fullName }}
              </div>
            </v-row>
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

          <v-card-title>
            Statut commande :
            <v-chip
              class="ml-1"
              v-if="deliverie.status === 'created'"
              color="light-blue lighten-2"
              >{{ deliverie.status }}</v-chip
            >
            <v-chip
              class="ml-1"
              v-if="deliverie.status === 'refused'"
              color="red darken-1"
              >{{ deliverie.status }}</v-chip
            >
          </v-card-title>

          <v-card-actions>
            <v-btn @click="refuseDelivery(deliverie)" color="error">
              Refuser
            </v-btn>
            <v-spacer />
            <v-btn @click="acceptDelivery(deliverie)" color="success">
              Accepter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
    acceptDelivery(deliverie) {
      this.$store.dispatch("deliveryAccept", {
        infos: { id: deliverie._id },
      });
      window.location.reload();
    },

    refuseDelivery(deliverie) {
      this.$store.dispatch("deliveryRefuse", {
        infos: { id: deliverie._id },
      });
      window.location.reload();
    },
  },
  async created() {
    await this.$store.dispatch("deliveries");
    const deliveries = this.$store.getters.getDeliveries;
    for (let index = 0; index < deliveries.length; index++) {
      if (
        deliveries[index].status !== "delivered" &&
        deliveries[index].status !== "took" &&
        deliveries[index].status !== "accepted"
      ) {
        this.deliveries.push(deliveries[index]);
      }
    }
  },
};
</script>

<style scoped>
.checkout-box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}
.checkout-message {
  font-size: 1.5em;
}
</style>
