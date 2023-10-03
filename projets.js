// Récupération les infos depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

const sectionGallery = document.querySelector(".gallery");

// Fonction qui génère l'affichage la page web
async function listeProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];

    const projetElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const titreElement = document.createElement("figcaption");

    imageElement.src = article.imageUrl;
    titreElement.innerText = article.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titreElement);
  }
}

// Premier affichage de la page
listeProjets(projets);

//Bouton + Filtre tous
const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
  const imagesTous = projets.filter(function () {
    return true;
  });

  document.querySelector(".gallery").innerHTML = "";
  listeProjets(imagesTous);
});

//Bouton + Filtre Objets
const boutonObjets = document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {
  const imagesObjets = projets.filter(function (projets) {
    return projets.categoryId == 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  listeProjets(imagesObjets);
});

//Bouton + Filtre Appartements
const boutonAppartements = document.querySelector(".btn-appartements");

boutonAppartements.addEventListener("click", function () {
  const imagesAppartements = projets.filter(function (projets) {
    return projets.categoryId == 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  listeProjets(imagesAppartements);
});

//Bouton + Filtre Hotels & restaurants
const boutonHotelsRestaurants = document.querySelector(
  ".btn-hotelsrestaurants"
);

boutonHotelsRestaurants.addEventListener("click", function () {
  const imagesHotelsRestaurants = projets.filter(function (projets) {
    return projets.categoryId == 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  listeProjets(imagesHotelsRestaurants);
});
