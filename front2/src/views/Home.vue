<template>
  <div>
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
import Restaurant from "@/components/Restaurant.vue";

export default {
  components: {
    Restaurant,
  },
  async created() {
    await this.$store.dispatch("restaurants");
    this.restaurants = this.$store.getters.getRestaurants;
  },

  data() {
    return {
      loading: false,
      isMessage: false,
      restaurants: [],
    };
  },
};
</script>
