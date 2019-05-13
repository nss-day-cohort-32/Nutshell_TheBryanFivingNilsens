/*
Author: Sean Glavin
Purpose: Database fetch calls
Date: 5/8/19
*/

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
            .then(response => response.json())
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
    addEvent: function (obj) {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addTask: function (obj) {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    addFriends: function (currentUserId, friendName) {
        fetch(`http://localhost:8088/friends?srcUserId=${currentUserId}&_expand=user`)
            .then(response => response.json())
            .then(friends => {
                if (friends.find(freind => freind.user.username === friendName) === undefined) {
                    fetch(`http://localhost:8088/users?username=${friendName}`)
                        .then(response => response.json())
                        .then(reply => {
                            console.log(reply)
                            let obj1 = {
                                srcUserId: currentUserId,
                                userId: reply[0].id,
                                accepted: false
                            }
                            let obj2 = {
                                srcUserId: reply[0].id,
                                userId: currentUserId,
                                accepted: false
                            }
                            fetch("http://localhost:8088/friends", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj1)
                            })
                            fetch("http://localhost:8088/friends", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj2)
                            })
                        })
                }
            })
    },
    getFriendsNews: function (userId) {
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}`)
            .then(response => response.json())
            .then(friendList => {
                const friendDetails = friendList.map(freindObj => {
                    var friend = freindObj.userId
                    return fetch(`http://localhost:8088/users/${friend}?_embed=news`)
                        .then(response => response.json())
                })
                return Promise.all(friendDetails)
            })
    },
    getFriendsEvents: function (userId) {
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}`)
            .then(response => response.json())
            .then(friendList => {
                const friendDetails = friendList.map(freindObj => {
                    var friend = freindObj.userId
                    return fetch(`http://localhost:8088/users/${friend}?_embed=events`)
                        .then(response => response.json())
                })
                return Promise.all(friendDetails)
            })
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
    editEvent: function (eventsId, obj) {
        return fetch(`http://localhost:8088/events/${eventsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editTask: function (tasksId, obj) {
        return fetch(`http://localhost:8088/tasks/${tasksId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    acceptFriends: function (userId, friendUsername) {
        let obj = { accepted: true }
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}&accepted=false&_expand=user`)
            .then(response => response.json())
            .then(reply => {
                console.log("reply", reply)
                if (reply.find(freind => freind.user.username === friendUsername) != undefined) {
                    fetch(`http://localhost:8088/friends?userId=${reply[0].user.id}&srcUserId=${userId}`)
                        .then(response => response.json())
                        .then(reply => {
                            let recordId = reply[0].id
                            fetch(`http://localhost:8088/friends/${recordId}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj)
                            })
                        })
                    fetch(`http://localhost:8088/friends?userId=${userId}&srcUserId=${reply[0].user.id}`)
                        .then(response => response.json())
                        .then(reply => {
                            console.log(userId)
                            let recordId = reply[0].id
                            fetch(`http://localhost:8088/friends/${recordId}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj)
                            })
                        })
                }
            })
    },
    deleteFriend: function (userId, friendId) {
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}&userId=${friendId}`)
            .then(response => response.json())
            .then(friendTableId => {
                return fetch(`http://localhost:8088/friends/${friendTableId[0].id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
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
    deleteTask: function (tasksId) {
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
    getFriendsList: function (userId, TorF) {
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}&accepted=${TorF}&_expand=user`)
            .then(response => response.json())
    }
}



export default API