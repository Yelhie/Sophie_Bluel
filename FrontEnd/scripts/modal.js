import { fetchProjets } from "./projets.js";
const modalOpacity = document.querySelector(".modalOpacity");

//! fonction pour l'ouverture de la modal
// Fonction pour ouvrir la modal
function toggleModal() {
  const modalContainer = document.querySelector(".modalContainer");
  modalContainer.classList.toggle("active");
  modalOpacity.classList.toggle("active");
}

// Écouteurs d'événements pour ouvrir la modal
const modalOpenButtons = document.querySelectorAll(".editButton");
modalOpenButtons.forEach((btn) => btn.addEventListener("click", toggleModal));

//! fonction de création de la modal

// Fonction pour créer la modal
function createModal() {
  const token = localStorage.getItem("token");
  const modalContainer = document.querySelector(".modalContainer");
  const modal = document.querySelector(".modal");

  // Création des éléments de la modal
  const closeButton = document.createElement("a");
  closeButton.classList.add("fa-solid", "fa-xmark");

  const modalSousContainer = document.createElement("div");
  modalSousContainer.classList.add("modalSousContainer");

  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("modalTitle");
  modalTitle.textContent = "Galerie photo";

  const miniGallery = document.createElement("div");
  miniGallery.classList.add("miniGallery");

  //! Affichage des projets dans la modale
  // async function fetchProjets() {
  //   const response = await fetch("http://localhost:5678/api/works");
  //   return await response.json();
  // }

  // Fonction qui génère l'affichage de la page web
  function afficherProjets(projets) {
    miniGallery.innerHTML = "";

    projets.forEach(function (projet) {
      const projetElement = document.createElement("figure");
      const imageElement = document.createElement("img");

      const deleteButton = document.createElement("a");
      deleteButton.classList.add("fa-solid", "fa-trash-can");

      imageElement.src = projet.imageUrl;
      //imageElement.setAttribute("data-image-id", projet.id);
      const imageId = projet.id; //on stock l'id de l'image pour pouvoir appeler la delete

      projetElement.appendChild(imageElement);
      miniGallery.appendChild(projetElement);
      projetElement.appendChild(deleteButton);

      //! suppression de l'image au clic sur l'icone trash
      deleteButton.addEventListener("click", deleteImage);

      function deleteImage() {
        const deleteUrl = `http://localhost:5678/api/works/${imageId}`;

        // Envoyez une requête DELETE à l'URL de suppression
        const response = fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const projetElements = document.querySelector(
            `[data-id="${imageId}"]`
          );
          if (projetElements) {
            projetElements.remove();
          } else {
            console.log(`Le projet avec l'id "${imageId}" n'a pas été trouvé.`);
          }
        } else {
          console.log("La suppression du projet a échoué.");
        }
      }
    });
  }
  let projets = [];

  // affichage de la page
  fetchProjets().then(function (data) {
    projets = data;
    afficherProjets(projets);
  });

  ///////////////
  const hr = document.createElement("hr");

  const addPictureButton = document.createElement("button");
  addPictureButton.classList.add("addPictureButton");
  addPictureButton.textContent = "Ajouter une photo";

  modal.appendChild(closeButton);
  modalSousContainer.appendChild(modalTitle);
  modalSousContainer.appendChild(miniGallery);
  modalSousContainer.appendChild(hr);
  modalSousContainer.appendChild(addPictureButton);
  modal.appendChild(modalSousContainer);

  //! fonction pour la fermeture de la modal
  // Fonction pour gérer la fermeture de la modal
  function closeModal(event) {
    if (event.target === modalContainer || event.target === closeButton) {
      modalContainer.classList.remove("active");
      modalOpacity.classList.remove("active");
    }
  }
  // Gestion de la fermeture de la modal en cliquant sur closeButton
  closeButton.addEventListener("click", closeModal);

  // Gestion de la fermeture de la modal en cliquant en dehors
  modalContainer.addEventListener("click", closeModal);
}

// Appel de la fonction pour créer la modal
createModal();

//! Fonction qui gére l'affichage du bouton "modifier" si l'utilisateur est en ligne
function onlineUi() {
  // On récupére le token et la div ditButton
  const token = localStorage.getItem("token");
  const editButton = document.querySelector(".editButton");
  //condition, si le token utilisateur est présent appliquer la class css active
  if (token) {
    editButton.classList.toggle("active");
  }
}

onlineUi();
