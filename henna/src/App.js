import React, { useState, useEffect } from 'react';
import Header from './Components/Header'; // Importing the Header component
import Artist from './Components/Artist'; // Importing the Artist component
import AddArtistButton from './Components/AddArtistButton'; // Importing the AddArtistButton component
import BoothBabe from './Components/BoothBabe'; // Importing the BoothBabe component
import AddBabeButton from './Components/AddBabeButton'; // Importing the AddBabeButton component
import './App.css'; // Importing stylesheet

function App() {
  const [artists, setArtists] = useState([]);
  const [boothBabes, setBoothBabes] = useState([]); // State for booth babes
  const [activeTab, setActiveTab] = useState('artist'); // State to track the active tab

  // Load artists from localStorage when the component mounts
  useEffect(() => {
    const savedArtists = localStorage.getItem('artists');
    if (savedArtists) {
      console.log("Loaded from localStorage:", JSON.parse(savedArtists));
      setArtists(JSON.parse(savedArtists));
    }
  }, []);

  // Load booth babes from localStorage when the component mounts
  useEffect(() => {
    const savedBabes = localStorage.getItem('boothBabes');
    if (savedBabes) {
      console.log("Loaded booth babes from localStorage:", JSON.parse(savedBabes));
      setBoothBabes(JSON.parse(savedBabes));
    }
  }, []);

  // Save artists to localStorage whenever the list of artists changes
  useEffect(() => {
    if (artists.length > 0) {
      console.log("Saving to localStorage:", artists);
      localStorage.setItem('artists', JSON.stringify(artists));
    } else {
      localStorage.removeItem('artists');
    }
  }, [artists]);

  // Save booth babes to localStorage whenever the list of booth babes changes
  useEffect(() => {
    if (boothBabes.length > 0) {
      console.log("Saving booth babes to localStorage:", boothBabes);
      localStorage.setItem('boothBabes', JSON.stringify(boothBabes));
    } else {
      localStorage.removeItem('boothBabes');
    }
  }, [boothBabes]);

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

  // Add a new booth babe
  const addBabe = (name) => {
    setBoothBabes([...boothBabes, { name, startingTickets: 0, endingTickets: 0 }]);
  };

  // Update ticket counts for a booth babe
  const updateBabe = (index, startingTickets, endingTickets) => {
    const updatedBabes = [...boothBabes];
    updatedBabes[index].startingTickets += startingTickets;
    updatedBabes[index].endingTickets += endingTickets;
    setBoothBabes(updatedBabes);
  };

  // Delete a booth babe from the list
  const deleteBabe = (index) => {
    const updatedBabes = boothBabes.filter((_, i) => i !== index);
    setBoothBabes(updatedBabes);
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
          {boothBabes.map((babe, index) => (
            <BoothBabe
              key={index}
              index={index}
              babe={babe}
              updateBabe={updateBabe}
              deleteBabe={deleteBabe}
            />
          ))}
          <AddBabeButton addBabe={addBabe} />
        </div>
      )}
    </div>
  );
}

export default App;
