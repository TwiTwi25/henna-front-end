import React, { useState } from 'react';

const BoothBabe = ({ babe, index, updateBabe, deleteBabe }) => {
    const [startingTicket, setStartingTicket] = useState(0);
    const [endingTicket, setEndingTicket] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBabe(index, parseInt(startingTicket) || 0, parseInt(endingTicket) || 0);
        setStartingTicket(0);
        setEndingTicket(0);
    };

    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${babe.name}?`);
        if (confirmed) {
            deleteBabe(index);
        }
    };

    return (
        <div className="babe">
            <h2>{babe.name}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Starting Ticket: </label>
                    <input
                        type="number"
                        value={startingTicket}
                        onChange={(e) => setStartingTicket(e.target.value)}
                        placeholder="Enter starting ticket"
                        className="babe-input"
                    />
                </div>
                <div className="input-group">
                    <label>Ending Ticket: </label>
                    <input
                        type="number"
                        value={endingTicket}
                        onChange={(e) => setEndingTicket(e.target.value)}
                        placeholder="Enter ending ticket"
                        className="babe-input"
                    />
                </div>
                <div className="artist-buttons">
                    <button type="submit" className="submit-button">Next</button>
                    <button type="button" onClick={handleDelete} className="delete-babe">Delete</button>
                </div>
            </form>
        </div>
    );
};

export default BoothBabe;
