import React, { useState } from 'react';

const BoothBabe = () => {
    const [babes, setBabes] = useState([]);
    const [babeName, setBabeName] = useState('');
    const [startingTicket, setStartingTicket] = useState('');
    const [endingTicket, setEndingTicket] = useState('');
    const [currentBabeIndex, setCurrentBabeIndex] = useState(null); // Track the currently edited babe

    const addBabe = () => {
        if (babeName.trim() === '') {
            alert("Please enter a name for the babe."); // Alert if name is empty
            return;
        }

        // Create a new babe object
        const newBabe = { name: babeName, startingTicket: '', endingTicket: '' };
        setBabes([...babes, newBabe]);
        setBabeName(''); // Clear name input after adding

        // Set current babe index to the new babe's index
        setCurrentBabeIndex(babes.length); // Length will give the new index
    };

    const updateTickets = () => {
        if (currentBabeIndex !== null) {
            const updatedBabes = [...babes];
            updatedBabes[currentBabeIndex].startingTicket = startingTicket;
            updatedBabes[currentBabeIndex].endingTicket = endingTicket;
            setBabes(updatedBabes);
            setStartingTicket(''); // Clear starting ticket input
            setEndingTicket(''); // Clear ending ticket input
            setCurrentBabeIndex(null); // Reset current babe index
        }
    };

    return (
        <div className="booth-babe-container">
            <div className="input-group">
                <label>Babe Name</label>
                <input
                    type="text"
                    value={babeName}
                    onChange={(e) => setBabeName(e.target.value)}
                    className="artist-input"
                    placeholder="Enter Babe Name"
                />
            </div>
            <button onClick={addBabe} className="add-babe-button">
                Add Babe
            </button>

            {currentBabeIndex !== null && (
                <div className="ticket-inputs">
                    <div className="input-group">
                        <label>Starting Ticket Number</label>
                        <input
                            type="number"
                            value={startingTicket}
                            onChange={(e) => setStartingTicket(e.target.value)}
                            className="artist-input"
                            placeholder="Enter Starting Ticket"
                        />
                    </div>
                    <div className="input-group">
                        <label>Ending Ticket Number</label>
                        <input
                            type="number"
                            value={endingTicket}
                            onChange={(e) => setEndingTicket(e.target.value)}
                            className="artist-input"
                            placeholder="Enter Ending Ticket"
                        />
                    </div>
                    <button onClick={updateTickets} className="add-babe-button">
                        Save Tickets
                    </button>
                </div>
            )}

            <div className="babe-list">
                {babes.map((babe, index) => (
                    <div key={index}>
                        <h4>{babe.name}</h4>
                        {babe.startingTicket && babe.endingTicket && (
                            <p>
                                Starting Ticket: {babe.startingTicket} - Ending Ticket: {babe.endingTicket}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoothBabe; // Export statement placed at the end