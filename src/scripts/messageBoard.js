/*
Author: Colin Sandlin
Purpose: Gather and Display Events on the events page
Date: 5/13/19
*/

import API from "./dbCalls";



const messageBoard = {
    getMessages() {
        API.getAllMessages().then(messages => {

            const location = document.querySelector("#primary-container");
            const sessionUser = sessionStorage.getItem("activeUser");

            location.innerHTML = "";
            location.innerHTML = `
            <div id="message-container">
                <h1>Message Board</h1>
            </div>
            <div id="new-message">
                <input id="hiddenField" type="text" class="hidden" value=""></input>
                <input id="new-message-input" type="text" placeholder="Type new message here..."></input>
                <button type="click" id="new-msg-submit-btn">Send Message</button>
            </div>
            `
            const newMessagesArray = [];
            for (let i = 0; i < messages.length; i++) {
                const messageUser = messages[i].user.id;
                if (parseInt(sessionUser) === messageUser) {
                    messageBoard.renderYourMessagesToDom(messages[i]);
                } else {
                    newMessagesArray.push(messages[i]);
                }
            }
            newMessagesArray.forEach(message => {
                const messageUser = message.user.id;
                API.getUserRelationships(sessionUser, messageUser).then(results => {
                    Promise.all(results)
                        .then(items => {
                            console.log("items", items[0]);
                            if (items[0] !== undefined) {
                                if (items[0].accepted === true) {
                                    messageBoard.renderFriendsMessagesToDom(message);
                                } else if (items[0].accepted === false) {
                                    messageBoard.renderNonFriendsMessagesToDom(message);
                                }
                            }
                            else {
                                messageBoard.renderNonFriendsMessagesToDom(message);
                            }
                        });
                });
            })
        })
    },
    renderFriendsMessagesToDom(message) {
        const location = document.querySelector("#message-container");
        const frag = document.createDocumentFragment();

        const messageCard = document.createElement("div");
        messageCard.setAttribute("id", `message-card--${message.id}`);
        messageCard.setAttribute("class", "message-card");


        const messageInfoContainer = document.createElement("div");
        messageInfoContainer.setAttribute("class", "msg-info-container");

        const userName = document.createElement("h2");
        userName.innerText = `${message.user.email}`;

        const sendDate = document.createElement("h5");
        sendDate.innerText = `${message.sendDate}`


        const messageText = document.createElement("p");
        messageText.innerText = `${message.message}`;

        messageCard.appendChild(messageInfoContainer);



        messageInfoContainer.appendChild(userName);
        messageInfoContainer.appendChild(sendDate);
        messageInfoContainer.appendChild(messageText);
        frag.appendChild(messageCard);
        let finalOutput = location.appendChild(frag);
        return finalOutput;
    },
    renderYourMessagesToDom(message) {
        const location = document.querySelector("#message-container");
        const frag = document.createDocumentFragment();

        const messageCard = document.createElement("div");
        messageCard.setAttribute("id", `message-card--${message.id}`);
        messageCard.setAttribute("class", "message-card");


        const messageActionContainer = document.createElement("div");
        messageActionContainer.setAttribute("class", "event-action-container");

        const editButton = document.createElement("i");
        editButton.setAttribute("class", "fas fa-pen edit-msg-btn");
        editButton.setAttribute("id", `msg-edit-btn--${message.id}`);



        const messageInfoContainer = document.createElement("div");
        messageInfoContainer.setAttribute("class", "msg-info-container");

        const userName = document.createElement("h2");
        userName.innerText = `${message.user.email}`;
        userName.setAttribute("id", `message--${message.id}`);

        const sendDate = document.createElement("h5");
        sendDate.innerText = `${message.sendDate}`


        const messageText = document.createElement("p");
        messageText.innerText = `${message.message}`;

        messageActionContainer.appendChild(editButton);
        messageCard.appendChild(messageActionContainer);
        messageCard.appendChild(messageInfoContainer);



        messageInfoContainer.appendChild(userName);
        messageInfoContainer.appendChild(sendDate);
        messageInfoContainer.appendChild(messageText);
        frag.appendChild(messageCard);
        let finalOutput = location.appendChild(frag);
        return finalOutput;
    },
    renderNonFriendsMessagesToDom(message) {
        const location = document.querySelector("#message-container");
        const frag = document.createDocumentFragment();

        const messageCard = document.createElement("div");
        messageCard.setAttribute("id", `message-${message.id}-card`);
        messageCard.setAttribute("class", "message-card");


        const messageInfoContainer = document.createElement("div");
        messageInfoContainer.setAttribute("class", "msg-info-container");

        const userName = document.createElement("h2");
        userName.innerText = `${message.user.email}`;

        const sendDate = document.createElement("h5");
        sendDate.innerText = `${message.sendDate}`


        const messageText = document.createElement("p");
        messageText.innerText = `${message.message}`;

        const addFriendBtn = document.createElement("button");
        addFriendBtn.setAttribute("id", `add-friend-btn--${message.user.id}`);
        addFriendBtn.setAttribute("class", "acceptFriend");
        addFriendBtn.textContent = "Add Friend";

        messageCard.appendChild(messageInfoContainer);



        messageInfoContainer.appendChild(userName);
        messageInfoContainer.appendChild(sendDate);
        messageInfoContainer.appendChild(messageText);
        messageInfoContainer.appendChild(addFriendBtn);
        messageCard.appendChild(messageInfoContainer);
        frag.appendChild(messageCard);
        let finalOutput = location.appendChild(frag);
        return finalOutput;
    },
    addFriend(friendId) {
        const currentUser = sessionStorage.getItem("activeUser");
        API.addFriends(currentUser, friendId);

    },
    captureNewMessage() {
        const newMessage = document.querySelector("#new-message-input").value;
        const newMessageUserId = sessionStorage.getItem("activeUser");
        const newMessageUserIdNum = parseInt(newMessageUserId);


        const newMessageObj = {
            userId: newMessageUserIdNum,
            message: newMessage,
            sendDate: new Date()
        }
        return newMessageObj;
    },
    populateExistingMsgData(messageId) {
        const submitButton = document.querySelector("#new-msg-submit-btn");
        submitButton.setAttribute("id", "edited-msg-submission-btn");
        API.getSingleMessage(messageId).then(results => {
            for (let key in results) {
                if (results.hasOwnProperty(key)) {
                    document.querySelector("#new-message-input").value = results.message;
                };
            }
        })
        const hiddenField = document.querySelector("#hiddenField");
        hiddenField.setAttribute("value", `${messageId}`);
    },
    captureEditedMessage(messageId) {
        const editedMessage = document.querySelector("#new-message-input").value;
        const newMessageUserId = sessionStorage.getItem("activeUser");
        const newMessageUserIdNum = parseInt(newMessageUserId);
        const newMessageId = document.querySelector("#hiddenField").value;


        const editedMessageObj = {
            id: newMessageId,
            userId: newMessageUserIdNum,
            message: editedMessage,
            sendDate: new Date()
        }
        console.log(editedMessageObj);
        return editedMessageObj;
    },
}


export default messageBoard;


