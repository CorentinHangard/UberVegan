<template>
  <v-card class="mx-auto" max-width="400" tile>
    <h1>{{ this.command.status }}</h1>
    <v-btn v-if="getUserRoleUser" @click="payer()">
      payer
    </v-btn>
    <v-btn v-if="getUserRoleRestaurateur" @click="valider()">
      valider
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      command: [],
      user: {},
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
    payer() {
      this.$store.dispatch("commandPay", {
        infos: { id: this.command._id },
      });
    },
    valider() {
      this.$store.dispatch("commandValid", {
        infos: { id: this.command._id },
      });
    },
  },
  async created() {
    await this.$store.dispatch("command", {
      infos: { id: this.$props.id },
    });
    this.command = this.$store.getters.getCommand;
  },
};
</script>
