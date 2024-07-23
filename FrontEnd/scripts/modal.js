// Variables globales
const modalContainer = document.querySelector(".modalContainer");
const modalGalerie = document.getElementById("modal-1");
const containerWorks = document.querySelector(".containerWorks");
const buttonModalGalerie = document.querySelector("#modal-1 .buttonmodal");
const modalAjoutPhoto = document.getElementById("modal-2");
const closeButtons = document.querySelectorAll(".closeButton");
const returnButton = document.querySelector(".returnButton");

// Quand on clique sur modifier la modale s'ouvre
modification.addEventListener("click", async () => {
  modalContainer.classList.remove("displayNone");

  //condition mise pour que la modale affichée soit toujours la première
  if (modalAjoutPhoto.classList !== "displayNone") {
    modalAjoutPhoto.classList.add("displayNone");
    modalGalerie.classList.remove("displayNone");
  }
  await recuperationWorks();
  addListenerToModalAjoutPhoto();
  addListenerToModalGalerie();
  closeModals();
  selectCategoriesForm();
  deleteWorks();
});

// Récupération des images dans l'API pour modale galerie
async function recuperationWorks() {
  containerWorks.innerHTML = "";
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
    imgWorks.alt = work.title;

    // Ajout de l'icone poubelle
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteButton.classList.add("deleteButton");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "trashIcon");
    divContainerImg.appendChild(deleteButton);
    deleteButton.appendChild(deleteIcon);
    deleteButton.dataset.trashId = work.id;
  });
}

// Quand on clique sur le bouton ajout photo la deuxième modale apparait

function addListenerToModalAjoutPhoto() {
  buttonModalGalerie.addEventListener("click", () => {
    modalGalerie.classList.add("displayNone");
    modalAjoutPhoto.classList.remove("displayNone");
  });
}

// Clique bouton retour la première modale apparait
function addListenerToModalGalerie() {
  returnButton.addEventListener("click", () => {
    modalAjoutPhoto.classList.add("displayNone");
    modalGalerie.classList.remove("displayNone");
  });
}

// Pour fermer la modale via la croix ou à l'extérieur de la modale

function closeModals() {
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      modalContainer.classList.add("displayNone");
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      modalContainer.classList.add("displayNone");
    }
  });
}

// Coté suppression
function deleteWorks() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.trashId;
      fetchDeleteWorks(id);
    });
  });
}

async function fetchDeleteWorks(id) {
  const tokenSave = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenSave}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const works = await fetchWorks();
      console.log("Photo supprimé avec succès");
      afficherProjet(works);
      recuperationWorks();
    } else {
      console.error("Erreur lors de la suppression de la photo");
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

// Partie envoi d'un nouveau projet

// Choix des categories dans modale ajout photo
async function selectCategoriesForm() {
  const categories = await fetchCategories();
  const selectCategories = document.getElementById("category");

  selectCategories.innerHTML = "";
  categories.forEach((category) => {
    const optionCategory = document.createElement("option");
    optionCategory.value = category.name;
    optionCategory.innerText = category.name;
    selectCategories.appendChild(optionCategory);
  });
}

// async function fetchSendWorks() {
//   try {
//      await fetch("http://localhost:5678/api/users/works", {
//       method: "POST",
//       headers: { "Content-Type": "multipart/form-data" },
//       body: JSON.stringify({
//         image: ,
//         title: title.value,
//         category: selectCategories.value ,
//       }),
//     });
//       } catch (error) {
//     console.error("erreur lors de la requête :", error);
//   }
// }
