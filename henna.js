let artistCount = 0; // Start counting artists from 0

// Select the button and the artist section container
const addArtistButton = document.getElementById('add-artist');
const artistSection = document.getElementById('artist-section');

// Load existing artists from localStorage
function loadArtists() {
    const artistsData = JSON.parse(localStorage.getItem('artists')) || [];
    artistCount = artistsData.length;

    artistsData.forEach((artist) => {
        createArtistSection(artist.name, artist.tickets, artist.tips);
    });
}

// Function to create a new artist section
function createArtistSection(name, tickets = 0, tips = 0) {
    artistCount++;
    const newArtist = document.createElement('div');
    newArtist.classList.add('artist');
    newArtist.id = `artist${artistCount}`;

    const artistHeading = document.createElement('h2');
    artistHeading.textContent = name; // Use the artist's name
    newArtist.appendChild(artistHeading);

    // Tickets sold input and cumulative total
    const ticketLabel = document.createElement('label');
    ticketLabel.setAttribute('for', `tickets${artistCount}`);
    ticketLabel.textContent = 'Tickets Sold (Add Sale): ';
    newArtist.appendChild(ticketLabel);

    const ticketInput = document.createElement('input');
    ticketInput.setAttribute('type', 'number');
    ticketInput.id = `tickets${artistCount}`;
    ticketInput.classList.add('tickets-input');
    ticketInput.setAttribute('placeholder', 'Enter tickets sold');
    ticketInput.setAttribute('min', '0'); // Prevent negative values
    newArtist.appendChild(ticketInput);

    const ticketTotalDisplay = document.createElement('p');
    ticketTotalDisplay.id = `total-tickets${artistCount}`;
    ticketTotalDisplay.textContent = `Total Tickets Sold: ${tickets}`;
    newArtist.appendChild(ticketTotalDisplay);

    // Tips input and cumulative total
    const tipLabel = document.createElement('label');
    tipLabel.setAttribute('for', `tips${artistCount}`);
    tipLabel.textContent = 'Tips (Add Amount): ';
    newArtist.appendChild(tipLabel);

    const tipInput = document.createElement('input');
    tipInput.setAttribute('type', 'number');
    tipInput.id = `tips${artistCount}`;
    tipInput.classList.add('tips-input');
    tipInput.setAttribute('placeholder', 'Enter tips');
    tipInput.setAttribute('min', '0'); // Prevent negative values
    newArtist.appendChild(tipInput);

    const tipTotalDisplay = document.createElement('p');
    tipTotalDisplay.id = `total-tips${artistCount}`;
    tipTotalDisplay.textContent = `Total Tips: $${tips}`;
    newArtist.appendChild(tipTotalDisplay);

    // Single Submit button for both tickets and tips
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('submit-button');
    newArtist.appendChild(submitButton);

    // Handle submit and Enter key for both inputs
    submitButton.addEventListener('click', function () {
        const ticketSale = parseInt(ticketInput.value) || 0;
        const tipAmount = parseInt(tipInput.value) || 0;

        // Update totals
        tickets += ticketSale;
        tips += tipAmount;

        ticketTotalDisplay.textContent = `Total Tickets Sold: ${tickets}`;
        tipTotalDisplay.textContent = `Total Tips: $${tips}`;
        ticketInput.value = ''; // Clear the input field after adding
        tipInput.value = ''; // Clear the input field after adding

        // Save updated totals in localStorage
        saveArtists();
    });

    // Handle "Enter" key for both inputs
    ticketInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitButton.click(); // Trigger the submit button click
        }
    });

    tipInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitButton.click(); // Trigger the submit button click
        }
    });

    // Delete button for dynamic artists only
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-artist');
    deleteButton.addEventListener('click', function () {
        // Confirmation before deletion
        const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            artistSection.removeChild(newArtist);
            reorderArtists(); // Reorder artist sections
            saveArtists(); // Update localStorage after deletion
        }
    });
    newArtist.appendChild(deleteButton);

    artistSection.appendChild(newArtist);
}

// Function to reorder artist sections
function reorderArtists() {
    const artists = Array.from(artistSection.querySelectorAll('.artist'));

    artists.forEach((artist, index) => {
        artist.id = `artist${index + 1}`;
        artist.querySelector('h2').textContent = artist.querySelector('h2').textContent; // Keep the name
        artist.querySelector('.tickets-input').id = `tickets${index + 1}`;
        artist.querySelector('.tips-input').id = `tips${index + 1}`;
        artist.querySelector(`#total-tickets${index}`).id = `total-tickets${index + 1}`;
        artist.querySelector(`#total-tips${index}`).id = `total-tips${index + 1}`;
    });

    artistCount = artists.length;
}

// Function to save artists to localStorage
function saveArtists() {
    const artists = Array.from(artistSection.querySelectorAll('.artist')).map(artist => {
        return {
            name: artist.querySelector('h2').textContent,
            tickets: parseInt(artist.querySelector('p[id^="total-tickets"]').textContent.split(': ')[1]),
            tips: parseInt(artist.querySelector('p[id^="total-tips"]').textContent.split(': $')[1]) || 0
        };
    });
    localStorage.setItem('artists', JSON.stringify(artists));
}

// Add event listener to the "+" button
addArtistButton.addEventListener('click', function () {
    const artistName = prompt("Enter the artist's name:"); // Prompt for artist's name
    if (artistName) {
        createArtistSection(artistName); // Create new artist section
        saveArtists(); // Save to localStorage
    } else {
        alert("Please enter a valid artist name."); // Alert if no name is provided
    }
});

// Load existing artists when the page loads
loadArtists();

// Initial setup for Artist 1 if it doesn't exist
if (artistCount === 0) {
    const defaultArtistName = prompt("Enter the name for Artist 1:"); // Prompt for Artist 1's name
    if (defaultArtistName) {
        createArtistSection(defaultArtistName); // Create the first artist section
        saveArtists(); // Save to localStorage
    }
}
