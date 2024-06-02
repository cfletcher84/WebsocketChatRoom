console.log('hello from main.js')
const socket = io()

//create list element for chat messages

socket.on('message', (msg) => {
    let msgElement = document.createElement('li')
    msgElement.className = 'list-group-item'
    msgElement.innerHTML = msg
    let messages = document.getElementById('messages')
    messages.append(msgElement)
})

// Create logg in user.

let loggedInUser = null;

const usernameForm = document.getElementById('username-form');


// add submit event listener to usernname form to set the login user

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newUser = e.target.username.value
    if (!newUser) {
        console.log('You need to enter a user name')
        return
    }
    loggedInUser = newUser
    let welcome =  `FletchBot: Welcome to the chat ${loggedInUser}!`
    messages.append(welcome)
    welcome = document.getElementById('welcome-banner')
    welcome.innerText = 'Welcome to Fletcher Temple Chat, ' + loggedInUser + '!!'
    // hide the usernmae row
    usernameRow = document.getElementById('usernameRow')
    usernameRow.style.display = 'none'
    messageRow = document.getElementById('messageRow')
    messageRow.style.display = 'block'

})


//get send chat and add event listener to emit send_chat_message

const chatForm =  document.getElementById('send-chat')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = e.target.message.value
    let messageData = {
            message: message,
            username: loggedInUser
        }
    socket.emit('send_chat_message', messageData)
    e.target.message.value = '';
})
