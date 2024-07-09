//  const gallery = await fetch("http://localhost:5678/api/works")
//   .then((gallery => gallery.json()) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// Récupération des projets

const works = await fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);

// Boucle qui créer les éléments dans la div .gallery

const divGallery = document.querySelector(".gallery");

function genererProjet(projet) {
  for (let i = 0; i < projet.length; i++) {
    // création des figures
    const figureGallery = document.createElement("figure");
    divGallery.appendChild(figureGallery);

    // Images des travaux
    const imgGallery = document.createElement("img");
    figureGallery.appendChild(imgGallery);
    imgGallery.src = projet[i].imageUrl;

    // Texte des travaux
    const figcaptionGallery = document.createElement("figcaption");
    figcaptionGallery.innerText = projet[i].title;
    figureGallery.appendChild(figcaptionGallery);
  }
}

genererProjet(works);

// Récupération des catégories pour boutons

const categories = await fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);

// boutons filtres

const filters = document.querySelector(".filters");

for (let i = 0; i < categories.length; i++) {
  const btn = document.createElement("button");
  filters.appendChild(btn);
  btn.innerText = categories[i].name;
  btn.id = categories[i].id;
  btn.classList.add("button");
}

const btnFilters = document.querySelectorAll(".filters .button");

btnFilters.forEach((btnFilter) => {
  btnFilter.addEventListener("click", (event) => {
    const categoryId = event.target.id;
    if (categoryId != 0) {
      const projetFiltre = works.filter(function (work) {
        return work.categoryId == categoryId;
      });
      divGallery.innerHTML = "";
      genererProjet(projetFiltre);
    } else {
      divGallery.innerHTML = "";
      genererProjet(works);
    }
  });
});

// const btnId0 = document.querySelector(".filters .button");

// btnId0.addEventListener("click", () => {
//   divGallery.innerHTML = "";
//   genererProjet(works);
// });

// // Pour chaque click sur le bouton

// btnFilters.forEach((btnFilter, index) => {
//   btnFilter.addEventListener("click", () => {
//     const projetFiltre = works.filter(function (work) {
//       return work.categoryId == categories[index - 1].id;
//     });
//     divGallery.innerHTML = "";
//     genererProjet(projetFiltre);
//   });
// });
