export default function({ redirect }) {
  // Si l'utilisateur n'est pas connecté
  console.log(localStorage.getItem("isConnected"));
  if (!localStorage.getItem("isConnected")) {
    return redirect("/authentification/connexion");
  }

  // Si le paramètre "isConnected est égale à false ou à "false", on redirige l'utilisateur vers la page de connexion
  if (
    localStorage.getItem("isConnected") == false ||
    localStorage.getItem("isConnected") == "false"
  ) {
    return redirect("/authentification/connexion");
  }
}
