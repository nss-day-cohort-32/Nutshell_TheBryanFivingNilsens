import API from "./dbCalls";

const friendsDiv = document.querySelector("#friend-list")
const friendRequestDiv = document.querySelector("#friend-requests")


const handleFriends = {
    makeFriendsList(friends) {
        friendsDiv.innerHTML += "<h2>Friends</h2>"
        friends.forEach(friend => {
            let addFriend = `
            <div class="" id="${friend.user.id}">
            <p id="friend-in-list--${friend.user.id}" class="friendName">${friend.user.username}</p>
            <p id="friendEmail--${friend.user.id}" class="hidden">Contact: ${friend.user.email}</p>
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
    },
    acceptFriendRequest(friendUsername) {
        let currentUser = sessionStorage.getItem("activeUser")
        console.log(currentUser)
        console.log(friendUsername)
        API.acceptFriends(currentUser, friendUsername)
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