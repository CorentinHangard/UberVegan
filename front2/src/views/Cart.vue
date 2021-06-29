<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-list-item-group>
      <template>
        <v-list-item v-for="item in menus" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.price }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-divider></v-divider>
        </v-list-item>
      </template>
    </v-list-item-group>
    <v-btn @click="commander()">
      Commander
    </v-btn>
    <v-btn>
      payer
    </v-btn>
    <v-btn @click="reset()">
      Reset
    </v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    commander() {
      var articlesListId = [];
      var totalPrice = 0;
      for (let index = 0; index < this.menus.length; index++) {
        if (this.menus[index].price) {
          totalPrice += this.menus[index].price;
        }
        for (
          let index2 = 0;
          index2 < this.menus[index].articles.length;
          index2++
        ) {
          articlesListId.push(this.menus[index].articles[index2]);
        }
      }
      console.log(this.menus[0].restaurantId);
      const payload = {
        restaurantId: this.menus[0].restaurantId,
        articlesListId: articlesListId,
        totalPrice: totalPrice,
      };
      this.$store
        .dispatch("commandCreate", {
          infos: payload,
        })
        .finally(() => {
          this.$router.push({
            name: "command",
            params: { id: this.$store.getters.getCommand.order._id },
          });
        });
    },
    // payer() {},
    reset() {
      this.$store.dispatch("resetCart").finally(() => {
        this.$router.push("/");
      });
    },
  },
  async created() {
    const cartItems = this.$store.getters.getCart;
    for (let index = 0; index < cartItems.length; index++) {
      await this.$store.dispatch("menu", {
        infos: { id: cartItems[index].id },
      });
      this.menus.push(this.$store.getters.getMenu);
    }
  },
};
</script>
