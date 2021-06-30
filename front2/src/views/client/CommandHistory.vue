<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Restaurant</th>
          <th class="text-left">Détails de la commande</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in commandHistory" :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.restaurant }}</td>
          <td>
            <v-btn @click.stop="$set(dialogDetails, item.id, true)">
              Details
            </v-btn>
            <v-dialog
              v-model="dialogDetails[item.id]"
              :key="item.id"
              width="600"
              persistent
            >
              <div v-bind:style="{ backgroundColor: color }">
                <v-card-title> Commande du {{ item.date }} </v-card-title>
                <v-card-text>
                  {{ item.restaurant }}
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
                    @click.stop="$set(dialogDetails, item.id, false)"
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
</template>
<script>
export default {
  data() {
    return {
      commandHistory: [
        {
          id: 1,
          date: "03-06-199",
          restaurant: "1 rue du sel",
          articles: [
            {
              id: 1,
              name: " 1 menu B12",
            },
            {
              id: 2,
              name: " 2 menu C12",
            },
          ],
        },
        {
          id: 2,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 3,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 4,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 5,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 6,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 7,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 8,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 9,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
        {
          id: 10,
          date: "03-06-199",
          restaurant: "1 rue du sel",
        },
      ],
      dialogDetails: {},
      color: "white",
    };
  },
};
</script>