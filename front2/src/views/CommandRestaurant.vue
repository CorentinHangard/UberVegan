<template>
  <v-container>
    <v-card max-width="1000" class="mx-auto pa-5" align="center" flat>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <!-- <th>Date</th> -->
              <th>ID de la commande</th>
              <th>Statut de la commande</th>
              <th>Statut de la livraison</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in command" :key="item._id">
              <!-- <td>{{ item.date }}</td> -->
              <td>{{ item._id }}</td>
              <td>{{ item.status }}</td>
              <td v-if="item.delivery">{{ item.delivery.status }}</td>
              <td v-if="!item.delivery">Ø</td>
              <td>
                <v-btn
                  @click.stop="$set(dialogDetails, item._id, true)"
                  color="info"
                >
                  Details
                </v-btn>
                <v-btn
                  v-if="item.status === 'payed'"
                  @click="valider(item._id)"
                  class="ml-5"
                  color="success"
                  >Valider</v-btn
                >
                <v-dialog
                  v-model="dialogDetails[item._id]"
                  :key="item._id"
                  width="600"
                  persistent
                >
                  <div v-bind:style="{ backgroundColor: color }">
                    <v-card-title> Commande n° {{ item._id }} </v-card-title>
                    <v-card-text>
                      <span style="font-weight:bold">Date: </span>
                      <span>{{ item.date }}</span>
                      <br />
                      <span style="font-weight:bold"
                        >Status de la commande:
                      </span>
                      <span>{{ item.status }}</span>
                      <br />
                      <span style="font-weight:bold"
                        >Status de la livraison:
                      </span>
                      <span v-if="!item.delivery">Pas encore disponible</span>
                      <span v-if="item.delivery">{{
                        item.delivery.status
                      }}</span>
                      <br />
                      <span style="font-weight:bold">Articles :</span>
                      <br />
                      <div
                        v-for="article in item.articles"
                        :key="article.id"
                        class="ml-2"
                      >
                        - {{ article.name }}
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
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      command: [],
      delivery: [],
      dialogDetails: {},
      user: {},
      inLivraison: false,
      message: "",
      isMessage: false,
      isCommand: false,
      color: "white",
    };
  },
  computed: {
    getUserRoleUser() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {
        if (this.$store.getters.getInfos.user.role === 1) {
          return true;
        }
      }

      return false;
    },
    getUserRoleRestaurateur() {
      const infos = this.$store.getters.getInfos;
      if (infos.user) {
        if (this.$store.getters.getInfos.user.role === 3) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    valider(id) {
      this.$store.dispatch("commandValid", {
        infos: { id: id },
      });
      window.location.reload();
    },
  },

  async created() {
    await this.$store.dispatch("commandsRestaurant", {
      infos: { id: this.$props.id },
    });
    this.command = this.$store.getters.getCommands;
    const updatedCommandHistory = [];

    for (let index = 0; index < this.command.length; index++) {
      updatedCommandHistory[index] = {
        ...this.command[index],
        articles: [],
        restaurant: [],
        delivery: [],
      };

      await this.$store.dispatch("deliveryByOrder", {
        infos: { id: this.command[index]._id },
      });
      updatedCommandHistory[index].delivery = this.$store.getters.getDelivery;

      for (
        let index2 = 0;
        index2 < this.command[index].content.length;
        index2++
      ) {
        await this.$store.dispatch("article", {
          infos: {
            id: this.command[index].content[index2],
          },
        });
        updatedCommandHistory[index].articles.push(
          this.$store.getters.getArticle
        );
      }
    }
    this.command = updatedCommandHistory.reverse();
  },
};
</script>
