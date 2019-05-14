/*
Author: Sean Glavin
Purpose: Database fetch calls
Date: 5/10/19
*/

import API from "./dbCalls"

function createEventsCard(event, user, container) {
    const location = document.querySelector(`${container}`);
    const frag = document.createDocumentFragment();
    const eventCard = document.createElement("div");
    eventCard.setAttribute("id", `event-${event.id}-card`);
    eventCard.setAttribute("class", "event-card friends-card");

    const eventActionContainer = document.createElement("div");
    eventActionContainer.setAttribute("class", "event-action-container");

    const viewButton = document.createElement("span");
    viewButton.setAttribute("class", "view-event-btn");
    viewButton.setAttribute("id", `event-view-btn--${event.id}`);
    viewButton.innerText = "SEE MORE"

    const srcUsercontainer = document.createElement("div");
    srcUsercontainer.setAttribute("class", "source-user-container");
    const srcUser = document.createElement("h5");
    srcUser.setAttribute("class", "srcUser");
    srcUser.innerText = `Shared by: ${user}`;
    srcUsercontainer.appendChild(srcUser)

    const eventInfoContainer = document.createElement("div"); eventInfoContainer.setAttribute("class", "event-info-container friends");

    const eventName = document.createElement("h2");
    eventName.innerText = `${event.name}`;

    const eventDate = document.createElement("h5");
    eventDate.innerText = `${event.eventDate}`

    const eventLocation = document.createElement("h6");
    eventLocation.innerText = `Location: ${event.location}`;

    const eventDescr = document.createElement("p");
    eventDescr.innerText = `${event.description}`;

    eventCard.appendChild(eventInfoContainer);
    eventInfoContainer.appendChild(eventName);
    eventInfoContainer.appendChild(eventDate);
    eventInfoContainer.appendChild(srcUsercontainer);
    eventInfoContainer.appendChild(eventLocation);
    eventInfoContainer.appendChild(eventDescr);
    eventInfoContainer.appendChild(viewButton)
    frag.appendChild(eventCard);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

function createEventModal(event, user, container) {
    const location = document.querySelector(`${container}`);
    const frag = document.createDocumentFragment();
    const eventModal = document.createElement("div");
    eventModal.setAttribute("id", `event-${event.id}-modal`);
    eventModal.setAttribute("class", "event-card modal");

    const eventCard = document.createElement("div");
    eventCard.setAttribute("id", `friend-event-${event.id}-card`);
    eventCard.setAttribute("class", "event-card modal-content");

    const eventActionContainer = document.createElement("div");
    eventActionContainer.setAttribute("class", "event-action-container");

    const closeButton = document.createElement("i")
    closeButton.setAttribute("class", "far fa-times-circle close");
    closeButton.setAttribute("id", `event-close-btn--${event.id}`);

    const srcUsercontainer = document.createElement("div");
    srcUsercontainer.setAttribute("class", "source-user-container");
    const srcUser = document.createElement("h5");
    srcUser.setAttribute("class", "srcUser");
    srcUser.innerText = `Shared by: ${user}`;
    srcUsercontainer.appendChild(srcUser)

    const eventImgContainer = document.createElement("div"); eventImgContainer.setAttribute("class", "event-image-container");

    const image = document.createElement("img");
    image.setAttribute("class", " friends-img");
    image.setAttribute("src", `${event.url}`);

    const eventInfoContainer = document.createElement("div"); eventInfoContainer.setAttribute("class", "event-info-container");

    const eventName = document.createElement("h2");
    eventName.innerText = `${event.name}`;

    const eventDate = document.createElement("h5");
    eventDate.innerText = `${event.eventDate}`

    const eventLocation = document.createElement("h6");
    eventLocation.innerText = `Location: ${event.location}`;

    const eventDescr = document.createElement("p");
    eventDescr.innerText = `${event.description}`;

    eventActionContainer.appendChild(closeButton);
    eventImgContainer.appendChild(image);
    eventCard.appendChild(eventActionContainer);
    eventCard.appendChild(eventImgContainer);
    eventCard.appendChild(eventInfoContainer);
    eventInfoContainer.appendChild(eventName);
    eventInfoContainer.appendChild(eventDate);
    eventInfoContainer.appendChild(srcUsercontainer);
    eventInfoContainer.appendChild(eventLocation);
    eventInfoContainer.appendChild(eventDescr);
    eventModal.appendChild(eventCard)
    frag.appendChild(eventModal);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

const friendsEvents = {
    createFriendsEvents: () => {
        API.getFriendsEvents(sessionStorage.getItem("activeUser"))
            .then(friendsEvents => {
                console.log(friendsEvents)
                var shortenedArray = friendsEvents.filter(friend => friend.events.length !== 0)
                shortenedArray.forEach(friend => {
                    let events = friend.events
                    let user = friend.username
                    events.forEach(event => {
                        createEventsCard(event, user, "#events-container")
                        createEventModal(event, user, "#events-modals")
                    })
                })
            })
    },
    createEventListener: () => {
        const friendsEventsContainer = document.querySelector("#events-container")
        friendsEventsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("view-event-btn")) {
                let itemArray = e.target.id.split("--");
                let targetId = itemArray[1];
                let modal = document.querySelector(`#event-${targetId}-modal`)
                let btn = document.querySelector(`#event-close-btn--${targetId}`)
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

export default friendsEvents