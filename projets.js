const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

const sectionGallery = document.querySelector(".gallery");

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

document.querySelector(".gallery").innerHTML = "";

listeProjets(projets);
