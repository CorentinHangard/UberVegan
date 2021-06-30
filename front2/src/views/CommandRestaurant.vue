<template>
  <v-container>
    <v-alert
      v-if="isMessage"
      type="info"
      icon="mdi-account-cowboy-hat"
      dismissible
      max-width="600"
      justify="center"
      align="center"
      class="mx-auto my-4"
    >
      {{ message }}
    </v-alert>
    <v-card
      class="mx-auto mt-10"
      max-width="400"
      align="center"
      flat
      v-if="isCommand"
    >
      <v-row>
        <v-col
          ><h1>Commande n°</h1>
          {{ this.command._id }}</v-col
        >
      </v-row>
      <v-row>
        <v-col><span>Etat de la commande :</span></v-col>
        <v-col>{{ this.command.status }}</v-col>
      </v-row>
      <v-row v-if="inLivraison">
        <v-col><span>Etat de la livraison :</span></v-col>
        <v-col>{{ this.delivery.status }}</v-col>
      </v-row>
      <br />
      <v-btn
        color="green"
        v-if="getUserRoleRestaurateur && !inLivraison"
        @click="valider()"
      >
        valider
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import io from "socket.io-client";
export default {
  props: ["id"],
  data() {
    return {
      command: [],
      delivery: [],
      user: {},
      inLivraison: false,
      message: "",
      isMessage: false,
      isCommand: false,
      socket: io("localhost:3005"),
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
    valider() {
      this.$store.dispatch("commandValid", {
        infos: { id: this.command._id },
      });
      window.location.reload();
    },
  },
  mounted() {
    this.socket.on("MESSAGE", (data) => {
      console.log("took");
      this.isMessage = true;
      this.message = data.message;
    });
  },

  async created() {
    await this.$store.dispatch("commandsRestaurant", {
      infos: { id: this.$props.id },
    });
    this.command = [];
    const commands = this.$store.getters.getCommands;
    for (let index = 0; index < commands.length; index++) {
      if (commands[index].status === "payed") {
        this.isCommand = true;
        this.command = commands[index];
      }
    }
  },
};
</script>
