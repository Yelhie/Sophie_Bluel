// Récupération des informations depuis l'API
async function fetchProjets() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// Fonction qui génère l'affichage de la page web
function afficherProjets(projets) {
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";

  projets.forEach((projet) => {
    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const titreElement = document.createElement("figcaption");

    imageElement.src = projet.imageUrl;
    titreElement.innerText = projet.title;

    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
    sectionGallery.appendChild(projetElement);
  });
}

// Fonction de filtrage générique
function filtrerProjets(categoryId) {
  const sectionGallery = document.querySelector(".gallery");
  const projetsFiltres = projets.filter(
    (projet) => projet.categoryId === categoryId
  );
  afficherProjets(projetsFiltres);
}

let projets = [];

// Premier affichage de la page
fetchProjets().then((data) => {
  projets = data;
  afficherProjets(projets);
});

// Écouteurs d'événements pour les boutons de filtre
document
  .querySelector("#btn-tous")
  .addEventListener("click", () => afficherProjets(projets));
document
  .querySelector("#btn-objets")
  .addEventListener("click", () => filtrerProjets(1));
document
  .querySelector("#btn-appartements")
  .addEventListener("click", () => filtrerProjets(2));
document
  .querySelector("#btn-hotelsrestaurants")
  .addEventListener("click", () => filtrerProjets(3));
