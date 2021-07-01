<template>
  <h1>Doc</h1>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("users");
  },
};
</script>

<style></style>
