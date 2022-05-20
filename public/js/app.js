console.log('Client side javascript file is loaded !');

const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');
const messageOne = document.querySelector('p#message-1')
const messageTwo = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Fetching weather :)';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${searchValue.value}`).then(response => response.json().then( (data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            return
        }
        messageOne.textContent = `In ${data.location} the temperature is ${data.temperature}°C`;
        messageTwo.textContent = `But it feels like ${data.feelslike}°C`
    }))
})