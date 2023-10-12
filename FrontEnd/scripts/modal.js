//le bouton éditer ne s'affiche que si compte actif. Récupérer l'état connecté via l'api
// fonction condition is co afficher le bouton sinon ne pas afficher le bouton
// afficher la modal
const modalContainer = document.querySelector(".modalContainer");
const modalTriggers = document.querySelectorAll(".modale-btn");
console.log(modalTriggers);

modalTriggers.forEach((btn) => btn.addEventListener("click", toggleModal));

function toggleModal() {
  modalContainer.classList.toggle("active");
}

// création des éléments dans la modal
// appeler le bouton pour fermer la modal ".modale-btn" pour le prendre dans la boucle forEach
