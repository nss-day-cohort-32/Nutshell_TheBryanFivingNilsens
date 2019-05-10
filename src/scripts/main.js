
import handleUser from "./login"
import API from "./dbCalls";
import tasks from "./tasks"

const primaryContainer = document.querySelector("#primary-container")

const loginBtn = document.querySelector("#login-btn")
const registerLink = document.querySelector("#register-link")
const registerBtn = document.querySelector("#register-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

// Primary Container Event Listener - Tasks
primaryContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log(e)
    // Form - Save/Submit Button
    if (e.target.id === 'save-task-btn') {
        e.preventDefault()
        const taskName = document.querySelector('#task-input');
        const completionDate = document.querySelector('#task-completion-date');
        // Create new task object
        const newTask = tasks.createNewTaskObject(2, taskName.value, completionDate.value);
        // Save new task to db
        API.addTask(newTask)
            .then(newTask => {
                tasks.addToTaskList(newTask)
            })
    }
    // Task List Item - Checkbox
    if (e.target.className === 'complete-target') {
        if (e.target.checked) {
            // update "completed": true
            // userId, taskId, method "PATCH"
        } else {
            // update "completed": false
            // userId, taskId, method "PATCH"
        }
    }
    // Task List Item Name - h4
    // Task List - Remove Button


})

// ****************************************

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

tasks.buildTasks(2)

