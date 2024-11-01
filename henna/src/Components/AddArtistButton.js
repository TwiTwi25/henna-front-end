import React, { useState } from 'react';

const AddArtistButton = ({ addArtist }) => {
    const [artistName, setArtistName] = useState('');

    const handleAddArtist = () => {
        if (artistName) {
            addArtist(artistName); // Add the new artist
            setArtistName(''); // Clear the input after adding
        } else {
            alert('Please enter a valid artist name.');
        }
    };

    return (
        <div className="add-artist">
            <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Enter artist's name"
            />
            <button onClick={handleAddArtist}>Add Artist</button>
        </div>
    );
};

export default AddArtistButton;