<template>
  <v-row justify="center" align="center">
      <v-card class="mx-auto my-4" max-width="374" v-for="item in items" :key="item.id">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="250"
          v-bind:src="item.img"
        ></v-img>

        <v-card-title>{{ item.titre }}</v-card-title>

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

          <div class="my-4 text-subtitle-1">{{ item.prix }} • {{ item.categorie }}</div>

          <div>
            {{ item.description }}
          </div>
        </v-card-text>
      </v-card>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  middleware: ["auth", "restaurateurMiddleware"],
  layout: "restaurateurLayout",
  components: {
    Logo,
    VuetifyLogo,
  },

  data(){
    return {
      loading: false,
      items : [
        {
          id: 1,
          img: "cafe.jpg",
          titre: "Café",
          prix: "$",
          description: "Arpeggio, Ristretto, Napoli, venez dévouvrir nos gammes de café à déguster en terrasse.",
          categorie: "Café italien"
        },
        {
          id: 2,
          img: "viande.jpg",
          titre: "Buffalo Grill",
          prix: "$$",
          description: "Grillades, burgers, salades, il y en a pour tous les goûts !",
          categorie: "Grillades"
        },
        {
          id: 3,
          img: "sushi.jpg",
          titre: "Fujiya Sushi",
          prix: "$$$",
          description: "Restaurant japonais avec buffet à volonté, sushi fait maison.",
          categorie: "Buffet à volonté"
        },
      ]
    }
  }
};
</script>
