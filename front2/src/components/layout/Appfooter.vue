<template>
  <v-footer color="black" absolute style="bottom:-100px">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="todo in todos"
        v-bind:href="todo.target"
        v-bind:key="todo.link"
        color="white"
        text
        rounded
        class="my-1"
      >
        {{ todo.link }}
      </v-btn>
      <v-col class="text-center white--text" cols="12">
        <strong style="font-size:12px"
          >© {{ new Date().getFullYear() }} UberVegan Inc.</strong
        >
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: "",
  data: () => {
    return {
      todos: [
        { link: "Conditions générales", target: "/CGU" },
        { link: "Politiques de confidentialité", target: "/politique" },
        { link: "Contact", target: "/contact" },
      ],
    };
  },
};
</script>
