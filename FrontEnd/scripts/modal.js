// Variables globales
const modalContainer = document.querySelector(".modalContainer");
const modalGalerie = document.getElementById("modal-1");
const containerWorks = document.querySelector(".containerWorks");
const buttonModalGalerie = document.querySelector("#modal-1 .button");
const modalAjoutPhoto = document.getElementById("modal-2");
const closeButtons = document.querySelectorAll(".closeButton");
const returnButton = document.querySelector(".returnButton");

// Quand on clique sur modifier la modale s'ouvre
modification.addEventListener("click", () => {
  modalContainer.classList.remove("displayNone");

  //condition mise pour que la modale affichée soit toujours la première
  if (modalAjoutPhoto.classList !== "displayNone") {
    modalAjoutPhoto.classList.add("displayNone");
    modalGalerie.classList.remove("displayNone");
  }
  addListenerToModalAjoutPhoto();
  addListenerToModalGalerie();
  closeModals();
  addPhotoForm();
});

// Récupération des images dans l'API pour modale galerie
function recuperationWorks(works) {
  containerWorks.innerHTML = "";

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
    resetFormAddPhoto();
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
      sendApiDeleteWorks(id);
    });
  });
}

async function sendApiDeleteWorks(id) {
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
      console.log("Projet supprimé avec succès");
      afficherProjet(works);
      recuperationWorks(works);
      //réinitialise la fonction
      deleteWorks();
    } else {
      console.error("Erreur lors de la suppression du projet");
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

// Partie envoi d'un nouveau projet

// Récupération des éléments du formulaire

const containerAddPhoto = document.querySelector(".containerAddPhoto");
const formPhotoUpload = document.querySelector(".formPhotoUpload");
const fileInput = document.getElementById("fileInput");
const addTitle = document.getElementById("title");
const selectCategories = document.getElementById("category");
const formButtonAddNewWorks = document.getElementById("formButtonAddNewWorks");
const errorMessagePhoto = document.querySelector(".fileTypeSize");
const errorMessageForm = document.querySelector(".errorMessageForm");

// Ajout d'une photo dans le formulaire

function addPhotoForm() {
  fileInput.addEventListener("change", (e) => {
    const file = fileInput.files[0];
    if (
      file &&
      (file.type === "image/jpg" || file.type === "image/png") &&
      file.size <= 4 * 1024 * 1024
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        containerAddPhoto.classList.add("displayNone");
        formPhotoUpload.src = e.target.result;
        formPhotoUpload.classList.remove("displayNone");
      };

      reader.readAsDataURL(file);
    } else {
      errorMessagePhoto.innerText =
        "Veuillez sélectionner une image JPG ou PNG de moins de 4 Mo";
      errorMessagePhoto.classList.add("errorMessage");
    }
  });
}

// reinitialise le formulaire ajout photo

function resetFormAddPhoto() {
  fileInput.value = "";
  addTitle.value = "";
  containerAddPhoto.classList.remove("displayNone");
  formPhotoUpload.src = "";
  formPhotoUpload.classList.add("displayNone");
  errorMessagePhoto.innerText = "jpg, png : 4mo max";
  errorMessagePhoto.classList.remove("errorMessage");
  errorMessageForm.innerText = "";
}

// Choix des categories dans modale ajout photo
function selectCategoriesForm(categories) {
  selectCategories.innerHTML = "";
  categories.forEach((category) => {
    const optionCategory = document.createElement("option");
    optionCategory.value = category.id;
    optionCategory.innerText = category.name;
    selectCategories.appendChild(optionCategory);
  });
}

// Envoi du formulaire

const formAddNewWorks = document.getElementById("formAddNewWorks");

function sendNewWorks() {
  formAddNewWorks.addEventListener("input", () => {
    if (
      fileInput.value !== "" &&
      addTitle.value !== "" &&
      selectCategories.value !== ""
    ) {
      formButtonAddNewWorks.classList.add("buttonModalActive");
      formButtonAddNewWorks.classList.remove("buttonModalDisable");
    } else {
      formButtonAddNewWorks.classList.remove("buttonModalActive");
      formButtonAddNewWorks.classList.add("buttonModalDisable");
    }
  });

  formAddNewWorks.addEventListener("submit", (e) => {
    if (
      fileInput.value !== "" &&
      addTitle.value !== "" &&
      selectCategories.value !== ""
    ) {
      e.preventDefault();
      fetchSendWorks();
    } else {
      e.preventDefault();
      errorMessageForm.innerText = "Veuillez remplir tous les champs";
      errorMessageForm.classList.add("errorMessage");
    }
  });
}

async function fetchSendWorks() {
  const formData = new FormData(formAddNewWorks);
  try {
    const response = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenSave}`,
      },
      body: formData,
    });

    if (response.ok) {
      const works = await fetchWorks();
      console.log("Projet envoyé avec succès");
      afficherProjet(works);
      recuperationWorks(works);
      modalContainer.classList.add("displayNone");
      deleteWorks();
    } else {
      console.error("Erreur lors de l'envoi du projet'");
    }
  } catch (error) {
    console.error("erreur lors de la requête :", error);
  }
}
