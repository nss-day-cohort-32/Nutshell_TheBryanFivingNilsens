const friendsDiv = document.querySelector("#friend-list")

const makeFriendsList = (friends) => {
    friends.forEach(friend => {
        let addFriend = `
            <p>${friend.user.username}</p>
            <p class="hidden">${friend.user.email}
            <button id="remove-friend-btn--${friend.user.id}">Remove Friend>
            </p>
        `
        friendsDiv.innerHTML += addFriend
    })
}

export default makeFriendsList