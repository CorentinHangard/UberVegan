<template>
  <v-row justify="center" align="center">
    <v-card
      class="mx-auto my-4"
      max-width="374"
      v-for="deliverie in deliveries"
      :key="deliverie.id"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      

      <v-card-title>{{ deliverie.restaurant[0].name }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-home</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.restaurant[0].address }}
          </div>
        </v-row>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-phone</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.restaurant[0].phoneNumber }}
          </div>
        </v-row>
        <div class="my-4 text-subtitle-1">
          Prix de la commande : {{ deliverie.order[0].totalPrice }} euros
        </div>
        <v-divider class="mx-4"></v-divider>
      </v-card-text>
      <v-card-title>Information du client</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-home</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.user.profile.address }}
          </div>
        </v-row>
        <v-row align="center" class="mx-0">
          <v-icon>mdi-phone</v-icon>
          <div class="grey--text ms-4">
            {{ deliverie.user.profile.phoneNumber }}
          </div>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="refuseDelivery(deliverie)" color="error"> Refuser </v-btn>
        <v-spacer />
        <v-btn @click="acceptDelivery(deliverie)" color="success"> Accepter </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  middleware: ["auth", "livreurMiddleware"],
  layout: "livreurLayout",

  data() {
    return {
      loading: false,
      deliveries: [
        {
          _id: "60d9c8e38e73234f2cf75cd9",
          profileId: "60d9c89881099f5388b4ca0e",
          orderId: "60d9c8a61104692e4c4e1285",
          delivererId: null,
          status: "created",
          __v: 0,
          user: {
            profile: {
              _id: "60d9c89881099f5388b4ca0e",
              fullName: "livreur",
              phoneNumber: 600000000,
              address: "1 rue ff",
              sponsorCode: "31nxlwl",
              sponsor: null,
              userId: "11",
              __v: 0,
            },
            user: {
              usr_id: 11,
              usr_email: "user@c.c",
              usr_password: "123456",
              usr_status: 1,
              rol_id: 1,
            },
          },
          order: [
            {
              content: ["60d99f7a95ea9f46c0405a13", "60d9a05484bc294488a97cfe"],
              _id: "60d9c8a61104692e4c4e1285",
              restaurantId: "60d9852d02aa4a0948123b54",
              profileId: "60d9c89881099f5388b4ca0e",
              totalPrice: 45,
              status: "created",
              date: "2021-06-28T13:03:34.279Z",
              __v: 0,
            },
          ],
          restaurant: [
            {
              _id: "60d9852d02aa4a0948123b54",
              profileId: "60d9852d02aa4a0948123b53",
              name: "Burger King",
              description: "Coucou",
              img: "http://img",
              rating: null,
              costOfDelivery: "3.00",
              preparationTime: 15,
              __v: 0,
            },
          ],
        },
        {
          _id: "60d9c8e38e73234f2cf75cd9",
          profileId: "60d9c89881099f5388b4ca0e",
          orderId: "60d9c8a61104692e4c4e1285",
          delivererId: null,
          status: "created",
          __v: 0,
          user: {
            profile: {
              _id: "60d9c89881099f5388b4ca0e",
              fullName: "livreur",
              phoneNumber: 600000000,
              address: "1 rue ff",
              sponsorCode: "31nxlwl",
              sponsor: null,
              userId: "11",
              __v: 0,
            },
            user: {
              usr_id: 11,
              usr_email: "user@c.c",
              usr_password: "123456",
              usr_status: 1,
              rol_id: 1,
            },
          },
          order: [
            {
              content: ["60d99f7a95ea9f46c0405a13", "60d9a05484bc294488a97cfe"],
              _id: "60d9c8a61104692e4c4e1285",
              restaurantId: "60d9852d02aa4a0948123b54",
              profileId: "60d9c89881099f5388b4ca0e",
              totalPrice: 45,
              status: "created",
              date: "2021-06-28T13:03:34.279Z",
              __v: 0,
            },
          ],
          restaurant: [
            {
              _id: "60d9852d02aa4a0948123b54",
              profileId: "60d9852d02aa4a0948123b53",
              name: "La pizzeta",
              description: "Coucou",
              img: "http://img",
              rating: null,
              costOfDelivery: "3.00",
              preparationTime: 15,
              __v: 0,
            },
          ],
        },
        {
          _id: "60d9c8e38e73234f2cf75cd9",
          profileId: "60d9c89881099f5388b4ca0e",
          orderId: "60d9c8a61104692e4c4e1285",
          delivererId: null,
          status: "created",
          __v: 0,
          user: {
            profile: {
              _id: "60d9c89881099f5388b4ca0e",
              fullName: "livreur",
              phoneNumber: 600000000,
              address: "1 rue ff",
              sponsorCode: "31nxlwl",
              sponsor: null,
              userId: "11",
              __v: 0,
            },
            user: {
              usr_id: 11,
              usr_email: "user@c.c",
              usr_password: "123456",
              usr_status: 1,
              rol_id: 1,
            },
          },
          order: [
            {
              content: ["60d99f7a95ea9f46c0405a13", "60d9a05484bc294488a97cfe"],
              _id: "60d9c8a61104692e4c4e1285",
              restaurantId: "60d9852d02aa4a0948123b54",
              profileId: "60d9c89881099f5388b4ca0e",
              totalPrice: 45,
              status: "created",
              date: "2021-06-28T13:03:34.279Z",
              __v: 0,
            },
          ],
          restaurant: [
            {
              _id: "60d9852d02aa4a0948123b54",
              profileId: "60d9852d02aa4a0948123b53",
              name: "Fujiya Sushi",
              description: "Coucou",
              img: "http://img",
              rating: null,
              costOfDelivery: "3.00",
              preparationTime: 15,
              __v: 0,
            },
          ],
        },
      ],
    };
  },
  mounted () {
    /*axios.
      post("/ms-deliveries/all")
      .then(response => (this.deliveries = response))*/

  },
  methods: {
    acceptDelivery(deliverie) {
      axios.put("/ms-deliveries/accept", "", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      /* console.log(deliverie._id);
      deliverie.order[0].status = "accept";
      console.log(deliverie.order[0].status); */
    },

    refuseDelivery(deliverie) {
      /* console.log(deliverie.order[0].status);
      deliverie.order[0].status = "refuse";
      console.log(deliverie.order[0].status); */
      axios.put("/ms-deliveries/refuse", "", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
    },
  },
};
</script>
