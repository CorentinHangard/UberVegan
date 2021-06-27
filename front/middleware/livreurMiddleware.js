export default function({ redirect }) {
    if (localStorage.getItem("role") != 2 ) {
      return redirect("/interdit");
    }
  }
  