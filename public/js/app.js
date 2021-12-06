console.log('Client side Javascript File is loaded')
fetch('http://puzzle.mead.io/puzzle')
    .then(response => response.json()).then((data) => {
        console.log(data)
    })
const weatherfetch = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.Error) {
                messageOne.textContent = data.Error
            }
            else {
                messageOne.textContent = data.Location
                messageTwo.textContent = data.forecastData.weather_descriptions;
            }

        })
}
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loadiingg.......'
    messageTwo.textContent = ''
    const location = search.value;

    weatherfetch(location)
    console.log(location)
})