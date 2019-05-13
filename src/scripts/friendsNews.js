import API from "./dbCalls"

function createNewsCard(newz, user, container) {
    const location = document.querySelector(`${container}`);
    const frag = document.createDocumentFragment();
    const newsCard = document.createElement("div");
    newsCard.setAttribute("id", `news-${newz.id}-card`);
    newsCard.setAttribute("class", "news-card friends-card");

    const newsActionContainer = document.createElement("div");
    newsActionContainer.setAttribute("class", "news-action-container");

    const viewButton = document.createElement("span");
    viewButton.setAttribute("class", "view-news-btn");
    viewButton.setAttribute("id", `news-view-btn--${newz.id}`);
    viewButton.innerText = "SEE MORE"

    const srcUsercontainer = document.createElement("div");
    srcUsercontainer.setAttribute("class", "source-user-container");
    const srcUser = document.createElement("h5");
    srcUser.setAttribute("class", "srcUser");
    srcUser.innerText = `Shared by: ${user}`
    srcUsercontainer.appendChild(srcUser);


    const newsInfoContainer = document.createElement("div");
    newsInfoContainer.setAttribute("class", "news-info-container friends");

    const newsName = document.createElement("h2");
    newsName.innerText = `${newz.title}`;

    const newsDate = document.createElement("h5");
    newsDate.innerText = `${newz.dateAdded}`;


    const newsDescr = document.createElement("p");
    newsDescr.innerText = `${newz.synopsis}`;

    newsCard.appendChild(newsInfoContainer);
    newsInfoContainer.appendChild(newsName);
    newsInfoContainer.appendChild(newsDate);
    newsInfoContainer.appendChild(srcUsercontainer);
    newsInfoContainer.appendChild(newsDescr);
    newsInfoContainer.appendChild(viewButton)
    frag.appendChild(newsCard);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

function createNewsModal(newz, user, container) {
    const location = document.querySelector(`${container}`);
    const frag = document.createDocumentFragment();
    const newsModal = document.createElement("div");
    newsModal.setAttribute("id", `news-${newz.id}-modal`);
    newsModal.setAttribute("class", "news-card modal");

    const newsCard = document.createElement("div");
    newsCard.setAttribute("id", `friend-news-${newz.id}-card`);
    newsCard.setAttribute("class", "news-card modal-content");

    const newsActionContainer = document.createElement("div");
    newsActionContainer.setAttribute("class", "news-action-container");

    const closeButton = document.createElement("i")
    closeButton.setAttribute("class", "far fa-times-circle close");
    closeButton.setAttribute("id", `news-close-btn--${newz.id}`);

    const srcUsercontainer = document.createElement("div");
    srcUsercontainer.setAttribute("class", "source-user-container");
    const srcUser = document.createElement("h5");
    srcUser.setAttribute("class", "srcUser");
    srcUser.innerText = `Shared by: ${user}`;
    srcUsercontainer.appendChild(srcUser)

    const newsImgContainer = document.createElement("div"); newsImgContainer.setAttribute("class", "news-image-container friends-img");

    const image = document.createElement("img");
    image.setAttribute("class", " friends-img");
    image.setAttribute("src", `${newz.url}`);

    const newsInfoContainer = document.createElement("div"); newsInfoContainer.setAttribute("class", "news-info-container");

    const newsName = document.createElement("h2");
    newsName.innerText = `${newz.title}`;

    const newsDate = document.createElement("h5");
    newsDate.innerText = `${newz.dateAdded}`;


    const newsDescr = document.createElement("p");
    newsDescr.innerText = `${newz.synopsis}`;

    newsActionContainer.appendChild(closeButton);
    newsImgContainer.appendChild(image);
    newsCard.appendChild(newsActionContainer);
    newsCard.appendChild(newsImgContainer);
    newsCard.appendChild(newsInfoContainer);
    newsInfoContainer.appendChild(newsName);
    newsInfoContainer.appendChild(newsDate);
    newsInfoContainer.appendChild(srcUsercontainer);
    newsInfoContainer.appendChild(newsDescr);
    newsModal.appendChild(newsCard);
    frag.appendChild(newsModal);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

const friendsNews = {
    createFriendsNews: () => {
        API.getFriendsNews(sessionStorage.getItem("activeUser"))
            .then(friendsNews => {
                let shortenedArray = friendsNews.filter(friend => friend.news.length != 0)
                shortenedArray.forEach(friend => {
                    let news = friend.news
                    let user = friend.username
                    news.forEach(event => {
                        createNewsCard(event, user, "#news-container")
                        createNewsModal(event, user, "#news-modals")
                    })
                })
            })
    },
    createNewsListener: () => {
        const friendsNewsContainer = document.querySelector("#news-container")
        friendsNewsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("view-news-btn")) {
                let itemArray = e.target.id.split("--");
                let targetId = itemArray[1];
                console.log(targetId)
                let modal = document.querySelector(`#news-${targetId}-modal`)
                let btn = document.querySelector(`#news-close-btn--${targetId}`)
                modal.style.display = "block"
                btn.onclick = () => {
                    modal.style.display = "none"
                }
                window.onclick = (e) => {
                    if (event.target == modal) {
                        modal.style.display = "none"
                    }
                }
            }
        })
    }
}

export default friendsNews