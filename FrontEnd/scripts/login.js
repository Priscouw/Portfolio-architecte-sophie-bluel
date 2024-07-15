// Récupération des éléments du formulaire

const formLogIn = document.querySelector("#login");
const email = document.getElementById("email");
const mdp = document.getElementById("mdp");

// Appel de la fonction fetch avec toutes les informations nécessaires
async function fetchLogin() {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: mdp.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      window.localStorage.setItem("token", token);
      document.location.href = "./index.html";
    } else {
      alert("Erreur dans l’identifiant ou le mot de passe");
      mdp.value = "";
      email.value = "";
    }
  } catch (error) {
    console.error("erreur lors de la requête :", error);
  }
}

formLogIn.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchLogin();
});
