"use strict";
//
import { fetchData } from "./api.js";
//
const GROOT = "https://api.edamam.com/api/recipes/v2";
const $snackBarContainer = document.createElement("div");
//
window.addEventOnElements = ($elements, eventType, callback) => {
  for (const $element of $elements) {
    $element.addEventListener(eventType, callback);
  }
};
//
export const cardQueries = [
  ["field", "uri"],
  ["field", "label"],
  ["field", "image"],
  ["field", "totalTime"],
];
export const $skeletonCard = `
<div class="card skeleton-card">
  <div class="skeleton card-banner">
    <div class="card-body">
      <div class="skeleton card-title"></div>
      <div class="skeleton card-text"></div>
    </div>
  </div>
</div>
`;
//
window.saveRecipe = function (element, recipeId) {
  const isSaved = window.localStorage.getItem(
    `masterKIEF-recipeId : ${recipeId}`
  );
  window.ACCES_POINT = `${GROOT}/${recipeId}`;
  //
  if (!isSaved) {
    fetchData(cardQueries, function (data) {
      window.localStorage.setItem(
        `masterKIEF-recipeId : ${recipeId}`,
        JSON.stringify(data)
      );
      element.classList.toggle("saved");
      element.classList.toggle("removed");
      showNotification("Added to recipe book!");
    });
    window.ACCES_POINT = GROOT;
  } else {
    window.localStorage.removeItem(`masterKIEF-recipeId : ${recipeId}`);
    element.classList.toggle("saved");
    element.classList.toggle("removed");
    showNotification("Removed from recipe book!");
  }
};
//
$snackBarContainer.classList.add("snackbar-container");
document.body.appendChild($snackBarContainer);
//
function showNotification(message) {
  const $snackBar = document.createElement("div");
  //
  $snackBar.classList.add("snackbar");
  $snackBar.innerHTML = `
    <p class="body-medium">${message}</p>
  `;
  //
  $snackBarContainer.appendChild($snackBar);
  //
  $snackBar.addEventListener("animationend", (e) =>
    $snackBarContainer.remove($snackBar)
  );
}
