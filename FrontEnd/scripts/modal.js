//! Fonction qui gére l'affichage du bouton "modifier" si l'utilisateur est en ligne
function onlineUi() {
  // On récupére le token et la div ditButton
  const token = localStorage.getItem("token");
  const editButton = document.querySelector(".editButton");
  //condition, si le token utilisateur est présent, affichez le bouton "Mode édition"
  if (token) {
    editButton.classList.toggle("active");
  }
}
onlineUi();

//! création et ouverture/fermeture de la modal
const modalContainer = document.querySelector(".modalContainer");
const modalOpenButton = document.querySelectorAll(".editButton");

modalOpenButton.forEach((btn) => btn.addEventListener("click", toggleModal));

function toggleModal() {
  modalContainer.classList.toggle("active");
}

// Sélectionnez la modal
const modal = document.querySelector(".modal");

// Créez le bouton de fermeture
const closeButton = document.createElement("a");
closeButton.classList.add("fa-solid", "fa-xmark");

// Ajoutez le bouton de fermeture à la modal
modal.appendChild(closeButton);

// Gérez la fermeture de la modal
closeButton.addEventListener("click", function () {
  modalContainer.classList.remove("active");
});

//! Créez la modalSousContainer numéro 1
const modalSousContainerUn = document.createElement("div");
modalSousContainerUn.classList.add("modalSousContainerUn");

// Créez le titre de la modal
const modalTitle = document.createElement("h3");
modalTitle.classList.add("modalTitle");
modalTitle.textContent = "Galerie photo";

// Créez la mini galerie
const miniGallery = document.createElement("div");
miniGallery.classList.add("miniGallery");

// Créez la ligne de séparation (hr)
const hr = document.createElement("hr");

const addPictureButton = document.createElement("button");
addPictureButton.classList.add("addPictureButton");
addPictureButton.textContent = "Ajouter une photo";

// Ajoutez modalTitle, miniGallery, hr et button à modalSousContainer
modalSousContainerUn.appendChild(modalTitle);
modalSousContainerUn.appendChild(miniGallery);
modalSousContainerUn.appendChild(hr);
modalSousContainerUn.appendChild(addPictureButton);

// Ajoutez modalSousContainer à la modal principale
modal.appendChild(modalSousContainerUn);
