//  const gallery = await fetch("http://localhost:5678/api/works")
//   .then((gallery => gallery.json()) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

// Boucle qui créer les éléments dans la div .gallery

for (let i = 0; i < works.length; i++) {
  const divGallery = document.querySelector(".gallery");

  // création des figures
  const figureGallery = document.createElement("figure");
  divGallery.appendChild(figureGallery);

  // Images des travaux
  const imgGallery = document.createElement("img");
  figureGallery.appendChild(imgGallery);
  imgGallery.src = works[i].imageUrl;

  // Texte des travaux
  const figcaptionGallery = document.createElement("figcaption");
  figcaptionGallery.innerText = works[i].title;
  figureGallery.appendChild(figcaptionGallery);
}
