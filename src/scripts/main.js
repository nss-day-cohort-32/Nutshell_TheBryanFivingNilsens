
import handleUser from "./login"
import API from "./dbCalls";
import tasks from "./tasks"
import eventsPage from "./events";
import newsPage from "./news";

const loginContainer = document.querySelector("#login-container")
const friendsContainer = document.querySelector("#friends-container")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

const myEventsBtn = document.querySelector("#my-events-link");
const myNewsBtn = document.querySelector("#my-news-link");
const primaryContainer = document.querySelector("#primary-container");

// TASK FORM Inputs
const hiddenInput = document.querySelector('#hidden-input');
const taskName = document.querySelector('#task-input');
const completionDate = document.querySelector('#task-completion-date');

// LOGIN - LOGIN LISTENER
loginContainer.addEventListener("click", (e) => {
    e.preventDefault()
    //handle login
    if (e.target.id === "login-btn") {
        handleUser.login(username.value, email.value)
        username.value = ""
        email.value = ""
        //regigister link
    } else if (e.target.id === "register-link") {
        handleUser.makeRegistration()
        //register user
    } else if (e.target.id === "register-btn") {
        handleUser.register(username.value, email.value)
        username.value = ""
        email.value = ""
    } else if (e.target.id === "logout") {
        handleUser.logOut()
    }
})

// FRIENDS LISTENER
friendsContainer.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e)
    // handle remove friend
    if (e.target.id === "friend-in-list") {
        console.log(e.target)
    }
})
const taskUserId = 2;
tasks.renderUserTasks(taskUserId) // temporary call to load user tasks
// TASK LISTENERS SECTION ///////////////////////////////////////////////////
primaryContainer.addEventListener('click', (e) => {
    // Form - Save/Submit Button
    if (e.target.id === 'save-task-btn') {
        e.preventDefault()
        // const hiddenInput = document.querySelector('#hidden-input');
        // const taskName = document.querySelector('#task-input');
        // const completionDate = document.querySelector('#task-completion-date');
        // Hidden input value
        const taskId = hiddenInput.value;
        // Format date
        const formattedDate = completionDate.value;
        // Create new task object
        const taskObj = tasks.createNewTaskObject(2, taskName.value, formattedDate);
        // Reset input fields and hidden input
        hiddenInput.value = '';
        taskName.value = '';
        completionDate.value = '';
        // Save task...
        if (!taskId) {
            // Save NEW task to db
            API.addTask(taskObj)
                .then(newTask => {
                    tasks.addToTaskList(newTask)
                })
        } else {
            // Update EDITED task to db
            API.editTask(taskId, taskObj)
                .then(editedTask => {
                    tasks.addToTaskList(editedTask)
                })
        }
    }
    // Task List Item - Checkbox (create true/false object to patch)
    if (e.target.className === 'complete-check') {
        const taskId = e.target.id.split('--')[1];
        if (e.target.checked) {
            const trueObj = {
                completed: true
            }
            API.editTask(taskId, trueObj);
        } else {
            const falseObj = {
                completed: false
            }
            API.editTask(taskId, falseObj);
        }
    }
    // Task List Item - Anchor Tag (populate form to edit task)
    if (e.target.className === 'task-item-link') {
        e.preventDefault()
        const taskToEditId = e.target.id.split('--')[1]
        API.getSingleUserTask(taskToEditId)
            .then(task => {
                // Populate form to edit task
                hiddenInput.value = task.id;
                taskName.value = task.name;
                completionDate.value = task.targetCompletionDate;
                // Remove task from list
                tasks.removeTaskFromDOM(taskToEditId)
            })
    }
    // Task List - Remove Button
    if (e.target.className === 'remove-btn') {
        e.preventDefault()
        const taskId = e.target.id.split('--')[1];
        // Remove task from DOM and Delete task from database
        tasks.removeAndDeleteTask(taskId);
    }
})
// END TASK SECTION ///////////////////////////////////////////




myEventsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    eventsPage.getMyEvents(2);
    eventsPage.createAddEventButton();
})

myNewsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    newsPage.getUserNews(2);
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
        newsPage.renderNewsForm();
        const submitButton = document.querySelector("#submit-new-news");
        submitButton.setAttribute("id", "new-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-news-submission-btn") {
        e.preventDefault();
        const newNewsObj = newsPage.captureNewNewsData();
        API.addNews(newNewsObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-news-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        newsPage.populateExistingNewsData(2);
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
    if (e.target.classList.contains("news-delete-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to delete this news item?") == true) {
            API.deleteNews(targetId).then(() => {
                newssPage.newNewsSuccessMsg();
            })
        }
    }
})