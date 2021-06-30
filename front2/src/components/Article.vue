<template>
  <v-card>
    <v-img height="150" v-bind:src="img"></v-img>
    <v-card-title>{{ article.name }}</v-card-title>
    <v-card-text>
      <div>
        {{ article.description }}
        {{ article.price }}
      </div>
    </v-card-text>
    <v-btn v-if="getUserRole" :to="{ name: 'articleEdit', params: { id: id } }">
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
      return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
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
