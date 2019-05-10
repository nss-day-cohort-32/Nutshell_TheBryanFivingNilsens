import API from "./dbCalls"

function createNewsCards(news, container) {
    const location = container;
    const frag = document.createDocumentFragment();
    const newsCard = document.createElement("div");
    newsCard.setAttribute("id", `news-${news.id}-card`);
    newsCard.setAttribute("class", "news-card");

    const newsImgContainer = document.createElement("div"); newsImgContainer.setAttribute("class", "news-image-container");

    const image = document.createElement("img");
    image.setAttribute("src", `${news.url}`);

    const newsInfoContainer = document.createElement("div"); newsInfoContainer.setAttribute("class", "news-info-container");

    const newsName = document.createElement("h2");
    newsName.innerText = `${news.name}`;

    const newsDate = document.createElement("h5");
    newsDate.innerText = `${news.newsDate}`

    const newsLocation = document.createElement("h6");
    newsLocation.innerText = `Location: ${news.location}`;

    const newsDescr = document.createElement("p");
    newsDescr.innerText = `${news.description}`;

    newsImgContainer.appendChild(image);
    newsCard.appendChild(newsActionContainer);
    newsCard.appendChild(newsImgContainer);
    newsCard.appendChild(newsInfoContainer);
    newsInfoContainer.appendChild(newsName);
    newsInfoContainer.appendChild(newsDate);
    newsInfoContainer.appendChild(newsLocation);
    newsInfoContainer.appendChild(newsDescr);
    frag.appendChild(newsCard);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

const createFriendsNews = () => {
    const $newsContainer = document.querySelector("#news-container")
    const friendsNews = API.getFriendsNews(1)
    console.log()
    friendsNews.forEach(event => {
        createNewsCards(event, $newsContainer)
    })
}

export default createFriendsNews

// sessionStorage.getItem(activeUser)