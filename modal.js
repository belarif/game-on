"use strict";

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// functions
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

// select location
function selectLocation() {
  const locationList = document.querySelectorAll("input[name='location']");

  let i = 0;
  for (i; i < locationList.length; i++) {
    let location = locationList[i];

    if (location.checked == true) {
      location.setAttribute("checked", "checked");
    }
  }
}

/**
 * effects error
 *
 * @param {string} message
 * @param {object} formData
 * @param {object} field
 * @param {object} span
 */
function errorMessage(message, formData, field, span) {
  const spanElt = document.createElement("span");
  spanElt.textContent = message;
  spanElt.style.color = "#cc0000";
  spanElt.style.fontSize = "1rem";
  formData.appendChild(spanElt);
  field.style.border = "2px solid #cc0000";

  if (span.length > 0) {
    spanElt.remove();
  }
}

// first input validation
function firstValidation() {
  let firstField = document.getElementById("first");
  const errorRemove = document.querySelector(".formData:nth-child(1) span");

  if (!firstField.value.match(/^[a-z]{2,}$/i)) {
    let message =
      "Le prénom doit contenir que des lettres et en avoir au moins 2";
    const formData = document.querySelector(
      ".modal-body .formData:nth-child(1)"
    );
    const span = document.querySelectorAll(".formData:nth-child(1) span");

    errorMessage(message, formData, firstField, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    firstField.style.border = "none";
  }

  return true;
}

// last input validation
function lastValidation() {
  let lastField = document.getElementById("last");
  const errorRemove = document.querySelector(".formData:nth-child(2) span");

  if (!lastField.value.match(/^[a-z]{2,}$/i)) {
    let message = "Le nom doit contenir que des lettres et en avoir au moins 2";
    const formData = document.querySelector(
      ".modal-body .formData:nth-child(2)"
    );
    const span = document.querySelectorAll(".formData:nth-child(2) span");

    errorMessage(message, formData, lastField, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    lastField.style.border = "none";
  }

  return true;
}

// email validation
function emailValidation() {
  let emailField = document.getElementById("email");
  const errorRemove = document.querySelector(".formData:nth-child(3) span");

  if (!emailField.value.match(/^[\w\-.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/)) {
    let message = "Veuillez saisir une adresse email valide";
    const formData = document.querySelector(
      ".modal-body .formData:nth-child(3)"
    );
    const span = document.querySelectorAll(".formData:nth-child(3) span");

    errorMessage(message, formData, emailField, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    emailField.style.border = "none";
  }

  return true;
}

// birthdate validation
function birthdateValidation() {
  let birthdateField = document.getElementById("birthdate");
  const errorRemove = document.querySelector(".formData:nth-child(4) span");

  if (!birthdateField.value.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/)) {
    let message = "Veuillez renseigner votre date de naissance";
    const formData = document.querySelector(
      ".modal-body .formData:nth-child(4)"
    );
    const span = document.querySelectorAll(".formData:nth-child(4) span");

    errorMessage(message, formData, birthdateField, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    birthdateField.style.border = "none";
  }

  return true;
}

// quantity participation validation
function quantityValidation() {
  let quantityField = document.getElementById("quantity");
  const errorRemove = document.querySelector(".formData:nth-child(5) span");

  if (!quantityField.value.match(/^[\d]{1,2}$/)) {
    let message = "Veuillez saisir des chiffres entre 0 et 99";
    const formData = document.querySelector(
      ".modal-body .formData:nth-child(5)"
    );
    const span = document.querySelectorAll(".formData:nth-child(5) span");

    errorMessage(message, formData, quantityField, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    quantityField.style.border = "none";
  }

  return true;
}

// location validation
function locationValidation() {
  const selectedLocation = document.querySelectorAll(
    ".modal-body .formData:nth-child(7) input[checked]"
  );
  const formData = document.querySelector(".modal-body .formData:nth-child(7)");
  const errorRemove = document.querySelector(".formData:nth-child(7) > span");

  if (selectedLocation.length == 0) {
    let message = "Veuillez cocher un tournoi";
    const span = document.querySelectorAll(".formData:nth-child(7) > span");

    errorMessage(message, formData, formData, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    formData.style.border = "none";
  }

  return true;
}

// terms validation
function termsValidation() {
  const terms = document.getElementById("checkbox1");
  const formData = document.querySelector(".modal-body .formData:nth-child(8)");
  const errorRemove = document.querySelector(".formData:nth-child(8) > span");

  if (!terms.checked) {
    let message = "Veuillez accepter les conditions générales";
    const span = document.querySelectorAll(".formData:nth-child(8) > span");

    errorMessage(message, formData, formData, span);

    return false;
  } else if (errorRemove) {
    errorRemove.remove();
    formData.style.border = "none";
  }

  return true;
}

// hide form fields
function hideFields() {
  const form = document.querySelector("form[name='reserve']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Object.values(formData);

    fields.forEach((field) => {
      field.style.display = "none";
    });

    successMessage(form);
  });
}

/**
 * modal success message
 *
 * @param {object} form
 */
function successMessage(form) {
  const successMessage = document.querySelector("form p");

  successMessage.textContent = "Merci pour votre inscription";
  successMessage.style.fontSize = "1.8rem";
  successMessage.style.textAlign = "center";
  successMessage.style.padding = "280px 60px 280px 60px";

  document.querySelector(".btn-submit").value = "Fermer";

  // close modal success message
  form.addEventListener("submit", () => {
    closeModal();
    form.reset();
    location.reload();
  });
}

// inputs validation
function validate() {
  let first = firstValidation(),
    last = lastValidation(),
    email = emailValidation(),
    birthdate = birthdateValidation(),
    quantity = quantityValidation(),
    location = locationValidation(),
    terms = termsValidation();

  if (first && last && email && birthdate && quantity && location && terms) {
    hideFields();
  } else {
    return false;
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);
