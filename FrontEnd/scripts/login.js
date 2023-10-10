// Fonction qui gère la connexion de l'utilisateur
function logIn() {
  // Sélectionnez les éléments HTML nécessaires
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("id_email");
  const passwordInput = document.getElementById("id_password");
  const errorMessage = document.getElementById("messageerror");

  // Ajoutez un gestionnaire d'événements pour la soumission du formulaire de connexion
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupérez les valeurs des champs email et mot de passe
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    // Créez un objet avec les données d'identification de l'utilisateur
    const userIdentifier = {
      email: emailValue,
      password: passwordValue,
    };

    // Envoyez les données d'identification à l'API pour la connexion
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Convertit l'objet en format JSON
      body: JSON.stringify(userIdentifier),
    })
      .then(function (response) {
        // Analysez la réponse JSON
        return response.json();
      })
      .then(function (identifiers) {
        if (identifiers.token) {
          // Si la connexion réussit, stockez le token dans le local storage
          localStorage.setItem("token", identifiers.token);
          // Redirigez l'utilisateur vers la page d'accueil
          window.location.href = "../index.html";
        } else {
          // Affichez un message d'erreur si les identifiants sont incorrects
          errorMessage.textContent = "Erreur de mot de passe ou d'adresse mail";
          errorMessage.classList.add("error");
        }
      })
      .catch(function (error) {
        // Gérez les erreurs de requête, par exemple en affichant un message d'erreur
        console.error("Erreur lors de la requête:", error);
        errorMessage.textContent =
          "Erreur lors de la connexion. Veuillez réessayer plus tard.";
        errorMessage.classList.add("error");
      });
  });
}

// Appelez la fonction de connexion lors du chargement de la page
logIn();

function logOut() {
  const token = localStorage.getItem("token");
  const loginButton = document.getElementById("login-nav");

  if (token) {
    // L'utilisateur est connecté, affichez le bouton de déconnexion
    loginButton.textContent = "Logout";
    loginButton.addEventListener("click", function () {
      // Effacez le token du local storage
      localStorage.removeItem("token");

      // Redirigez l'utilisateur vers la page de connexion
      window.location.href = "./login.html";
    });
  } else {
    // L'utilisateur n'est pas connecté, affichez le bouton de connexion
    loginButton.textContent = "Login";
    loginButton.addEventListener("click", function () {
      // Redirigez l'utilisateur vers la page de connexion
      window.location.href = "./login.html";
    });
  }
}

// Appelez la fonction de déconnexion
logOut();
