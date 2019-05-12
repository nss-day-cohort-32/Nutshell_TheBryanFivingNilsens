/*
Author: Colin Sandlin
Purpose: Gather and Display News on the news page
Date: 5/9/19
*/

import API from "./dbCalls";



const newsPage = {
    getUserNews(userId) {
        API.getUserNews(userId).then(news => {
            console.log(news);
            news.forEach(newz => {
                newsPage.createNewsCards(newz);
            })
        })
    },
    createNewsCards(newz) {
        const location = document.querySelector("#primary-container");
        const frag = document.createDocumentFragment();
        const newsCard = document.createElement("div");
        newsCard.setAttribute("id", `news-${newz.id}-card`);
        newsCard.setAttribute("class", "news-card");

        const newsActionContainer = document.createElement("div");
        newsActionContainer.setAttribute("class", "news-action-container");

        const editButton = document.createElement("i");
        editButton.setAttribute("class", "fas fa-pen edit-news-btn");
        editButton.setAttribute("id", `news-edit-btn--${newz.id}`);
        const deleteButton = document.createElement("i")
        deleteButton.setAttribute("class", "far fa-times-circle news-delete-btn");
        deleteButton.setAttribute("id", `news-delete-btn--${newz.id}`);

        const newsImgContainer = document.createElement("div"); newsImgContainer.setAttribute("class", "news-image-container");

        const image = document.createElement("img");
        image.setAttribute("src", `${newz.url}`);

        const newsInfoContainer = document.createElement("div"); newsInfoContainer.setAttribute("class", "news-info-container");

        const newsName = document.createElement("h2");
        newsName.innerText = `${newz.title}`;

        const newsDate = document.createElement("h5");
        newsDate.innerText = `${newz.dateAdded}`;


        const newsDescr = document.createElement("p");
        newsDescr.innerText = `${newz.synopsis}`;

        newsActionContainer.appendChild(editButton);
        newsActionContainer.appendChild(deleteButton);
        newsImgContainer.appendChild(image);
        newsCard.appendChild(newsActionContainer);
        newsCard.appendChild(newsImgContainer);
        newsCard.appendChild(newsInfoContainer);
        newsInfoContainer.appendChild(newsName);
        newsInfoContainer.appendChild(newsDate);
        newsInfoContainer.appendChild(newsDescr);
        frag.appendChild(newsCard);
        let finalOutput = location.appendChild(frag);
        return finalOutput;
    },
    createAddNewsButton() {
        const location = document.querySelector("#primary-container");
        location.innerHTML += `
        <div id="new-news-btn" class="">
            <svg id="create-new-news-btn"xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="64" height="64"
            viewBox="0 0 192 192"
            style=" fill:#000000;"><g transform=""><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#1abc9c"><path d="M96,9.07617c-22.275,0 -44.55,8.47383 -61.5,25.42383c-33.9,33.9 -33.9,89.1 0,123c16.95,16.95 39.3,25.5 61.5,25.5c22.2,0 44.55,-8.55 61.5,-25.5c33.9,-33.9 33.9,-89.1 0,-123c-16.95,-16.95 -39.225,-25.42383 -61.5,-25.42383zM96,18c19.95,0 39.90117,7.64883 55.20117,22.79883c30.3,30.45 30.3,79.95234 0,110.40234c-30.45,30.45 -79.95,30.45 -110.25,0c-30.45,-30.45 -30.45234,-79.95234 -0.15234,-110.40234c15.3,-15.15 35.25117,-22.79883 55.20117,-22.79883zM96,63c-2.55,0 -4.5,1.95 -4.5,4.5v24h-24c-2.55,0 -4.5,1.95 -4.5,4.5c0,2.55 1.95,4.5 4.5,4.5h24v24c0,2.55 1.95,4.5 4.5,4.5c2.55,0 4.5,-1.95 4.5,-4.5v-24h24c2.55,0 4.5,-1.95 4.5,-4.5c0,-2.55 -1.95,-4.5 -4.5,-4.5h-24v-24c0,-2.55 -1.95,-4.5 -4.5,-4.5z"><rect x="0" y="0" width="100%" height="100%" fill="none" /><a xlink:href="https://smashingmagazine.com/" target="_blank" cursor="pointer" pointer-events="all"></path></g></g></g></svg>
        </div>
        `

    },
    renderNewsForm() {
        const location = document.querySelector("#primary-container");
        location.innerHTML += `
        <div id="news-form">
            <h1>Create News Article:</h1>
            <div>
                <input type="text" id="news-title" placeholder="News title">
            </div>
            <div>
                <input type="date" id="news-date">
            </div>
            <div>
                <input type="text" id="news-image" placeholder="News Image URL">
            </div>
            <div>
                <input type="text" id="news-user-id" class="hidden">
            </div>
            <div>
                <input type="text" id="news-id" class="hidden">
            </div>
            <div>
                <textArea type="text" id="news-desc" placeholder="News synopsis"></textArea>
            </div>
            <div>
                <input type="submit" id="submit-new-news" class="">
            </div>
        </div>`;
    },
    captureNewNewsData() {
        const newNewsTitle = document.querySelector("#news-title").value;
        const newNewsDate = document.querySelector("#news-date").value;
        const newNewsImg = document.querySelector("#news-image").value;
        const newNewsUserId = sessionStorage.getItem("activeUser");
        const newNewsUserIdNum = parseInt(newNewsUserId);
        const newNewsDesc = document.querySelector("#news-desc").value;


        const newNewsObj = {
            userId: newNewsUserIdNum,
            title: newNewsTitle,
            synopsis: newNewsDesc,
            dateAdded: newNewsDate,
            url: newNewsImg
        }
        console.log(newNewsObj);
        return newNewsObj;
    },
    newNewsSuccessMsg() {
        const userId = sessionStorage.getItem("activeUser");
        const location = document.querySelector("#primary-container");
        location.innerHTML = `
        <div id="news-success-msg">
            <h1>Success!</h1>
        </div>`
        setTimeout(() => {
            location.innerHTML = "";
            newsPage.createAddNewsButton();
            newsPage.getUserNews(userId);
        }, 2000)
    },
    populateExistingNewsData(newsId) {
        const location = document.querySelector("#primary-container");
        location.innerHTML = "";
        newsPage.renderNewsForm();
        const submitButton = document.querySelector("#submit-new-news");
        submitButton.setAttribute("id", "edited-news-submission-btn");
        API.getSingleUserNews(newsId).then(results => {
            console.log(results);
            for (let key in results) {
                if (results.hasOwnProperty(key)) {
                    document.querySelector("#news-title").value = results.title;
                    document.querySelector("#news-date").value = results.dateAdded;
                    document.querySelector("#news-image").value = results.url;
                    document.querySelector("#news-desc").value = results.synopsis;
                    document.querySelector("#news-id").value = results.id;
                };
            }
        })
    },
    captureEditedNewsData() {
        const editedNewsTitle = document.querySelector("#news-title").value;
        const editedNewsDate = document.querySelector("#news-date").value;
        const editedNewsImg = document.querySelector("#news-image").value;
        const editedNewsUserId = sessionStorage.getItem("activeUser");
        const editedNewsUserIdNum = parseInt(editedNewsUserId);
        const editedNewsDesc = document.querySelector("#news-desc").value;
        const editedNewsId = document.querySelector("#news-id").value;


        const editedNewsObj = {
            userId: editedNewsUserIdNum,
            title: editedNewsTitle,
            synopsis: editedNewsDesc,
            dateAdded: editedNewsDate,
            url: editedNewsImg,
            id: editedNewsId
        }
        return editedNewsObj;
    }
}



export default newsPage;

