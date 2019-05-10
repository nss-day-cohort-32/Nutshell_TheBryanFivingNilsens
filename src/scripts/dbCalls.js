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
    getFriendsList: function (userId, TorF) {
        return fetch(`http://localhost:8088/friends?srcUserId=${userId}&accepted=${TorF}&_expand=user`)
            .then(response => response.json())
    }
}



export default API