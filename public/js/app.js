const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');
const messageOne = document.querySelector('p#message-1')
const messageTwo = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Fetching weather :)';
    messageTwo.textContent = '';

    fetch(`/weather?address=${searchValue.value}`).then(response => response.json().then( (data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            return
        }
        messageOne.textContent = `Weather in ${data.location} : ${data.weather}`;
        messageTwo.textContent = `Temperature is ${data.temperature}°C (feels like ${data.feelslike}°C)`
    }))
})