// Variables globales
const divGallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Récupération des projets
async function init() {
  try {
    const works = await fetch("http://localhost:5678/api/works").then((works) =>
      works.json()
    );

    // Boucle qui créer les éléments dans la div .gallery

    function genererProjet(projet) {
      for (let i = 0; i < projet.length; i++) {
        // création des figures
        const figureGallery = document.createElement("figure");
        divGallery.appendChild(figureGallery);

        // Images des travaux
        const imgGallery = document.createElement("img");
        figureGallery.appendChild(imgGallery);
        imgGallery.src = projet[i].imageUrl;
        imgGallery.alt = projet[i].title;

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

    for (let i = 0; i < categories.length; i++) {
      const btn = document.createElement("button");
      filters.appendChild(btn);
      btn.innerText = categories[i].name;
      btn.dataset.id = categories[i].id;
      btn.classList.add("button");
    }

    const btnFilters = document.querySelectorAll(".filters .button");

    // Au clic de chaque bouton

    btnFilters.forEach((btnFilter) => {
      btnFilter.addEventListener("click", (event) => {
        const categoryId = event.target.getAttribute("data-id");
        btnFilters.forEach((btn) => {
          btn.classList.remove("buttonSelected");
        });

        // Ajouter la classe 'buttonSelected' au bouton cliqué
        event.target.classList.add("buttonSelected");

        if (categoryId == 0) {
          divGallery.innerHTML = "";
          genererProjet(works);
        } else {
          const projetFiltre = works.filter(function (work) {
            return work.categoryId == categoryId;
          });
          divGallery.innerHTML = "";
          genererProjet(projetFiltre);
        }
      });
    });
  } catch (error) {
    console.error("erreur : ", error);
  }
}

init();

// Récupération du token

const tokenSave = localStorage.getItem("token");

const buttonLogin = document.querySelector(".login");
const bannerEdition = document.querySelector(".bannerEdition");
const modification = document.querySelector(".modification");
const portfolioTitle = document.querySelector("#portfolio h2");

// Si token existe, ce style apparait :

if (tokenSave) {
  bannerEdition.style.display = "flex";
  buttonLogin.href = "";
  buttonLogin.innerText = "logout";
  filters.style.display = "none";
  modification.style.display = "flex";
  portfolioTitle.style.marginLeft = "6rem";

  buttonLogin.addEventListener("click", () => {
    tokenSave = localStorage.removeItem("token");
  });
}
