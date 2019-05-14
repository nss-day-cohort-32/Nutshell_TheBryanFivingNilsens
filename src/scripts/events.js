/*
Author: Colin Sandlin
Purpose: Gather and Display Events on the events page
Date: 5/9/19
*/

import API from "./dbCalls";



const eventsPage = {
    getMyEvents(userId) {
        API.getUserEvents(userId).then(events => {
            events.forEach(event => {
                eventsPage.createEventCards(event);
            })
        })
    },
    createEventCards(event) {
        const location = document.querySelector("#primary-container");
        const frag = document.createDocumentFragment();
        const eventCard = document.createElement("div");
        eventCard.setAttribute("id", `event-${event.id}-card`);
        eventCard.setAttribute("class", "event-card");

        const eventActionContainer = document.createElement("div");
        eventActionContainer.setAttribute("class", "event-action-container");

        const editButton = document.createElement("i");
        editButton.setAttribute("class", "fas fa-pen edit-event-btn");
        editButton.setAttribute("id", `event-edit-btn--${event.id}`);
        const deleteButton = document.createElement("i")
        deleteButton.setAttribute("class", "far fa-times-circle delete-event-btn");
        deleteButton.setAttribute("id", `event-delete-btn--${event.id}`);

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

        eventActionContainer.appendChild(editButton);
        eventActionContainer.appendChild(deleteButton);
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
    },
    createAddEventButton() {
        const location = document.querySelector("#primary-container");
        location.innerHTML += `
        <div id="new-event-btn" class="">
            <svg id="create-new-event-btn"xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="64" height="64"
            viewBox="0 0 192 192"
            style=" fill:#000000;"><g transform=""><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#1abc9c"><path d="M96,9.07617c-22.275,0 -44.55,8.47383 -61.5,25.42383c-33.9,33.9 -33.9,89.1 0,123c16.95,16.95 39.3,25.5 61.5,25.5c22.2,0 44.55,-8.55 61.5,-25.5c33.9,-33.9 33.9,-89.1 0,-123c-16.95,-16.95 -39.225,-25.42383 -61.5,-25.42383zM96,18c19.95,0 39.90117,7.64883 55.20117,22.79883c30.3,30.45 30.3,79.95234 0,110.40234c-30.45,30.45 -79.95,30.45 -110.25,0c-30.45,-30.45 -30.45234,-79.95234 -0.15234,-110.40234c15.3,-15.15 35.25117,-22.79883 55.20117,-22.79883zM96,63c-2.55,0 -4.5,1.95 -4.5,4.5v24h-24c-2.55,0 -4.5,1.95 -4.5,4.5c0,2.55 1.95,4.5 4.5,4.5h24v24c0,2.55 1.95,4.5 4.5,4.5c2.55,0 4.5,-1.95 4.5,-4.5v-24h24c2.55,0 4.5,-1.95 4.5,-4.5c0,-2.55 -1.95,-4.5 -4.5,-4.5h-24v-24c0,-2.55 -1.95,-4.5 -4.5,-4.5z"><rect x="0" y="0" width="100%" height="100%" fill="none" /><a xlink:href="https://smashingmagazine.com/" target="_blank" cursor="pointer" pointer-events="all"></path></g></g></g></svg>
        </div>
        `

    },
    renderEventForm() {
        const location = document.querySelector("#primary-container");
        location.innerHTML += `
        <div id="event-form">
            <h1>Info for Your Party Peeps:</h1>
            <div>
               
                <input type="text" id="event-title" placeholder="Event title">
            </div>
            <div>
               
                <input type="date" id="event-date">
            </div>
            <div>
                
                <input type="text" id="event-location" placeholder="Event location">
            </div>
            <div>
                
                <input type="text" id="event-image" placeholder="Event Image URL">
            </div>
            <div>
                <input type="text" id="event-user-id" class="hidden">
            </div>
            <div>
                <input type="text" id="event-id" class="hidden">
            </div>
            <div>
                
                <textArea type="text" id="event-desc" placeholder="Event description"></textArea>
            </div>
            <div>
                <input type="submit" id="submit-new-event" class="">
            </div>
        </div>`;
    },
    captureNewEventData() {
        const newEventTitle = document.querySelector("#event-title").value;
        const newEventDate = document.querySelector("#event-date").value;
        const newEventLocation = document.querySelector("#event-location").value;
        const newEventImg = document.querySelector("#event-image").value;
        const newEventUserId = sessionStorage.getItem("activeUser");
        const newEventUserIdNum = parseInt(newEventUserId);
        const newEventDesc = document.querySelector("#event-desc").value;


        const newEventObj = {
            userId: newEventUserIdNum,
            name: newEventTitle,
            description: newEventDesc,
            eventDate: newEventDate,
            location: newEventLocation,
            url: newEventImg
        }
        console.log(newEventObj);
        return newEventObj;
    },
    newEventSuccessMsg() {
        const userId = sessionStorage.getItem("activeUser");
        const location = document.querySelector("#primary-container");
        location.innerHTML = `
        <div id="event-success-msg">
            <h1>Success!</h1>
        </div>`
        setTimeout(() => {
            location.innerHTML = "";
            eventsPage.createAddEventButton();
            eventsPage.getMyEvents(userId);
        }, 2000)
    },
    populateExistingEventData(eventId) {
        const location = document.querySelector("#primary-container");
        location.innerHTML = "";
        eventsPage.renderEventForm();
        const submitButton = document.querySelector("#submit-new-event");
        submitButton.setAttribute("id", "edited-event-submission-btn");
        API.getSingleUserEvent(eventId).then(results => {
            console.log(results);
            for (let key in results) {
                if (results.hasOwnProperty(key)) {
                    document.querySelector("#event-title").value = results.name;
                    document.querySelector("#event-date").value = results.eventDate;
                    document.querySelector("#event-location").value = results.location;
                    document.querySelector("#event-image").value = results.url;
                    document.querySelector("#event-desc").value = results.description;
                    document.querySelector("#event-id").value = results.id;
                };
            }
        })
    },
    captureEditedEventData() {
        const editedEventTitle = document.querySelector("#event-title").value;
        const editedEventDate = document.querySelector("#event-date").value;
        const editedEventLocation = document.querySelector("#event-location").value;
        const editedEventImg = document.querySelector("#event-image").value;
        const editedEventUserId = sessionStorage.getItem("activeUser");
        const editedEventUserIdNum = parseInt(editedEventUserId);
        const editedEventDesc = document.querySelector("#event-desc").value;
        const editedEventId = document.querySelector("#event-id").value;


        const editedEventObj = {
            userId: editedEventUserIdNum,
            name: editedEventTitle,
            description: editedEventDesc,
            eventDate: editedEventDate,
            location: editedEventLocation,
            url: editedEventImg,
            id: editedEventId
        }
        return editedEventObj;
    }
}



export default eventsPage;

