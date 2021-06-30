<template>
  <div class="checkout-box">
    <ul class="checkout-list" v-if="menus.length">
      <transition-group name="fade">
        <li v-for="item in menus" :key="item.menu._id" class="checkout-product">
          <h3 class="product-name">{{ item.menu.name }}</h3>
          <span class="product-count">Q: {{ item.count }}</span>
          <span class="product-price">{{ item.menu.price }} €</span>
        </li>
      </transition-group>
    </ul>
    <div v-if="!menus.length" class="checkout-message">
      <h3>Pas d'article...</h3>
      <router-link to="/">Retour vers la page principale</router-link>
    </div>
    <h3 class="total" v-if="menus.length">Total: {{ totalPrice }} €</h3>
    <v-card v-if="menus.length" align="right" flat>
      <v-btn @click="reset()">
        Annuler
      </v-btn>
      <v-btn @click="commander()" class="ml-5">
        Commander
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      totalPrice: 0,
    };
  },
  methods: {
    commander() {
      var articlesListId = [];
      var totalPrice = 0;
      for (let index = 0; index < this.menus.length; index++) {
        if (this.menus[index].menu.price) {
          totalPrice += this.menus[index].menu.price;
        }
        for (
          let index2 = 0;
          index2 < this.menus[index].menu.articles.length;
          index2++
        ) {
          articlesListId.push(this.menus[index].menu.articles[index2]);
        }
      }

      const payload = {
        restaurantId: this.menus[0].menu.restaurantId,
        articlesListId: articlesListId,
        totalPrice: totalPrice,
      };
      this.$store
        .dispatch("commandCreate", {
          infos: payload,
        })
        .finally(() => {
          this.$store
            .dispatch("commandPay", {
              infos: { id: this.$store.getters.getCommand.order._id },
            })
            .finally(() => {
              this.$router.push({
                name: "command",
                params: { id: this.$store.getters.getCommand.order._id },
              });
            });
        });
    },
    reset() {
      this.$store.dispatch("resetCart");
      this.menus = this.$store.getters.getMenu;
    },
  },
  async created() {
    const cartItems = this.$store.getters.getCart;
    for (let index = 0; index < cartItems.length; index++) {
      await this.$store.dispatch("menu", {
        infos: { id: cartItems[index].id },
      });
      this.totalPrice +=
        cartItems[index].count * this.$store.getters.getMenu.price;
      this.menus.push({
        menu: this.$store.getters.getMenu,
        count: cartItems[index].count,
      });
    }
  },
};
</script>

<style scoped>
.checkout-box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}
.checkout-list {
  padding: 0;
}
.checkout-product {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: 0.8em;
  margin: 1em 0;
}
.checkout-product * {
  place-self: center;
}
.product-image {
  grid-column: 1/2;
  width: 50%;
}
.product-name {
  box-sizing: border-box;
  width: 60%;
}
.product-price {
  font-size: 1.2em;
  font-weight: bold;
}
.product-remove {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  background-color: #e0e0e0;
  color: #fff;
  cursor: pointer;
}
.total {
  font-size: 2em;
  font-weight: bold;
  align-self: flex-end;
}
.checkout-message {
  font-size: 1.5em;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
