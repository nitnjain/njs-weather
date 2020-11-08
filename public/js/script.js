console.log('CS JS loaded');

const weatherForm = document.querySelector('#searchForm');
const search = document.querySelector('#search');

const msgText = document.querySelector('#forecast');
const errorText = document.querySelector('#error');
const loadingText = document.querySelector('#loadingText');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const url = `http://localhost:3000/weather?address=${location}`;

    errorText.textContent = '';
    msgText.textContent = '';
    loadingText.textContent = 'Loading...';

    fetch(url)
        .then(response => {
            response.json().then((data) => {
                if(data.error) {
                    loadingText.textContent = '';
                    console.log(data.error);
                    errorText.textContent = data.error;
                } else {
                    loadingText.textContent = '';
                    msgText.textContent = `${data.location} - ${data.data}`;
                }
            })
        })
});