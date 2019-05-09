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

        const itemDiv = document.createElement('div');
        itemDiv.id = `item-div--${task.id}`;
        itemDiv.className = 'item-div';

        const actionDiv = document.createElement('div');
        actionDiv.id = `action-div--${task.id}`;
        actionDiv.className = 'action-div';

        const taskItem = document.createElement('h4');
        taskItem.id = `task-item--${task.id}`;
        taskItem.className = `task-item`;
        taskItem.textContent = task.name;

        const removeBtn = document.createElement('button');
        removeBtn.id = `remove-btn--${task.id}`;
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'X';

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.id = `complete-check--${task.id}`;
        completeCheckbox.className = 'complete-check';

        itemDiv.append(taskItem);
        actionDiv.append(removeBtn, completeCheckbox);
        taskDiv.append(itemDiv, actionDiv);

        renderToDom(taskListContainer, taskDiv);
    }
}

export default tasks



