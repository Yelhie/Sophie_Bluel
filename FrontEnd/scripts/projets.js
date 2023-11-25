// Récupération des informations depuis l'API
export async function fetchProjets() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// Fonction qui génère l'affichage de la page web
function afficherProjets(projets) {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  projets.forEach(function (projet) {
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const titreElement = document.createElement("figcaption");

    //creation d'une classe contenant l'id pour pouvoir cibler l'image
    const classId = "figure" + projet.id;
    // Ajoute la class que si elle n'est pas déjà présente
    if (!projetElement.classList.contains(classId)) {
      projetElement.classList.add(classId);
    }

    imageElement.src = projet.imageUrl;
    titreElement.innerText = projet.title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
    sectionGallery.appendChild(projetElement);
  });
}

// Fonction de filtrage générique
function filtrerProjets(categoryId) {
  const projetsFiltres = projets.filter(function (projet) {
    return projet.categoryId === categoryId;
  });
  afficherProjets(projetsFiltres);
}

let projets = [];

// Premier affichage de la page
fetchProjets().then(function (data) {
  projets = data;
  afficherProjets(projets);
});

// Tableau pour stocker les écouteurs d'événements
const boutonsFiltre = [
  { id: "#btn-tous", categoryId: null },
  { id: "#btn-objets", categoryId: 1 },
  { id: "#btn-appartements", categoryId: 2 },
  { id: "#btn-hotelsrestaurants", categoryId: 3 },
];

// Ajout des écouteurs d'événements à partir du tableau
boutonsFiltre.forEach(function (bouton) {
  const element = document.querySelector(bouton.id);
  element.addEventListener("click", function () {

    fetchProjets().then(function (data) {
      projets = data;

      if (bouton.categoryId === null) {
        afficherProjets(projets);
      } else {
        console.log(projets)
        filtrerProjets(bouton.categoryId);
      }
    });
  });
});

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
