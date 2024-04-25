// Function to fetch and display RSS feeds for a specific newspaper
function fetchAndDisplayFeeds(newspaperId) {
    // Fetch and display feeds for the selected newspaper
    switch (newspaperId) {
        case 'newspaper1':
            fetchFeed('https://api.rss2json.com/v1/api.json?rss_url=https://www.prothomalo.com/feed/');
            break;
        case 'newspaper2':
            fetchFeed('https://api.rss2json.com/v1/api.json?rss_url=https://www.jagonews24.com/rss/rss.xml');
            break;
        case 'newspaper3':
            fetchFeed('https://api.rss2json.com/v1/api.json?rss_url=https://www.jagonews24.com/rss/rss.xml');
            break;
        case 'newspaper4':
            fetchFeed('https://api.rss2json.com/v1/api.json?rss_url=https://www.thedailystar.net/frontpage/rss.xml');
            break;
    }
}

// Function to fetch the RSS feed from the provided URL
function fetchFeed(feedUrl) {
    // Use the fetch API to fetch the RSS feed
    fetch(feedUrl)
        .then(response => response.json())
        .then(data => {
            // Display the parsed feed in the popup
            displayFeed(data.items);
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
        });
}

// Function to display the parsed RSS feed in the popup
function displayFeed(items) {
    const feedContainer = document.getElementById('feeds');
    feedContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('feed-item');
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">Read more</a>
        `;
        feedContainer.appendChild(itemElement);
    });
}

// Add event listeners to newspaper icons
document.addEventListener('DOMContentLoaded', function () {
    var newspaperIcons = document.getElementsByClassName('newspaper-icon');
    for (var i = 0; i < newspaperIcons.length; i++) {
        newspaperIcons[i].addEventListener('click', function (event) {
            var newspaperId = event.target.id;
            fetchAndDisplayFeeds(newspaperId);
        });
    }
});
