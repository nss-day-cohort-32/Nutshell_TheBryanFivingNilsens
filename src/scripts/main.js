
import handleUser from "./login"
import API from "./dbCalls";
import eventsPage from "./events";
import newsPage from "./news";

const loginBtn = document.querySelector("#login-btn")
const registerLink = document.querySelector("#register-link")
const registerBtn = document.querySelector("#register-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

const myEventsBtn = document.querySelector("#my-events-link");
const myNewsBtn = document.querySelector("#my-news-link");
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

myNewsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    newsPage.getMyNews(2);
    newsPage.createAddNewsButton();
})

/////////////////////EVENTS////////////////////////////

// Plus button to bring up new event form
primaryContainer.addEventListener("click", (e) => {
    if (event.target.id === "create-new-event-btn") {
        const primary = document.querySelector("#primary-container");
        primary.innerHTML = "";
        eventsPage.renderEventForm();
        const submitButton = document.querySelector("#submit-new-event");
        submitButton.setAttribute("id", "new-event-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-event-submission-btn") {
        e.preventDefault();
        const newEventObj = eventsPage.captureNewEventData();
        API.addEvents(newEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-event-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        eventsPage.populateExistingEventData(5);
    }
})

// Submit edited data to database
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-event-submission-btn") {
        console.log("edited event button");
        const editedEventObj = eventsPage.captureEditedEventData();
        const selectedId = editedEventObj.id;
        console.log(selectedId);
        API.editEvent(editedEventObj.id, editedEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Delete entry
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-event-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to cancel this event?") == true) {
            API.deleteEvents(targetId).then(() => {
                eventsPage.newEventSuccessMsg();
            })

        }
    }
})

/////////////////////NEWS////////////////////////////

// Plus button to bring up new event form
primaryContainer.addEventListener("click", (e) => {
    if (event.target.id === "create-new-news-btn") {
        const primary = document.querySelector("#primary-container");
        primary.innerHTML = "";
        newsPage.renderEventForm();
        const submitButton = document.querySelector("#submit-new-news");
        submitButton.setAttribute("id", "new-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-news-submission-btn") {
        e.preventDefault();
        const newNewsObj = newsPage.captureNewNewsData();
        API.addNews(newEventObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-news-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        newssPage.populateExistingNewsData(5);
    }
})

// Submit edited data to database
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-news-submission-btn") {
        console.log("edited event button");
        const editedNewsObj = newsPage.captureEditedNewsData();
        const selectedId = editedNewsObj.id;
        console.log(selectedId);
        API.editNews(editedNewsObj.id, editedNewsObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Delete entry
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-news-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to delete this news item?") == true) {
            API.deleteNews(targetId).then(() => {
                newssPage.newNewsSuccessMsg();
            })

        }
    }
})