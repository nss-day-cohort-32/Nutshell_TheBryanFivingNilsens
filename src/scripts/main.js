
import handleUser from "./login"
import API from "./dbCalls";
import eventsPage from "./events";

const loginBtn = document.querySelector("#login-btn")
const registerLink = document.querySelector("#register-link")
const registerBtn = document.querySelector("#register-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

const myEventsBtn = document.querySelector("#my-events-link");
const primaryContainer = document.querySelector("#primary-container");


loginBtn.addEventListener("click", () => {
    handleUser.login(username.value, email.value)
    username.value = ""
    email.value = ""
})

registerLink.addEventListener("click", (e) => {
    handleUser.makeRegistration()
})

registerBtn.addEventListener("click", (e) => {
    handleUser.register(username.value, email.value)
})

myEventsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    eventsPage.getMyEvents(2);
    eventsPage.createAddEventButton();
})


// Plus button to bring up new event form
primaryContainer.addEventListener("click", (e) => {
    if (event.target.id === "create-new-event-btn") {
        const primary = document.querySelector("#primary-container");
        primary.innerHTML = "";
        eventsPage.renderEventForm();
        const submitButton = document.querySelector("#submit-new-event");
        submitButton.setAttribute("id", "new-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-submission-btn") {
        e.preventDefault();
        const newEventObj = eventsPage.captureNewEventData();
        API.addEvents(newEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        eventsPage.populateExistingEventData(5);
    }
})

// Submit edited data to database
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-submission-btn") {
        console.log("edited event button");
        const editedEventObj = eventsPage.captureEditedEventData();
        const selectedId = editedEventObj.id;
        console.log(selectedId);
        API.editEvent(editedEventObj.id, editedEventObj);
        eventsPage.newEventSuccessMsg();
    }
})