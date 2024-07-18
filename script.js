document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const API_KEY = 'I will do once i get the api'; 

    async function fetchRestaurants(city, cuisine) {
        const response = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${city}&cuisines=${cuisine}`, {
            headers: {
                'user-key': API_KEY
            }
        });
        const data = await response.json();
        return data.restaurants;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const restaurant = result.restaurant;
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <p>Restaurant: ${restaurant.name}</p>
                <p>Address: ${restaurant.location.address}</p>
                <p>Cuisine: ${restaurant.cuisines}</p>
                <p>Rating: ${restaurant.user_rating.aggregate_rating}</p>
                <p><a href="${restaurant.url}" target="_blank">More Info</a></p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    searchButton.addEventListener('click', async () => {
        const city = document.getElementById('city').value;
        const cuisine = document.getElementById('cuisine').value;

        const restaurantResults = await fetchRestaurants(city, cuisine);
        displayResults(restaurantResults);
    });
});
