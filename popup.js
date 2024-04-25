function fetchAndDisplayFeeds(newspaperId) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    switch (newspaperId) {
        case 'newspaper1':
            fetchFeed('https://prod-qt-images.s3.amazonaws.com/production/prothomalo-bangla/feed.xml');
            break;
        case 'newspaper2':
            fetchFeed('https://www.jagonews24.com/rss/rss.xml');
            break;
        case 'newspaper3':
            fetchFeed('https://www.jagonews24.com/rss/rss.xml');
            break;
        case 'newspaper4':
            fetchFeed('https://www.thedailystar.net/frontpage/rss.xml');
            break;
    }
}


function fetchFeed(feedUrl) {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`)
        .then(response => response.json())
        .then(data => {
            const loader = document.getElementById('loader');
            loader.style.display = 'none';
            console.log(data.items)
            displayFeed(data.items);
        })
        .catch(error => {
            console.error('Error fetching RSS feed:', error);
            const loader = document.getElementById('loader');
            loader.style.display = 'none';
        });
}

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

document.addEventListener('DOMContentLoaded', function () {
    var newspaperIcons = document.getElementsByClassName('newspaper-icon');
    for (var i = 0; i < newspaperIcons.length; i++) {
        newspaperIcons[i].addEventListener('click', function (event) {
            var newspaperId = event.target.id;
            fetchAndDisplayFeeds(newspaperId);
        });
    }
});