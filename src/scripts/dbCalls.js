/*
Author: Sean Glavin
Purpose: Database fetch calls
Date: 5/8/19
*/

const API = {
    loginUser: function (username, email) {
        return fetch(`http://localhost:8088/Users?username=${username}&email=${email}`)
            .then(response => response.json())
    },
    getAllUsers: function () {
        return fetch("http://localhost:8088/Users")
            .then(response => response.json())
    },
    addUser: function (obj) {
        return fetch("http://localhost:8088/Users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    }
}

export default API