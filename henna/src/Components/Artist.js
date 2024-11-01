import React, { useState } from 'react';

const Artist = ({ artist, index, updateArtist, deleteArtist }) => {
    const [tickets, setTickets] = useState(0);
    const [tips, setTips] = useState(0);

    const handleUpdate = () => {
        updateArtist(index, parseInt(tickets) || 0, parseInt(tips) || 0);
        setTickets(0);
        setTips(0); // Clear the input fields after submission
    };

    return (
        <div className="artist">
            <h2>{artist.name}</h2>

            <label>Tickets Sold (Add Sale): </label>
            <input
                type="number"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                placeholder="Enter tickets sold"
            />
            <p>Total Tickets Sold: {artist.tickets}</p>

            <label>Tips (Add Amount): </label>
            <input
                type="number"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                placeholder="Enter tips"
            />
            <p>Total Tips: ${artist.tips}</p>

            <button onClick={handleUpdate}>Submit</button>
            <button onClick={() => deleteArtist(index)} className="delete-artist">
                Delete
            </button>
        </div>
    );
};

export default Artist;