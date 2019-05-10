const friendsDiv = document.querySelector("#friend-list")
const friendRequestDiv = document.querySelector("#friend-requests")


const handleFriends = {
    makeFriendsList(friends) {
        friendsDiv.innerHTML = "<h2>Friends</h2>"
        friends.forEach(friend => {
            let addFriend = `
            <p id="friend-in-list--${friend.user.id}" class="friendName">${friend.user.username}</p>
            <div class="hidden" id="${friend.user.id}">
            <p id="friendEmail--${friend.user.id}" class="">${friend.user.email}</p>
            <button id="delete-friend--${friend.user.id}" class="deleteFriend">Remove Friend</button>
            </div>
        `
            friendsDiv.innerHTML += addFriend
        })
    },
    makeFriendRequestList(friends) {
        friendRequestDiv.innerHTML = "<h2>Friend Requests</h2>"
        friends.forEach(friend => {
            let addFriendRequest = `
            <p id="friend-in-list--${friend.user.id}" class="friendName">${friend.user.username}</p>
            <div class="" id="${friend.user.id}">
            <button id="add-friend--${friend.user.id}">Accept Request</button>
            <button id="delete-friend--${friend.user.id}" class="deleteFriend">Deny Request</button>
            </div>
        `
            friendRequestDiv.innerHTML += addFriendRequest
        })
    }
}

export default handleFriends
