import API from "./dbCalls"

function createEventsCard(event, container) {
    const location = document.querySelector(`${container}`);
    console.log(location)
    const frag = document.createDocumentFragment();
    const eventCard = document.createElement("div");
    eventCard.setAttribute("id", `event-${event.id}-card`);
    eventCard.setAttribute("class", "event-card");

    // const eventImgContainer = document.createElement("div"); eventImgContainer.setAttribute("class", "event-image-container");

    // const image = document.createElement("img");
    // image.setAttribute("src", `${event.url}`);

    const eventInfoContainer = document.createElement("div"); eventInfoContainer.setAttribute("class", "event-info-container");

    const eventName = document.createElement("h2");
    eventName.innerText = `${event.name}`;

    const eventDate = document.createElement("h5");
    eventDate.innerText = `${event.eventDate}`

    const eventLocation = document.createElement("h6");
    eventLocation.innerText = `Location: ${event.location}`;

    const eventDescr = document.createElement("p");
    eventDescr.innerText = `${event.description}`;

    // eventImgContainer.appendChild(image);
    // eventCard.appendChild(eventImgContainer);
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
    API.getFriendsEvents(sessionStorage.getItem("activeUser")).then(friendsEvents => {
        for (let i = 0; i < friendsEvents.length; i++) {
            if (friendsEvents[i].events.length === 0) {
                friendsEvents.splice(i)
            }
        }
        if (friendsEvents.length !== 0) {
            friendsEvents.forEach(friend => {
                let events = friend.events
                console.log(events)
                events.forEach(event => {
                    createEventsCard(event, "#events-container")
                })
            })
        }
    })
}

export default createFriendsEvents

// sessionStorage.getItem(activeUser)