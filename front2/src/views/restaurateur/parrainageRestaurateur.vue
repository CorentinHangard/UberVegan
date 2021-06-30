<template>
  <v-row justify="center" align="center">
    <v-container>
      <h1 class="center">Parrainer un restaurateur</h1>
      <div align="center" class="padding">
        <v-text
          >Envoyez votre code promotionnel et bénéficiez d'une réduction sur vos
          courses. À chaque fois qu'un passager s'inscrit avec votre code
          d'invitation, vous pourrez envoyer une commande sans frais de
          livraison (et donc d'être plus compétitif sur les prix 🙂), les frais
          de livraisons seront pour UberVegan !
        </v-text>
        <br />
        <img src="~/assets/images/parrainage.png" />
        <br />
        <span class="title">Votre code de parrainage : </span>
        <span class="code text-red">{{ codeParrainage }}</span>
        <span
          class="btn btn-info text-white copy-btn ml-auto"
          @click.stop.prevent="copyFunction"
        >
          <v-spacer />
          <br />
          <v-btn color="light-green">Copier le code</v-btn>
        </span>
        <input type="hidden" id="testing-code" :value="codeParrainage" />
      </div>
    </v-container>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  middleware: ["auth", "restaurateurMiddleware"],
  layout: "restaurateurLayout",
  components: {
    Logo,
    VuetifyLogo,
  },

  data() {
    return {
      loading: false,
      codeParrainage: "L1R1fezfez59",
    };
  },

  methods: {
    copyFunction() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Code de parrainage copié :)");
      } catch (err) {
        alert("Oups ! Impossible de copier le code :(");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
  },
};
</script>
