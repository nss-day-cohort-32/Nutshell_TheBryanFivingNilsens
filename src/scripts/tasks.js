/*
    Author: Jason Collum
    Name: Tasks
    Purpose: Build Tasks Component
*/
import API from "./dbCalls"

// Create elements and target divs
const primaryContainer = document.querySelector('#primary-container');
const tasksContainer = document.createElement('div');
const taskListContainer = document.createElement('div');
const tasksForm = document.createElement('form');

tasksContainer.setAttribute('id', 'tasks-container');
taskListContainer.setAttribute('id', 'tasks-list-container');
tasksForm.setAttribute('id', 'tasks-form');

// TEMPORARY RENDER TO DOM FUNCTION
function renderToDom(target, frag) {
    target.append(frag);
}
// ********************************

const tasks = {
    buildTasks(userId) {
        // Clear primary container
        primaryContainer.innerHTML = '';

        // Create task form
        tasksForm.innerHTML = `
            <div id="form-elements">
                <fieldset>
                    <input type="text" id="task-input" placeholder="Enter a task...">
                    <label for="task-completion-date">Complete Task By: </label>
                    <input type="date" name="task-completion-date" id="task-completion-date" required>
                    <input id="save-task-btn" type="submit" value="Save Task">
                    <input id="update-task-btn" type="submit" class="hidden" value="Save Updated Task">
                </fieldset>
            </div>
            `;

        tasksContainer.append(tasksForm, taskListContainer);
        renderToDom(primaryContainer, tasksContainer);

        API.getUserTasks(userId)  // needs to be userId
            .then(userTasks => {
                userTasks.forEach(task => {
                    tasks.addToTaskList(task)
                })
            })
    },
    createNewTaskObject(userId, name, targetCompletionDate) {
        const taskObj = {
            userId,
            name,
            targetCompletionDate,
            completed: false
        }
        return taskObj;
    },
    addToTaskList(task) {
        const taskDiv = document.createElement('div');
        taskDiv.id = `task-div--${task.id}`;
        taskDiv.className = 'task-div';

        const label = document.createElement('label');
        label.className = `task-label`;

        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` - complete by ${task.targetCompletionDate}`;
        dateSpan.className = 'date-span';

        const taskItem = document.createElement('h4');
        taskItem.id = `task-item--${task.id}`;
        taskItem.className = `task-item line-through`;
        taskItem.textContent = task.name;
        taskItem.append(dateSpan);

        const removeBtn = document.createElement('button');
        removeBtn.id = `remove-btn--${task.id} `;
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'X';

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.id = `complete - check--${task.id} `;
        completeCheckbox.className = 'complete-check';

        label.append(removeBtn, completeCheckbox, taskItem);
        taskDiv.append(label);

        renderToDom(taskListContainer, taskDiv);
    },
    editTask() {

    },
    updateTask() {

    },
    deleteTask() {

    }
}

export default tasks



