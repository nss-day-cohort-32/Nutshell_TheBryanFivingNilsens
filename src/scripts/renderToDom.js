/*
Author: Colin Sandlin
Purpose: Render data to the DOM
Date: 5/9/19
*/

// EXAMPLES OF TARGETS
// const primary = document.querySelector("#primary-container");
// const newsContainer = document.querySelector("#news-container");

function renderToDom(target, frag) {
    target.appendChild(frag);
}

export default renderToDom;