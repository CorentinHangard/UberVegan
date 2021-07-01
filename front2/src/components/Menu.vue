<template>
  <v-card max-width="400" class="mx-auto pa-5" align="center">
    <v-alert type="success" v-if='isValid'>Menu ajouté au panier</v-alert>
    <router-link
      :to="{ name: 'menu', params: { id: id } }"
      style="text-decoration: none; color: inherit;"
    >
      <v-img height="150" v-bind:src="img"></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col align="left">{{ description }}</v-col>
          <v-col align="right">{{ price }} €</v-col>
        </v-row>
      </v-card-text>
    </router-link>
    <v-divider />
    <br />
    <v-row>
      <v-col>
        <v-btn color="success" @click="ajoutCart">
          Ajouter au panier
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="error" v-if="getUserRole" @click="supprimer">
          Supprimer
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script Lang="ts">
export default {
  data(){
    return {
      isValid: false
    }
  },
  props: ["name", "description", "src", "price", "id", "restoId"],
  methods: {
    ajoutCart() {
      this.$store
        .dispatch("cart", { infos: { id: this.id, count: 1 } })
        .finally();
      this.isValid = true
    },
    supprimer() {
      this.$store.dispatch("menuDelete", { infos: { id: this.id } }).finally();
    },
  },
  computed: {
    img() {
      // return this.src != "img"
      //   ? require("@/assets/restaurants/" + this.src)
      //   : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.timeout.fr%2Fparis%2Frestaurants%2Ftrouver-un-restaurant-romantique&psig=AOvVaw07LZ0BQppe9IHAOkFC5tY5&ust=1625048270208000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDP47rOvPECFQAAAAAdAAAAABAD";
      return require("@/assets/restaurants/sushi.jpg");
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
};
</script>

<style></style>
