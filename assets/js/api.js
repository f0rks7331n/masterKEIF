"use strict";
window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "YOUR_API_ID";
const APP_KEY = "YOUR_API_KEY";
const TYPE = "public";
//
export const fetchData = async function (queries, successCallback) {
  const query = queries
    ?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");
  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${APP_KEY}&type=${TYPE}${
    query ? `&${query}` : ""
  }`;
  const response = await fetch(url);
  //
  if (response.ok) {
    const data = await response.json();
    successCallback(data);
  }
  console.log(response);
};
