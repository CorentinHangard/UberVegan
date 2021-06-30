export default function({ redirect }) {
    if (this.$store.getters.getInfos.user.role != 2 ) {
      return redirect("/interdit");
    }
  }
  