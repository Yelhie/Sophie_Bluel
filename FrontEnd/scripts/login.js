const login = document.querySelector("#id_buttonlogin");
login.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("id_email").value;
  const password = document.getElementById("id_password").value;

  // Envoi des données à l'API
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Vérifie si le token a été correctement renvoyé par l'API
      if (data.token) {
        // Stocker le token d'authentification localement dans la session de l'utilisateur à l'aide de l'API sessionStorage.
        sessionStorage.setItem("token", data.token);
        // Redirige vers la page d'accueil si la connection est validé
        window.location.href = "../index.html";
      } else {
        // Si les infos sont inccorect ou est vide une alerte est affichée et l'utilisateur est rediriger vers la page de connexion.
        alert("Mot de passe ou adresse mail incorrect");
        window.location.href = "./login.html";
      }
    });
});
