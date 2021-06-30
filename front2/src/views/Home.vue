<template>
<div>
      <v-alert v-if="sponsor == true && getUserConnected"
     type="info"
     icon="mdi-account-cowboy-hat"
     dismissible
     max-width="600"
     justify="center"
     align="center"
     class="mx-auto my-4"
     >
     Bonus parrainage actif, 10% sur votre prochaine commande
    </v-alert>
  <v-container width="75vw">
    <v-row>
      <v-alert
        type="info"
        icon="mdi-account-cowboy-hat"
        dismissible
        max-width="600"
        justify="center"
        align="center"
        class="mx-auto my-4"
      >
        {{ message }}
      </v-alert>
      <v-col
        xs="12"
        sm="6"
        md="3"
        lg="3"
        v-for="item in restaurants"
        :key="item.id"
      >
        <Restaurant
          v-bind="item"
          :name="item.name"
          :description="item.description"
          :src="item.img"
          :cod="item.costOfDelivery"
          :id="item._id"
        />
      </v-col>
    </v-row>
  </v-container>
</div>

</template>

<script>
import io from "socket.io-client";
import Restaurant from "@/components/Restaurant.vue";

export default {
  components: {
    Restaurant,
  },
  async created() {
    await this.$store.dispatch("restaurants");
    this.restaurants = this.$store.getters.getRestaurants;
    console.log(this.restaurants);
  },
  computed: {
    getUserConnected() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {

  mounted() {
    this.socket.on("MESSAGE", (data) => {
      this.message = data.message;
    });
  },

  data() {
    return {
      loading: false,
      restaurants: [],
      message: "",
      socket: io("localhost:3005"),
    };
  },


};
</script>
