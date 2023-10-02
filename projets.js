const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

const sectionGallery = document.querySelector(".gallery");

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

//Bouton + Filtre tous
const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
  const imagesTous = projets.filter(function (projets) {
    return projets.categoryId >= 1;
  });
  console.log(imagesTous);
});

//Bouton + Filtre Objets
const boutonObjets = document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {
  const imagesObjets = projets.filter(function (projets) {
    return projets.categoryId == 1;
  });
  console.log(imagesObjets);
});

//Bouton + Filtre Appartements
const boutonAppartements = document.querySelector(".btn-appartements");

boutonAppartements.addEventListener("click", function () {
  const imagesAppartements = projets.filter(function (projets) {
    return projets.categoryId == 2;
  });
  console.log(imagesAppartements);
});

//Bouton + Filtre Hotels & restaurants
const boutonHotelsRestaurants = document.querySelector(
  ".btn-hotelsrestaurants"
);

boutonHotelsRestaurants.addEventListener("click", function () {
  const imagesHotelsRestaurants = projets.filter(function (projets) {
    return projets.categoryId == 3;
  });
  console.log(imagesHotelsRestaurants);
});
