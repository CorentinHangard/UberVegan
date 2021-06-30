<template>
<v-card max-width="1000" class="mx-auto pa-5" align="center" flat>
   <h1 class="center">Historique des commandes</h1>
 <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th >Date</th>
          <th >Restaurant</th>
          <th >Détails de la commande</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in commandHistory" :key="item._id">
          <td>{{ item.date }}</td>
          <td>{{ item.restaurant.name }}</td>
          <td>
            <v-btn @click.stop="$set(dialogDetails, item._id, true)">
              Details
            </v-btn>
            <v-dialog
              v-model="dialogDetails[item._id]"
              :key="item._id"
              width="600"
              persistent
            >
              <div v-bind:style="{ backgroundColor: color }">
                <v-card-title> Commande du {{ item.date }} </v-card-title>
                <v-card-text>
                  {{ item.restaurant.name }}
                  <br />
                  {{item.prix}}
                  <br />
                  <div v-for="article in item.articles" :key="article.id">
                    {{ article.name }}
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click.stop="$set(dialogDetails, item._id, false)"
                    >Close</v-btn
                  >
                </v-card-actions>
              </div>
            </v-dialog>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
 
</template>
<script>
export default {
  data() {
    return {
      commandHistory: [],
      dialogDetails: {},
      color: "white",
    };
  },
  async created() {
    await this.$store.dispatch("commands");
    this.commandHistory = this.$store.getters.getCommands;
    const updatedCommandHistory = [];

    for (let index = 0; index < this.commandHistory.length; index++) {
      updatedCommandHistory[index] = {
        ...this.commandHistory[index],
        articles: [],
        restaurant: [],
      };

      await this.$store.dispatch("restaurant", {
        infos: { id: this.commandHistory[index].restaurantId },
      });
      updatedCommandHistory[
        index
      ].restaurant = this.$store.getters.getRestaurant;

      for (
        let index2 = 0;
        index2 < this.commandHistory[index].content.length;
        index2++
      ) {
        await this.$store.dispatch("article", {
          infos: {
            id: this.commandHistory[index].content[index2],
          },
        });
        updatedCommandHistory[index].articles.push(
          this.$store.getters.getArticle
        );
      }
    }
    this.commandHistory = updatedCommandHistory;
  },
};
</script>
