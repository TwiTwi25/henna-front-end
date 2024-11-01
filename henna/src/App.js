import React, { useState, useEffect } from 'react';
import Header from './Components/Header'; // Importing the Header component
import Artist from './Components/Artist'; // Importing the Artist component
import AddArtistButton from './Components/AddArtistButton'; // Importing the AddArtistButton component

function App() {
  const [artists, setArtists] = useState([]);

  // Load artists from localStorage when the component mounts
  useEffect(() => {
    const savedArtists = JSON.parse(localStorage.getItem('artists')) || [];
    setArtists(savedArtists);
  }, []);

  // Save artists to localStorage when the list changes
  useEffect(() => {
    localStorage.setItem('artists', JSON.stringify(artists));
  }, [artists]);

  // Add a new artist
  const addArtist = (name) => {
    setArtists([...artists, { name, tickets: 0, tips: 0 }]);
  };

  // Update ticket and tip counts for an artist
  const updateArtist = (index, tickets, tips) => {
    const updatedArtists = [...artists];
    updatedArtists[index].tickets += tickets;
    updatedArtists[index].tips += tips;
    setArtists(updatedArtists);
  };

  // Delete an artist from the list
  const deleteArtist = (index) => {
    const updatedArtists = artists.filter((_, i) => i !== index);
    setArtists(updatedArtists);
  };

  return (
    <div className="App">
      <Header /> {/* Display the header */}
      <div className="artist-section">
        {artists.map((artist, index) => (
          <Artist
            key={index}
            index={index}
            artist={artist}
            updateArtist={updateArtist}
            deleteArtist={deleteArtist}
          />
        ))}
      </div>
      <AddArtistButton addArtist={addArtist} /> {/* Add artist button */}
    </div>
  );
}

export default App;
