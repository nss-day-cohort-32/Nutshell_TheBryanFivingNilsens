const friendsDiv = document.querySelector("#friend-list")

const makeFriendsList = (friends) => {
    // console.log(friends)
    friends.forEach(friend => {
        console.log(friend)
        // let addFriend = `
        //     <p>${friend.username}</p>
        // `
        // friendsDiv.innerHTML += addFriend
    })
}

export default makeFriendsList