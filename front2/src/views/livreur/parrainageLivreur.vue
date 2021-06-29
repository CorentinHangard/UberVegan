<template>
  <v-row justify="center" align="center">
    <v-container>
      <h1 class="center">Parrainer un livreur</h1>
      <div align="center" class="padding">
        <v-text
          >Envoyez votre code promotionnel et bénéficiez d'une réduction sur vos
          courses. À chaque fois qu'un livreur s'inscrit avec votre code
          d'invitation, il bénéficiera d'une réduction sur la location de son
          sac de transport.
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
  middleware: ["auth", "livreurMiddleware"],
  layout: "livreurLayout",
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
      console.log(testingCodeToCopy);
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
