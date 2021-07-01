<template>
  <v-card align="center" class="pb-5">
    <v-img height="150" v-bind:src="img"></v-img>
    <v-row align="center" class="px-5">
      <v-col cols="8" align="left">
        <v-card-title class="px-0">{{ article.name }}</v-card-title>
      </v-col>
      <v-col cols="4" align="right">{{ article.price }} €</v-col>
    </v-row>
    <v-card-text>
      <v-row>
        <v-col align="left">{{ article.description }}</v-col>
      </v-row>
    </v-card-text>
    <v-btn
      color="info"
      v-if="getUserRole"
      :to="{ name: 'articleEdit', params: { id: id } }"
    >
      Modifier
    </v-btn>
  </v-card>
</template>

<script Lang="ts">
export default {
  props: ["id", "restoId"],
  data() {
    return {
      article: {},
    };
  },
  computed: {
    img() {
      // return this.src != "img"
      //   ? require("@/assets/restaurants/" + this.src)
      //   : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
      return require("@/assets/restaurants/cafe.jpg");
    },
    getUserRole() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {
        if (this.$store.getters.getInfos.user.role === 3) {
          if (this.$store.getters.getUser.restaurant) {
            if (
              this.$props.restoId === this.$store.getters.getUser.restaurant._id
            ) {
              return true;
            }
          }
        }
      }

      return false;
    },
  },
  async created() {
    await this.$store.dispatch("article", {
      infos: { id: this.$props.id },
    });
    this.article = this.$store.getters.getArticle;
  },
};
</script>

<style></style>
