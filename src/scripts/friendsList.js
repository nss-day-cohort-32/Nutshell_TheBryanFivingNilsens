import API from "./dbCalls";

const friendsDiv = document.querySelector("#friend-list")
const friendRequestDiv = document.querySelector("#friend-requests")


const handleFriends = {
    makeFriendsList(friends) {
        let me = sessionStorage.getItem("activeUserName")
        friendsDiv.innerHTML = ""
        friendsDiv.innerHTML += `<h2>${me}'s Friends</h2>`
        friends.forEach(friend => {
            let addFriend = `
            <div class="" id="${friend.user.id}">
            <p id="friend-in-list--${friend.user.id}" class="friendName">${friend.user.username}</p>
            <p id="friendEmail--${friend.user.id}" class="hidden friendEmail">Contact: ${friend.user.email}</p>
            <button id="delete-friend--${friend.user.id}" class="hidden deleteFriend">Remove Friend</button>
            </div>
        `
            friendsDiv.innerHTML += addFriend
        })
        friendsDiv.innerHTML += `
                <h4>Find a New Friend</h4>
                <div class="find-friend">
                    <label></label>
                    <input type="text"  id="searchFriends" placeholder="search by username"/>
                    <button id="sendRequestBtn">Send Friend Request</button>
                </div>
            `
    },
    makeFriendRequestList(friends) {
        friendRequestDiv.innerHTML = ""
        friendRequestDiv.innerHTML = "<h2>Friend Requests</h2>"
        friends.forEach(friend => {
            let addFriendRequest = `
            <div class="" id="${friend.user.id}">
            <p id="friend-in-list--${friend.user.id}" class="">${friend.user.username}</p>
            <button id="add-friend--${friend.user.id}" class="acceptFriend">Accept Request</button>
            <button id="delete-friend--${friend.user.id}" class="deleteFriend">Deny Request</button>
            </div>
        `
            friendRequestDiv.innerHTML += addFriendRequest
        })
    },
    deleteFriend(friendId) {
        let currentUser = sessionStorage.getItem("activeUser")
        API.deleteFriend(currentUser, friendId)
            // .then(result => {
            //     API.deleteFriend(friendId, currentUser)
            //         .then(stuff => {
            //             return stuff
            //         })
            //     return true
            // })
            .then(otherStuff => {
                API.getFriendsList(currentUser, "false", "false")
                    .then(friends => {
                        handleFriends.makeFriendRequestList(friends)
                    })
                API.getFriendsList(currentUser, "true", "true")
                    .then(friends => {
                        handleFriends.makeFriendsList(friends)
                    })
            })

    },
    acceptFriendRequest(friendUsername) {
        let currentUser = sessionStorage.getItem("activeUser")
        // console.log(currentUser)
        // console.log(friendUsername)
        API.acceptFriends(currentUser, friendUsername)
            .then(result => {
                // console.log(result)
                let friendId = result.userId
                let myUsername = sessionStorage.getItem("activeUserName")
                API.acceptFriends(friendId, myUsername)
                    .then(stuff => {
                        return stuff
                    })
                return true
            }).then(otherStuff => {
                API.getFriendsList(currentUser, "false", "false")
                    .then(friends => {
                        handleFriends.makeFriendRequestList(friends)
                    })
                API.getFriendsList(currentUser, "true", "true")
                    .then(friends => {
                        handleFriends.makeFriendsList(friends)
                    })
            })
    },
    sendFriendRequest(friendName) {
        let currentUser = sessionStorage.getItem("activeUser")
        const trueFriends = API.getFriendsList(currentUser, "true", "true")
        const requestedFriends = API.getFriendsList(currentUser, "false", "true")
        Promise.all([trueFriends, requestedFriends])
            .then(friends => {
                let allFriends = friends[0].concat(friends[1])
                let friendUserNames = []
                allFriends.forEach(friend => {
                    friendUserNames.push(friend.user.username)
                })
                if (friendUserNames.find(friend => friend === friendName)) {
                    alert(`${friendName} is already a friend`)
                } else {
                    API.getAllUsers()
                        .then(users => {
                            if (users.find(user => user.username === friendName)) {
                                API.addFriends(currentUser, friendName)
                                    .then(result => {
                                        API.getFriendsList(currentUser, "false", "false")
                                            .then(friends => {
                                                handleFriends.makeFriendRequestList(friends)
                                            })
                                        return true
                                    })
                            } else {
                                alert(`${friendName} is not a current user`)
                            }
                        })
                }
            })
    }
}


export default handleFriends



// {
//     "srcUserId": 1,
//     "userId": 7,
//     "accepted": false,
//     "id": 14
//   },
//   {
//     "srcUserId": 1,
//     "userId": 6,
//     "accepted": false,
//     "id": 15
//   },
//   {
//     "srcUserId": 1,
//     "userId": 5,
//     "accepted": false,
//     "id": 16
//   },
//   {
//     "srcUserId": 1,
//     "userId": 4,
//     "accepted": false,
//     "id": 17
//   }