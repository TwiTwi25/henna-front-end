import React, { useState } from 'react';

const Artist = ({ artist, index, updateArtist, deleteArtist }) => {
    const [tickets, setTickets] = useState(0);
    const [tips, setTips] = useState(0);

    // Handle form submission (when the "Next" button is clicked)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        updateArtist(index, parseInt(tickets) || 0, parseFloat(tips) || 0); // Use parseFloat for tips
        setTickets(0);
        setTips(0); // Clear the input fields after submission
    };

    // Handle deletion with confirmation
    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${artist.name}?`);
        if (confirmed) {
            deleteArtist(index);
        }
    };

    return (
        <div className="artist-section">
            <h2>{artist.name}</h2>

            {/* Form for ticket and tip submission */}
            <form onSubmit={handleSubmit}>
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
                    step="0.01"  // Allow decimals for tips
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                    placeholder="Enter tips"
                />
                <p>Total Tips: ${artist.tips.toFixed(2)}</p> {/* Display tips with 2 decimal places */}

                {/* Submit and Delete buttons */}
                <div className="artist-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
                </div>
            </form>
        </div>
    );
};

export default Artist;
