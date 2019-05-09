/*
Author: Sean Glavin
Purpose: Database fetch calls
Date: 5/8/19
*/

const getFriends = (userId) => {
    return fetch(`http://localhost:8088/friends?userId=${userId}`)
        .then(response => response.json())
}

const API = {
    loginUser: function (username, email) {
        return fetch(`http://localhost:8088/users?username=${username}&email=${email}`)
            .then(response => response.json())
    },
    getAllUsers: function () {
        return fetch("http://localhost:8088/users")
            .then(response => response.json())
    },
    addUser: function (obj) {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    getUserNews: function (userId) {
        return fetch(`http://localhost:8088/news?userId=${userId}`)
            .then(response => response.json())
    },
    getUserTasks: function (userId) {
        return fetch(`http://localhost:8088/tasks?userId=${userId}`)
            .then(response => response.json())
    },
    getUserEvents: function (userId) {
        return fetch(`http://localhost:8088/events?userId=${userId}`)
    },
    addNews: function (obj) {
        return fetch("http://localhost:8088/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addEvents: function (obj) {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addTasks: function (obj) {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    getFriendsNews: function (userId) {
        let friendsArray = []
        getFriends(userId)
            .then(reply => {
                reply.forEach(freindObj => {
                    var friend = freindObj.otherfriendId
                    fetch(`http://localhost:8088/users/${friend}?_embed=news`)
                        .then(response => response.json())
                        .then(reply => {
                            friendsArray.push(reply)
                        })
                })
            })
        return friendsArray
    },
    getFriendsEvents: function (userId) {
        let friendsArray = []
        getFriends(userId)
            .then(reply => {
                reply.forEach(freindObj => {
                    var friend = freindObj.otherfriendId
                    fetch(`http://localhost:8088/users/${friend}?_embed=events`)
                        .then(response => response.json())
                        .then(reply => {
                            friendsArray.push(reply)
                        })
                })
            })
        return friendsArray
    },
    editNews: function (newsId, obj) {
        return fetch(`http://localhost:8088/news/${newsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editEvents: function (eventsId, obj) {
        return fetch(`http://localhost:8088/events/${eventsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editTasks: function (tasksId, obj) {
        return fetch(`http://localhost:8088/tasks/${tasksId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editFriends: function (userId, friendUsername, obj) {
        getFriends(userId)
            .then(reply => {
                reply.forEach(freindObj => {
                    var friend = freindObj.otherfriendId
                    fetch(`http://localhost:8088/users/${friend}`)
                        .then(response => response.json())
                        .then(reply => {
                            if (reply.username === friendUsername) {
                                fetch(`http://localhost:8088/friends?_userId=${userId}&otherfriendId=${reply.id}`)
                                    .then(response => response.json())
                                    .then(reply => {
                                        var recordId = reply[0].id
                                        fetch(`http://localhost:8088/friends/${recordId}`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(obj)
                                        })
                                            .then(response => response.json())
                                    })
                                fetch(`http://localhost:8088/friends?_userId=${reply.id}&otherfriendId=${userId}`)
                                    .then(response => response.json())
                                    .then(reply => {
                                        var recordId = reply[0].id
                                        fetch(`http://localhost:8088/friends/${recordId}`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(obj)
                                        })
                                            .then(response => response.json())
                                    })
                            }

                        })
                })
            })
    },
    deleteNews: function (newsId) {
        return fetch(`http://localhost:8088/news/${newsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    deleteEvents: function (eventsId) {
        return fetch(`http://localhost:8088/events/${eventsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    deleteTasks: function (tasksId) {
        return fetch(`http://localhost:8088/tasks/${tasksId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    getAllMessages: function () {
        return fetch("http://localhost:8088/messages")
            .then(response => response.json())
    },
    addMessages: function (obj) {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editMessages: function (messageId, obj) {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deleteMessages: function (messageId) {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    getFriendsList: function (userId) {
        let friendsArray = []
        getFriends(userId)
            .then(reply => {
                reply.forEach(freindObj => {
                    var friend = freindObj.otherfriendId
                    fetch(`http://localhost:8088/users/${friend}`)
                        .then(response => response.json())
                        .then(reply => {
                            friendsArray.push(reply)
                        })
                })
            })
        return friendsArray
    }
}




export default API