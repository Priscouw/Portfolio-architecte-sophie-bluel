// Variables globales
const divGallery = document.querySelector(".gallery");
const divFilters = document.querySelector(".filters");

// Récupération des projets
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
}

// Récupération des catégories pour boutons
async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return response.json();
}

// Boucle qui crée les éléments dans la div .gallery
function afficherProjet(projet) {
  // Nettoyer la galerie avant d'ajouter de nouveaux projets
  divGallery.innerHTML = "";
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

// Créer les boutons de filtres
function createCategoryButtons(category) {
  for (let i = 0; i < category.length; i++) {
    const btn = document.createElement("button");
    divFilters.appendChild(btn);
    btn.innerText = category[i].name;
    btn.dataset.id = category[i].id;
    btn.classList.add("button");
  }
}

// Gérer les événements des boutons de filtres
function filterButtons(works) {
  const btnFilters = document.querySelectorAll(".filters .button");

  btnFilters.forEach((btnFilter) => {
    btnFilter.addEventListener("click", (event) => {
      const categoryId = event.target.getAttribute("data-id");
      btnFilters.forEach((btn) => {
        btn.classList.remove("buttonSelected");
      });

      // Ajouter la classe 'buttonSelected' au bouton cliqué
      event.target.classList.add("buttonSelected");

      if (categoryId == 0) {
        afficherProjet(works);
      } else {
        const projetFiltre = works.filter(function (work) {
          return work.categoryId == categoryId;
        });
        afficherProjet(projetFiltre);
      }
    });
  });
}

// Initialiser l'application
async function init() {
  try {
    const works = await fetchWorks();
    afficherProjet(works);

    const categories = await fetchCategories();
    createCategoryButtons(categories);

    filterButtons(works);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
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
  buttonLogin.href = "";
  buttonLogin.innerText = "logout";
  bannerEdition.classList.remove("displayNone");
  modification.classList.remove("displayNone");
  divFilters.classList.add("displayNone");

  portfolioTitle.style.marginLeft = "6rem";

  buttonLogin.addEventListener("click", () => {
    tokenSave = localStorage.removeItem("token");
  });
}
