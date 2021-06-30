<template>
  <div>
    <v-alert
      v-if="isMessage"
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
    <v-container width="75vw">
      <v-row>
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
  },
  mounted() {
    this.socket.on("MESSAGE", (data) => {
      this.isMessage = true;
      this.message = data.message;
    });
  },

  data() {
    return {
      loading: false,
      isMessage: false,
      restaurants: [],
      message: "",
      socket: io("localhost:3005"),
    };
  },
};
</script>
