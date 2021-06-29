<template>
  <v-col>
    <v-row>
      <h1 class="center">{{ this.restaurant.name }}</h1>
    </v-row>
    <br v-if="getUserRole" />
    <router-link :to="{ name: 'menuCreate' }">
      <v-btn v-if="getUserRole">
        Créer un menu
      </v-btn>
    </router-link>
    <router-link :to="{ name: 'articleCreate' }">
      <v-btn v-if="getUserRole">
        Créer un article
      </v-btn>
    </router-link>
    <br />
    <v-row>
      <h2 class="center">Menues</h2>
    </v-row>
    <v-row xs="12" sm="6" md="3" lg="3" v-for="item in menus" :key="item._id">
      <Menu
        v-bind="item"
        :name="item.name"
        :description="item.description"
        :src="item.img"
        :id="item._id"
      />
    </v-row>
  </v-col>
</template>
<script>
import Menu from "@/components/Menu.vue";
export default {
  components: {
    Menu,
  },
  props: ["id"],
  data() {
    return {
      restaurant: {},
      user: {},
      menus: [],
      articles: [],
    };
  },

  computed: {
    getUserRole() {
      const infos = this.$store.getters.getInfos;
      console.log(this.user.profile._id);

      if (infos.user) {
        return this.$store.getters.getInfos.user.role === 3;
      }
      return false;
    },
  },
  async created() {
    await this.$store.dispatch("restaurant", {
      infos: { id: this.$props.id },
    });
    this.restaurant = this.$store.getters.getRestaurant;

    await this.$store.dispatch("menus", {
      infos: { id: this.$props.id },
    });
    this.menus = this.$store.getters.getMenus;

    await this.$store.dispatch("profile");
    this.user = this.$store.getters.getUser;
  },
};
</script>
