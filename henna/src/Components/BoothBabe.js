import React, { useState, useEffect } from 'react';

const BoothBabe = ({ babe, index, updateBabe, deleteBabe }) => {
    const [startingTicket, setStartingTicket] = useState('');
    const [endingTicket, setEndingTicket] = useState('');
    const [isStartingLocked, setIsStartingLocked] = useState(false);
    const [isEndingLocked, setIsEndingLocked] = useState(false);

    // Function to handle limiting input to 10 digits
    const handleInputChange = (value, setInput, setLocked) => {
        if (value.length <= 10 && /^\d*$/.test(value)) { // Allow only digits and max 10 numbers
            setInput(value);
            if (value.length === 10) {
                setLocked(true); // Lock input after 10 digits
            }
        }
    };

    const handleStartingChange = (e) => {
        const value = e.target.value;
        if (!isStartingLocked) {
            handleInputChange(value, setStartingTicket, setIsStartingLocked);
        }
    };

    const handleEndingChange = (e) => {
        const value = e.target.value;
        if (!isEndingLocked) {
            handleInputChange(value, setEndingTicket, setIsEndingLocked);
        }
    };

    const handleStartingSubmit = (e) => {
        e.preventDefault();
        updateBabe(index, parseInt(startingTicket) || 0, endingTicket ? parseInt(endingTicket) : 0);
        setIsStartingLocked(true); // Lock the starting ticket after submission
    };

    const handleEndingSubmit = (e) => {
        e.preventDefault();
        updateBabe(index, startingTicket ? parseInt(startingTicket) : 0, parseInt(endingTicket) || 0);
        setIsEndingLocked(true); // Lock the ending ticket after submission
    };

    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${babe.name}?`);
        if (confirmed) {
            deleteBabe(index);
        }
    };

    // Load locked states from localStorage when the component mounts
    useEffect(() => {
        const savedStartingTicket = localStorage.getItem(`startingTicket_${babe.name}`);
        const savedEndingTicket = localStorage.getItem(`endingTicket_${babe.name}`);
        const savedStartingLocked = localStorage.getItem(`isStartingLocked_${babe.name}`);
        const savedEndingLocked = localStorage.getItem(`isEndingLocked_${babe.name}`);

        if (savedStartingTicket) setStartingTicket(savedStartingTicket);
        if (savedEndingTicket) setEndingTicket(savedEndingTicket);
        if (savedStartingLocked === 'true') setIsStartingLocked(true);
        if (savedEndingLocked === 'true') setIsEndingLocked(true);
    }, [babe.name]);

    // Save states to localStorage whenever the tickets or locked states change
    useEffect(() => {
        localStorage.setItem(`startingTicket_${babe.name}`, startingTicket);
        localStorage.setItem(`endingTicket_${babe.name}`, endingTicket);
        localStorage.setItem(`isStartingLocked_${babe.name}`, isStartingLocked);
        localStorage.setItem(`isEndingLocked_${babe.name}`, isEndingLocked);
    }, [startingTicket, endingTicket, isStartingLocked, isEndingLocked, babe.name]);

    return (
        <div className="booth-babe-container">
            <h2>{babe.name}</h2>
            <form>
                <div className="input-group">
                    <label>Starting Ticket: </label>
                    <input
                        type="text"
                        value={startingTicket}
                        onChange={handleStartingChange}
                        placeholder="Enter starting ticket"
                        className="babe-input"
                        disabled={isStartingLocked} // Disable if locked
                    />
                    <div className="button-container">
                        <button
                            type="submit"
                            onClick={handleStartingSubmit}
                            disabled={isStartingLocked || startingTicket === ''}
                            className="submit-button"
                        >
                            Submit Starting Ticket
                        </button>
                    </div>
                </div>

                <div className="input-group">
                    <label>Ending Ticket: </label>
                    <input
                        type="text"
                        value={endingTicket}
                        onChange={handleEndingChange}
                        placeholder="Enter ending ticket"
                        className="babe-input"
                        disabled={isEndingLocked} // Disable if locked
                    />
                    <div className="button-container">
                        <button
                            type="submit"
                            onClick={handleEndingSubmit}
                            disabled={isEndingLocked || endingTicket === ''}
                            className="submit-button"
                        >
                            Submit Ending Ticket
                        </button>
                    </div>
                </div>

                <div className="artist-buttons">
                    <button type="button" onClick={handleDelete} className="delete-babe">Delete</button>
                </div>
            </form>
        </div>
    );
};

export default BoothBabe;
