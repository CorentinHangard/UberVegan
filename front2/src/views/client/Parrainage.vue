<template>
  <v-card max-width="1000" class="mx-auto pa-5" align="center" flat>
    <v-row justify="center" align="center">
      <v-container>
        <h1 class="center">Parrainer un utilisateur</h1>
        <div align="center" class="padding">
          <v-text>
            Envoyez votre code promotionnel et bénéficiez d'une réduction sur
            vos courses. À chaque fois qu'un passager s'inscrit avec votre code
            d'invitation, il obtient une réduction sur sa course (le montant de
            la réduction dépend du lieu).
          </v-text>
          <br />
          <img src="../../assets/parrainage.png" />
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
  </v-card>
</template>
<script>
export default {
  middleware: "auth",
  layout: "restaurateurLayout",
  components: {},

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
        testingCodeToCopy.setAttribute("type", "hidden");
        var msg = successful ? "successful" : "unsuccessful";
        alert("Code de parrainage copié :)");
      } catch (err) {
        alert("Oups ! Impossible de copier le code :(");
      }

      /* unselect the range */

      window.getSelection().removeAllRanges();
    },
  },
};
</script>