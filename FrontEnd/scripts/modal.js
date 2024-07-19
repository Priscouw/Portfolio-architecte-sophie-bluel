// Variables globales

const containerWorks = document.querySelector(".containerWorks");
const modalContainer = document.querySelector(".modalContainer");
const modalGalerie = document.getElementById("modal-1");
const buttonModalGalerie = document.querySelector("#modal-1 button");
const modalAjoutPhoto = document.getElementById("modal-2");
const crossIcon = document.querySelectorAll(".crossIcon");
const arrowIcon = document.querySelector(".arrowIcon");
const trashIcon = document.querySelectorAll(".trashIcon");

async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
}

// Récupération des images dans l'API
async function recuperationWorks() {
  const works = await fetchWorks();

  works.forEach((work) => {
    // création d'un container pour chaque projet
    const divContainerImg = document.createElement("div");
    divContainerImg.classList.add("containerImg");
    containerWorks.appendChild(divContainerImg);

    // récupération des img des projets
    const imgWorks = document.createElement("img");
    divContainerImg.appendChild(imgWorks);
    imgWorks.src = work.imageUrl;

    // Ajout de l'icone poubelle
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "trashIcon");
    divContainerImg.appendChild(deleteIcon);
  });
}

recuperationWorks();

crossIcon.forEach((cross) => {
  cross.addEventListener("click", () => {
    modalContainer.classList.add("displayNone");
  });
});

// Quand on clique sur modifier la modale apparait, condition mise pour que la modale affichée soit toujours la première
modification.addEventListener("click", () => {
  modalContainer.classList.remove("displayNone");

  if (modalAjoutPhoto.classList !== "displayNone") {
    modalAjoutPhoto.classList.add("displayNone");
    modalGalerie.classList.remove("displayNone");
  }
});

// Quand on clique sur le bouton ajout photo la première modal disparait et la deuxième modale apparait

buttonModalGalerie.addEventListener("click", () => {
  modalGalerie.classList.add("displayNone");
  modalAjoutPhoto.classList.remove("displayNone");
});

arrowIcon.addEventListener("click", () => {
  modalAjoutPhoto.classList.add("displayNone");
  modalGalerie.classList.remove("displayNone");
});
