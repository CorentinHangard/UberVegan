<template>
  <v-container>
    <v-card max-width="600" class="mx-auto" align="center" flat>
      <v-col>
        <v-row align="center" justify="center">
          <v-col>
            <span style="font-size:60px;font-weight:bold">
              {{ this.menu.name }}
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col
            ><span style="font-size:18px">{{
              this.menu.description
            }}</span></v-col
          >
        </v-row>
        <v-row align="center" justify="center">
          <v-col
            ><span style="font-size:18px"
              >Prix : {{ this.menu.price }} €</span
            ></v-col
          >
        </v-row>
        <br />
      </v-col>
    </v-card>
    <br />
    <v-card class="mx-5" flat>
      <v-row>
        <v-col><h2 class="center">Articles</h2></v-col>
      </v-row>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="3"
          lg="3"
          v-for="item in this.menu.articles"
          :key="item"
        >
          <Article :id="item" :restoId="menu.restaurantId" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import Article from "@/components/Article.vue";
export default {
  components: {
    Article,
  },
  props: ["id"],
  data() {
    return {
      menu: {},
    };
  },
  async created() {
    await this.$store.dispatch("menu", {
      infos: { id: this.$props.id },
    });
    this.menu = this.$store.getters.getMenu;
  },
};
</script>
