export default function({ redirect }) {
  if (localStorage.getItem("role") != 3 ) {
    return redirect("/interdit");
  }
}
