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
        <tr v-for="item in commandHistory" :key="item.id">
          <td style="width : 1%">{{ item.date }}</td>
          <td style="width : 1%">{{ item.restaurant }}</td>
          <td style="width : 1%">
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
</v-card>
 
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
          prix : "50 euros",
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