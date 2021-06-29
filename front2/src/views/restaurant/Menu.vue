<template>
  <v-col>
    <v-row>
      <h1 class="center">{{ this.menu.name }}</h1>
    </v-row>
    <v-row>
      <h1 class="center">{{ this.menu.description }}</h1>
    </v-row>
    <v-row>
      <h1 class="center">{{ this.menu.price }}</h1>
    </v-row>
    <v-row v-for="item in this.menu.articles" :key="item">
      <Article :id="item" />
    </v-row>
  </v-col>
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
    console.log(this.menu);
  },
};
</script>
