<template>
  <v-container>
    <v-card max-width="800" class="mx-auto" align="center" flat>
      <v-col>
        <v-row align="center" justify="center">
          <v-col
            ><span style="font-size:60px;font-weight:bold">{{
              this.restaurant.name
            }}</span></v-col
          >
        </v-row>
        <br v-if="getUserRole" />
        <v-row align="center" justify="center">
          <v-col>
            <v-btn v-if="getUserRole" :to="{ name: 'menuCreate' }">
              Créer un menu
            </v-btn>
          </v-col>
          <v-col>
            <v-btn v-if="getUserRole" :to="{ name: 'articleCreate' }">
              Créer un article
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="getUserRole">
          <v-col>
            <span>Nombre de commandes passé : </span>
            <span style="font-size:15px;font-weight:bold">
              {{ this.nombreDeCommandes }}
            </span>
          </v-col>
        </v-row>
        <br v-if="getUserRole" />
      </v-col>
    </v-card>
    <br />
    <v-card class="mx-5" flat>
      <v-row>
        <v-col><h2 class="center">Menus</h2></v-col>
      </v-row>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="3"
          lg="3"
          v-for="item in menus"
          :key="item._id"
        >
          <Menu
            v-bind="item"
            :name="item.name"
            :description="item.description"
            :src="item.img"
            :id="item._id"
            :restoId="item.restaurantId"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
      nombreDeCommandes: 0,
    };
  },

  computed: {
    getUserRole() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {
        if (this.$store.getters.getInfos.user.role === 3) {
          if (this.user.profile) {
            if (this.restaurant.profileId === this.user.profile._id) {
              return true;
            }
          }
        }
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

    if (this.$store.getters.getInfos.user.role === 3) {
      await this.$store.dispatch("statsCommand");
      this.nombreDeCommandes = this.$store.getters.getStats.f;
    }
  },
};
</script>
