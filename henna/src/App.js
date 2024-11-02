import React, { useState, useEffect } from 'react';
import Header from './Components/Header'; // Importing the Header component
import Artist from './Components/Artist'; // Importing the Artist component
import AddArtistButton from './Components/AddArtistButton'; // Importing the AddArtistButton component
import BoothBabe from './Components/BoothBabe'; // Importing the BoothBabe component
import './App.css'; // Importing stylesheet

function App() {
  const [artists, setArtists] = useState([]);
  const [activeTab, setActiveTab] = useState('artist'); // State to track the active tab

  // Load artists from localStorage when the component mounts
  useEffect(() => {
    const savedArtists = localStorage.getItem('artists');
    if (savedArtists) {
      // Debugging: Check if data is properly loaded from localStorage
      console.log("Loaded from localStorage:", JSON.parse(savedArtists));
      setArtists(JSON.parse(savedArtists));
    }
  }, []);

  // Save artists to localStorage whenever the list of artists changes
  useEffect(() => {
    if (artists.length > 0) {
      // Debugging: Check if data is being saved to localStorage
      console.log("Saving to localStorage:", artists);
      localStorage.setItem('artists', JSON.stringify(artists));
    }
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
      <Header />
      <div className="tab-container">
        <button
          onClick={() => setActiveTab('artist')}
          className={activeTab === 'artist' ? 'active' : ''}
        >
          Artist
        </button>
        <button
          onClick={() => setActiveTab('boothBabe')}
          className={activeTab === 'boothBabe' ? 'active' : ''}
        >
          Booth Babe
        </button>
      </div>

      {activeTab === 'artist' && (
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
          <AddArtistButton addArtist={addArtist} />
        </div>
      )}

      {activeTab === 'boothBabe' && (
        <div className="booth-babe-section">
          <BoothBabe />
        </div>
      )}
    </div>
  );
}

export default App;