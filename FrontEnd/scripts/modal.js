import { fetchProjets } from "./projets.js";

//constantes
const token = localStorage.getItem("token");
//Elements du DOM
const modalContainer = document.querySelector(".modalContainer");
const modalOpenButtons = document.querySelectorAll(".editButton");

//! fonction pour l'ouverture de la modal
function toggleModal() {
  modalContainer.classList.toggle("active");
  createModalMiniGalerie();
}

// Écouteurs d'événements pour ouvrir la modal
modalOpenButtons.forEach((btn) => btn.addEventListener("click", toggleModal));

//! fonction de création de la modal en mode mini galerie (1er affichage)
function createModalMiniGalerie() {
  let htmlModale = `<div class="modal" aria-hidden="true" role="dialog" aria-labelledby="titlemodal"></div>`;
  modalContainer.innerHTML = htmlModale;
  const modal = document.querySelector(".modal");

  // Création des éléments de la modal
  // modal Header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modalHeader");

  const returnButton = document.createElement("a");
  returnButton.classList.add("fa-solid", "fa-arrow-left");

  const closeButton = document.createElement("a");
  closeButton.classList.add("fa-solid", "fa-xmark");

  //modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modalBody");

  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("modalTitle");
  modalTitle.textContent = "Galerie photo";

  //modal section
  const modalSectionGallery = document.createElement("div");
  modalSectionGallery.classList.add("modalSectionGallery");

  //! Affichage des projets dans la modale
  // Fonction qui génère l'affichage de la modale
  function afficherProjets(projets) {
    modalSectionGallery.innerHTML = "";

    projets.forEach(function (projet) {
      const projetElement = document.createElement("figure");
      const imageElement = document.createElement("img");

      const deleteButton = document.createElement("a");
      deleteButton.classList.add("fa-solid", "fa-trash-can");

      imageElement.src = projet.imageUrl;
      const imageId = projet.id; //on stock l'id de l'image pour pouvoir appeler la delete

      projetElement.appendChild(imageElement);
      modalSectionGallery.appendChild(projetElement);
      projetElement.appendChild(deleteButton);

      //! suppression de l'image au clic sur l'icone trash
      deleteButton.addEventListener("click", deleteImage);

      async function deleteImage() {
        const deleteUrl = `http://localhost:5678/api/works/${imageId}`;

        // Envoyez une requête DELETE à l'URL de suppression
        const response = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("Suppression réussie");
          //suppression de l'image de la mini galerie
          projetElement.remove();

          //suppression de l'image de la galerie principale
          const selecteur = ".figure" + imageId;
          const elementGaleriePrincipale = document.querySelector(selecteur);
          elementGaleriePrincipale.remove();
        } else {
          console.log("La suppression du projet a échoué.");
        }
      }
    });
  }

  //déclaration de l'objet projets
  let projets = [];

  //affichage des images dans la modale par appel de la fonction
  fetchProjets().then(function (data) {
    projets = data;
    afficherProjets(projets);
  });

  //création des éléments de la modale (trait, bouton)
  const hr = document.createElement("hr");

  const addPictureButton = document.createElement("button");
  addPictureButton.classList.add("addPictureButton");
  addPictureButton.textContent = "Ajouter une photo";

  //!structure de la modal
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  modalHeader.appendChild(returnButton);
  modalHeader.appendChild(closeButton);
  modalBody.appendChild(modalTitle);
  modalBody.appendChild(modalSectionGallery);
  modalBody.appendChild(hr);
  modalBody.appendChild(addPictureButton);

  //!evenement au clic sur ajouter une image
  addPictureButton.addEventListener("click", addImage);

  //! ajouter une image
  function addImage() {
    //suppressions de la section galerie et remplacement par la section ajout d'image
    //actualise les éléments suivant :

    modalHeader.classList.add("active");
    returnButton.classList.add("active");

    modalTitle.textContent = "Ajout photo";
    addPictureButton.disabled = true; //desactive le bouton
    modalSectionGallery.remove();
    const modalSectionAddImage = document.createElement("Div");
    modalSectionAddImage.classList.add("modalSectionAddImage");
    modalBody.appendChild(modalSectionAddImage);
    modalBody.appendChild(hr);
    modalBody.appendChild(addPictureButton);

    let htmlAjoutImg = `      
      <div class="addImgContainer">		      
        <i class="fa-regular fa-image"></i>
        <img class="miniature" src="">
        <div class="divAddButton">
          <p>+ Ajouter photo</p>
          <input type="file" id="image-file" accept="image/png, image/jpeg">
        </div>  
		    <span class="legende">jpg, png : 4mo max</span>
	    </div>      

      <form>
        <label for="titre">Titre</label>
        <input type="text" id="titre">
        <label for="categorie">Catégorie</label>
        <select name="categorie" id="categorie"></select>
      </form>
    `;
    modalSectionAddImage.innerHTML = htmlAjoutImg;

    const iconeImage = document.querySelector(".fa-image");
    const legende = document.querySelector(".legende");
    const miniature = document.querySelector(".miniature");
    const imgAddPicture = document.getElementById("image-file");
    const titreAddPicture = document.getElementById("titre");
    const categorieAddPicture = document.getElementById("categorie");
    const divAddButton = document.querySelector('.divAddButton');
    
    //création des balises "option"
    //on crée une balise option vide pour avoir le champ vide à l'affichage
    const option = document.createElement("option");
    option.value = "";
    option.text = "";
    categorieAddPicture.appendChild(option);
    //créer les balises option pour les catégories
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.text = category.name;
          categorieAddPicture.appendChild(option);
        });
      })
      .catch((error) => console.error("Une erreur s'est produite : " + error));

    //!gestion du bouton return
    returnButton.addEventListener("click", function () {
      modal.remove;
      createModalMiniGalerie();
    });

    //! gestion du bouton addImage
    // écouteur d'événements au clic sur la div qui contient l'input addImage
    divAddButton.addEventListener('click', function() {
    // on simule un clic sur l'élément input
    imgAddPicture.click();
    });

    //!fonction vérifie les champs et réactive le bouton si tout est bien rempli
    function activerBtn() {
      //taille de l'image uplodée en Mo
      const imageEnMo = imgAddPicture.files[0].size / 1048576;
      if (
        titreAddPicture.value.trim() !== "" &&
        categorieAddPicture.value.trim() !== "" &&
        imgAddPicture.files.length > 0 &&
        imageEnMo < 4
      ) {
        addPictureButton.disabled = false;
      }
    }

    //! upload de l'image
    imgAddPicture.addEventListener("change", function () {
      if (imgAddPicture.files.length > 0) {
        const selectedImage = imgAddPicture.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        //taille de l'image uplodée en Mo
        const imageEnMo = imgAddPicture.files[0].size / 1048576;

        miniature.src = imageURL;
        miniature.style.display = "block";
        iconeImage.style.display = "none";
        divAddButton.style.display = "none";

        //Vérification et message d'erreur si image trop grosse
        if (imageEnMo > 4) {
          legende.innerHTML = "La taille de l'image ne doit pas dépassée 4Mo";
          legende.style.color = "red";
        } else {
          imgAddPicture.style.display = "none";
          legende.style.display = "none";
        }
        activerBtn(); //verifie si tout est rempli et active le bouton si c'est le cas
      } else {
        miniature.src = "";
        miniature.style.display = "none";
      }
    });

    // évenement qui appelle la fonction de vérification
    titreAddPicture.addEventListener("input", activerBtn);
    categorieAddPicture.addEventListener("input", activerBtn);

    //!envoi au serveur
    addPictureButton.addEventListener("click", async function () {
      // Construction de FormData
      const formData = new FormData();
      formData.append("title", titreAddPicture.value);
      formData.append("category", categorieAddPicture.value);
      formData.append("image", imgAddPicture.files[0]);

      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Image envoyée avec succès!");

        //! Création/ajout des images dans la galerie principal
        //on récupère l'url et le titre de l'image dans la réponse
        const responseData = await response.json();
        const imageUrl = responseData.imageUrl;
        const titre = responseData.title;

        //on contruit une nouvelle <figure> et on l'insère dans la galerie principale
        const newFigure = document.createElement("Figure");
        const gall = document.querySelector(".gallery");
        gall.appendChild(newFigure);

        //creation d'une classe contenant l'id pour pouvoir cibler l'image
        const classFig = "figure" + responseData.id;
        newFigure.classList.add(classFig);

        let newImageHtml = `
          <img src="${imageUrl}">
          <figcaption>${titre}</figcaption>
        `;
        newFigure.innerHTML = newImageHtml;

        closeModal();
      }
    });
  }

  //! fonction pour la fermeture de la modal
  function closeModal() {
    modal.remove(); //supprime le contenu de la modale
    toggleModal(); //desaffiche la modale
  }

  // Gestion de la fermeture de la modal en cliquant sur closeButton
  closeButton.addEventListener("click", closeModal);

  // Gestion de la fermeture de la modal en cliquant en dehors
  modalContainer.addEventListener("click", function (event) {
    if (event.target === modalContainer) {
      closeModal();
    }
  });

  // Gestion de la fermeture de la modal en cliquant sur echap
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
    }
  });
}
