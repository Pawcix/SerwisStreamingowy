const notificationOne = document.querySelector('#notificationOne');
const notificationTwo = document.querySelector('#notificationTwo');
const notificationTextOne = document.querySelector('#notificationTextOne');
const notificationTextTwo = document.querySelector('#notificationTextTwo');
const closeNotificationOne = document.querySelector('#closeNotificationOne');
const closeNotificationTwo = document.querySelector('#closeNotificationTwo');

const notificationSound = new Audio('audio/notification.mp3');

const hideNotificationOne = () => {
    notificationOne.hidden = true;
}

const hideNotificationTwo = () => {
    notificationTwo.hidden = true;
}

const showNotificationOne = (message) => {
    notificationSound.play();
    notificationTextOne.textContent = message;
    notificationOne.hidden = false;
}

const showNotificationTwo = (message) => {
    notificationSound.play();
    notificationTextTwo.textContent = message;
    notificationTwo.hidden = false;
}

setTimeout(() => {
    showNotificationOne('Słabe połączenie internetowe!');
}, 5000);

setTimeout(() => {
    showNotificationTwo('Nowa wiadomość od znajomego!');
}, 12000);

closeNotificationOne.addEventListener('click', hideNotificationOne)
closeNotificationTwo.addEventListener('click', hideNotificationTwo);


