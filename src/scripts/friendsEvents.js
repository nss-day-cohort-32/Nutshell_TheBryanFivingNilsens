import API from "./dbCalls"

function createEventCards(event, container) {
    const location = container;
    const frag = document.createDocumentFragment();
    const eventCard = document.createElement("div");
    eventCard.setAttribute("id", `event-${event.id}-card`);
    eventCard.setAttribute("class", "event-card");

    const eventImgContainer = document.createElement("div"); eventImgContainer.setAttribute("class", "event-image-container");

    const image = document.createElement("img");
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

    eventImgContainer.appendChild(image);
    eventCard.appendChild(eventActionContainer);
    eventCard.appendChild(eventImgContainer);
    eventCard.appendChild(eventInfoContainer);
    eventInfoContainer.appendChild(eventName);
    eventInfoContainer.appendChild(eventDate);
    eventInfoContainer.appendChild(eventLocation);
    eventInfoContainer.appendChild(eventDescr);
    frag.appendChild(eventCard);
    let finalOutput = location.appendChild(frag);
    return finalOutput;
}

const createFriendsEvents = () => {
    const $eventContainer = document.querySelector("#events-container")
    const friendsEvents = API.getFriendsEvents(1).then(reply => { return reply })
    console.log(friendsEvents)
    friendsEvents.forEach(event => {
        createEventCards(event, $eventContainer)
    })
}

export default createFriendsEvents

// sessionStorage.getItem(activeUser)