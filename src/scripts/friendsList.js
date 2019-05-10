const friendsDiv = document.querySelector("#friend-list")

const makeFriendsList = (friends) => {
    friends.forEach(friend => {
        let addFriend = `
            <p id="friend-in-list">${friend.user.username}</p>
            <p id="friend-in-list-email" class="hidden">${friend.user.email}</p>
            <button id="delete-friend" class="hidden deleteFriend--${friend.user.id}">Register</button>
        `
        friendsDiv.innerHTML += addFriend
    })
}

export default makeFriendsList