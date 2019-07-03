/*
Author: Sean Glavin
Purpose: Database fetch calls
Date: 5/8/19
*/
const baseUrl = process.env.NODE_ENV === 'production'
    ? "/api/"
    : "http://localhost:8088/api/";

const API = {
    loginUser: function (username, email) {
        return fetch(`${baseUrl}users?username=${username}&email=${email}`)
            .then(response => response.json())
    },
    getAllUsers: function () {
        return fetch(baseUrl + "users")
            .then(response => response.json())
    },
    addUser: function (obj) {
        return fetch(baseUrl + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    getUserNews: function (userId) {
        return fetch(`${baseUrl}news?userId=${userId}&_sort=dateAdded&_order=desc`)
            .then(response => response.json())
    },
    getUserTasks: function (userId) {
        return fetch(`${baseUrl}tasks?userId=${userId}`)
            .then(response => response.json())
    },
    getSingleUserTask: function (taskId) {
        return fetch(`${baseUrl}tasks/${taskId}`)
            .then(response => response.json())
    },
    getUserEvents: function (userId) {
        return fetch(`${baseUrl}events?userId=${userId}&_sort=eventDate&_order=asc`)
            .then(response => response.json())
    },
    getSingleUserEvent: function (eventId) {
        return fetch(`${baseUrl}events/${eventId}`)
            .then(response => response.json())
    },
    getSingleMessage: function (messageId) {
        return fetch(`${baseUrl}messages/${messageId}`)
            .then(response => response.json())
    },
    getSingleUserNews: function (newsId) {
        return fetch(`${baseUrl}news/${newsId}`)
            .then(response => response.json())
    },
    addNews: function (obj) {
        return fetch(baseUrl + "news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addEvent: function (obj) {
        return fetch(baseUrl + "events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editEvent: function (eventsId, obj) {
        return fetch(`${baseUrl}events/${eventsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addTask: function (obj) {
        return fetch(baseUrl + "tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addFriends: function (currentUserId, friendName) {
        return fetch(`${baseUrl}friends?srcUserId=${currentUserId}&_expand=user`)
            .then(response => response.json())
            .then(friends => {
                if (friends.find(freind => freind.user.username === friendName) === undefined) {
                    return fetch(`${baseUrl}users?username=${friendName}`)
                        .then(response => response.json())
                        .then(reply => {
                            let obj1 = {
                                srcUserId: Number(currentUserId),
                                userId: reply[0].id,
                                initiate: true,
                                accepted: false
                            }
                            let obj2 = {
                                srcUserId: reply[0].id,
                                userId: Number(currentUserId),
                                initiate: false,
                                accepted: false
                            }
                            return fetch(baseUrl + "friends", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj1)
                            })
                                .then(response => response.json())
                                .then(response => {
                                    return fetch(baseUrl + "friends", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(obj2)
                                    })
                                        .then(response => response.json())
                                })
                        })
                }
            })
    },
    getFriendsNews: function (userId) {
        return fetch(`${baseUrl}friends?srcUserId=${userId}&accepted=true`)
            .then(response => response.json())
            .then(friendList => {
                const friendDetails = friendList.map(freindObj => {
                    var friend = freindObj.userId
                    return fetch(`${baseUrl}users/${friend}?_embed=news`)
                        .then(response => response.json())
                })
                return Promise.all(friendDetails)
            })
    },
    getFriendsEvents: function (userId) {
        return fetch(`${baseUrl}friends?srcUserId=${userId}&accepted=true`)
            .then(response => response.json())
            .then(friendList => {
                const friendDetails = friendList.map(freindObj => {
                    var friend = freindObj.userId
                    return fetch(`${baseUrl}users/${friend}?_embed=events`)
                        .then(response => response.json())
                })
                return Promise.all(friendDetails)
            })
    },
    editNews: function (newsId, obj) {
        return fetch(`${baseUrl}news/${newsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editEvent: function (eventsId, obj) {
        return fetch(`${baseUrl}events/${eventsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editTask: function (taskId, obj) {
        return fetch(`${baseUrl}tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    acceptFriends: function (userId, friendUsername) {
        let obj = {
            accepted: true,
            initiate: true
        }
        return fetch(`${baseUrl}friends?srcUserId=${userId}&accepted=false&_expand=user`)
            .then(response => response.json())
            .then(reply => {
                // debugger
                // console.log("reply", reply)
                if (reply.find(freind => freind.user.username === friendUsername) != undefined) {
                    // debugger
                    return fetch(`${baseUrl}friends?userId=${reply[0].user.id}&srcUserId=${userId}`)
                        .then(response => response.json())
                        .then(reply => {
                            let recordId = reply[0].id
                            return fetch(`${baseUrl}friends/${recordId}`, {
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
    },
    deleteFriend: function (userId, friendId) {
        return fetch(`${baseUrl}friends?srcUserId=${userId}&userId=${friendId}`)
            .then(response => response.json())
            .then(friendTableId => {
                return fetch(`${baseUrl}friends/${friendTableId[0].id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
            })
    },
    deleteNews: function (newsId) {
        return fetch(`${baseUrl}news/${newsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    deleteEvents: function (eventsId) {
        return fetch(`${baseUrl}events/${eventsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    deleteTask: function (taskId) {
        return fetch(`${baseUrl}tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    getAllMessages: function () {
        return fetch(baseUrl + "messages?_expand=user&_sort=sendDate&_order=desc")
            .then(response => response.json())
    },
    getUserRelationships: function (sessionUser, messageUser) {
        return fetch(`${baseUrl}friends/?userId=${sessionUser}&srcUserId=${messageUser}`)
            .then(response => response.json())
    },
    addMessages: function (obj) {
        return fetch(baseUrl + "messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editMessages: function (messageId, obj) {
        return fetch(`${baseUrl}messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deleteMessages: function (messageId) {
        return fetch(`${baseUrl}messages/${messageId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    getFriendsList: function (userId, TorF, iTorF) {
        return fetch(`${baseUrl}friends?srcUserId=${userId}&accepted=${TorF}&initiate=${iTorF}&_expand=user`)
            .then(response => response.json())
    }
}



export default API;