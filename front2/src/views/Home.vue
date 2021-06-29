<template>
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
          :cod="item.cod"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Restaurant from "@/components/Restaurant.vue";
// import VuetifyLogo from "@/components/VuetifyLogo.vue";

export default {
  components: {
    Restaurant,
    // VuetifyLogo,
  },

  data() {
    return {
      loading: false,
      restaurants: [
        {
          id: 1,
          img: "cafe.jpg",
          name: "Café",
          cod: 3,
          description:
            "Arpeggio, Ristretto, Napoli, venez dévouvrir nos gammes de café à déguster en terrasse.",
          articleList: ["0000"],
        },
        {
          id: 2,
          img: "viande.jpg",
          name: "Buffalo Grill",
          cod: 1,
          description:
            "Grillades, burgers, salades, il y en a pour tous les goûts !",
          articleList: ["0000"],
        },
        {
          id: 3,
          img: "sushi.jpg",
          name: "Fujiya Sushi",
          cod: 2,
          description:
            "Restaurant japonais avec buffet à volonté, sushi fait maison.",
          articleList: ["0000"],
        },
      ],
    };
  },
};
</script>
