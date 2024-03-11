"use strict";
//
import { fetchData } from "./api.js";
import { getTime } from "./module.js";
//
const $detailContainer = document.querySelector("[data-detail-container]");
ACCESS_POINT += `/${window.location.search.slice(
  window.location.search.indexOf("=") + 1
)}`;
fetchData(null, (data) => {
  const {
    images: { LARGE, REGULAR, SMALL, THUMBNAIL },
    label: title,
    source: author,
    ingredients = [],
    ingredientLines = [],
    totaltime: cookingTime = 0,
    calories = 0,
    cuisineType = [],
    dietLabels = [],
    dishType = [],
    yield: servings = 0,
    uri,
  } = data.recipe;
  //
  const banner = LARGE ?? REGULAR ?? SMALL ?? THUMBNAIL;
  const { url: bannerUrl, width, height } = banner;
  const tags = [...cuisineType, ...dietLabels, ...dishType];
  let tagElements = "";
  let ingredientItems = "";
  const recipeID = uri.slice(uri.lastIndexOf("_") + 1);
  const isSaved = window.localStorage.getItem(
    `masterKIEF-recipeId : ${recipeID}`
  );
  tags.map((tag) => {
    let type = "";
    if (cuisineType.includes(tag)) {
      type = "cuisineType";
    } else if (dietLabels.includes(tag)) {
      type = "diet";
    } else {
      type = "dishType";
    }
    tagElements += `
    <a
      href="../html/recipes.html?${type}=${tag.toLowerCase()}"
      class="filter-chip label-large has-state"
      >${tag}</a
    >
    `;
  });
  ingredientLines.map((ingredient) => {
    ingredientItems += `
      <li class="ingredients-item">${ingredient}</li>
    `;
  });
  $detailContainer.innerHTML = `
    <figure class="detail-banner img-holder">
      <img
        src="${bannerUrl}"
        alt="${title}"
        width="${width}"
        height="${height}"
        class="img-cover"
      />
    </figure>
    <div class="detail-content">
      <div class="title-wrapper">
        <h1 class="display-small">${title ?? "N/A"}</h1>
          <button class="btn btn-secondary has-sate has-icon ${
            isSaved ? "saved" : "removed"
          }
            onclick="saveRecipe(this,'${recipeID}')"
          ">
            <span
              class="material-symbols-outlined bookmark-add"
              aria-hidden="true"
              >bookmark_add
            </span>
            <span
              class="material-symbols-outlined bookmark"
              aria-hidden="true"
              >bookmark
            </span>
            <span class="label-large saved-text">Save</span>
            <span class="label-large unsaved-text">Unsaved</span>
          </button>
      </div>
      <div class="detail-author label-large">
        <div class="span">by</div>
        ${author}
      </div>
      <div class="detail-stats">
        <div class="stats-item">
          <span class="display-medium">${ingredients.length}</span>
          <span class="label-medium">Ingredients</span>
        </div>
        <div class="stats-item">
          <span class="display-medium">${
            getTime(cookingTime).time || "<1"
          }</span>
          <span class="label-medium">${getTime(cookingTime).timeUnit}</span>
        </div>
        <div class="stats-item">
          <span class="display-medium">${Math.floor(calories)}</span>
          <span class="label-medium">Calories</span>
        </div>
      </div>
      ${tagElements ? `<div class="tag-list">${tagElements}</div>` : ""}
      <h2 class="title-medium ingredients-title">
        Ingredients
        <span class="label-medium">for ${servings} servings</span>
      </h2>
      ${
        ingredientItems
          ? `<ul class="body-large ingredients-list">${ingredientItems}</ul>`
          : ""
      }
    </div>
  `;
});
