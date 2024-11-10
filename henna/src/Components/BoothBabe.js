import React, { useState, useEffect } from 'react';

const BoothBabe = ({ babe, index, updateBabe, deleteBabe }) => {
    const [ticketRanges, setTicketRanges] = useState(() => {
        // Retrieve saved ranges from localStorage when the component is first initialized
        const savedRanges = localStorage.getItem(`ticketRanges_${babe.name}`);
        if (savedRanges) {
            return JSON.parse(savedRanges);
        }
        // Default value if nothing is in localStorage
        return [{ startingTicket: '', endingTicket: '', isStartingLocked: false, isEndingLocked: false }];
    });

    // Function to handle input changes
    const handleInputChange = (value, rangeIndex, field) => {
        const updatedRanges = [...ticketRanges];
        if (value.length <= 10 && /^\d*$/.test(value)) { // Allow only digits and max 10 numbers
            updatedRanges[rangeIndex][field] = value;
            if (value.length === 10) {
                updatedRanges[rangeIndex][field === 'startingTicket' ? 'isStartingLocked' : 'isEndingLocked'] = true; // Lock if 10 digits
            }
            setTicketRanges(updatedRanges);
        }
    };

    const handleStartingChange = (e, rangeIndex) => {
        const value = e.target.value;
        const updatedRanges = [...ticketRanges];
        if (!updatedRanges[rangeIndex].isStartingLocked) {
            handleInputChange(value, rangeIndex, 'startingTicket');
        }
    };

    const handleEndingChange = (e, rangeIndex) => {
        const value = e.target.value;
        const updatedRanges = [...ticketRanges];
        if (!updatedRanges[rangeIndex].isEndingLocked) {
            handleInputChange(value, rangeIndex, 'endingTicket');
        }
    };

    // Add a new ticket range for when they take a break and return
    const addNewTicketRange = () => {
        setTicketRanges([
            ...ticketRanges,
            { startingTicket: '', endingTicket: '', isStartingLocked: false, isEndingLocked: false }
        ]);
    };

    const handleStartingSubmit = (e, rangeIndex) => {
        e.preventDefault();
        const range = ticketRanges[rangeIndex];
        // Update the babe with the starting and ending tickets for this range
        updateBabe(index, parseInt(range.startingTicket) || 0, parseInt(range.endingTicket) || 0, rangeIndex);

        // Lock the inputs after submission
        const updatedRanges = [...ticketRanges];
        updatedRanges[rangeIndex].isStartingLocked = true;
        setTicketRanges(updatedRanges); // Lock the starting ticket input
    };

    const handleEndingSubmit = (e, rangeIndex) => {
        e.preventDefault();
        const range = ticketRanges[rangeIndex];
        // Update the babe with the starting and ending tickets for this range
        updateBabe(index, parseInt(range.startingTicket) || 0, parseInt(range.endingTicket) || 0, rangeIndex);

        // Lock the inputs after submission
        const updatedRanges = [...ticketRanges];
        updatedRanges[rangeIndex].isEndingLocked = true;
        setTicketRanges(updatedRanges); // Lock the ending ticket input
    };

    const handleDelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${babe.name}?`);
        if (confirmed) {
            // Delete from state
            deleteBabe(index);

            // Remove from localStorage
            localStorage.removeItem(`ticketRanges_${babe.name}`);
        }
    };

    // Save ticket ranges to localStorage whenever they change
    useEffect(() => {
        if (ticketRanges.length > 0) {
            console.log('Saving ticket ranges to localStorage:', ticketRanges); // Log when saving ticket ranges
            localStorage.setItem(`ticketRanges_${babe.name}`, JSON.stringify(ticketRanges));
        }
    }, [ticketRanges, babe.name]);

    return (
        <div className="booth-babe-container">
            <h2>{babe.name}</h2>
            {ticketRanges.map((range, rangeIndex) => (
                <form key={rangeIndex}>
                    <div className="input-group">
                        <label>Starting Ticket (Range {rangeIndex + 1}): </label>
                        <input
                            type="text"
                            value={range.startingTicket}
                            onChange={(e) => handleStartingChange(e, rangeIndex)}
                            placeholder="Enter starting ticket"
                            className="babe-input"
                            disabled={range.isStartingLocked} // Lock input if the field is locked
                        />
                        {/* Conditionally render the submit button */}
                        {!range.isStartingLocked && (
                            <button
                                type="submit"
                                onClick={(e) => handleStartingSubmit(e, rangeIndex)}
                                className="submit-button"
                            >
                                Submit Starting Ticket
                            </button>
                        )}
                    </div>

                    <div className="input-group">
                        <label>Ending Ticket (Range {rangeIndex + 1}): </label>
                        <input
                            type="text"
                            value={range.endingTicket}
                            onChange={(e) => handleEndingChange(e, rangeIndex)}
                            placeholder="Enter ending ticket"
                            className="babe-input"
                            disabled={range.isEndingLocked} // Lock input if the field is locked
                        />
                        {/* Conditionally render the submit button */}
                        {!range.isEndingLocked && (
                            <button
                                type="submit"
                                onClick={(e) => handleEndingSubmit(e, rangeIndex)}
                                className="submit-button"
                            >
                                Submit Ending Ticket
                            </button>
                        )}
                    </div>
                </form>
            ))}

            <div className="button-container">
                {/* Make the "Add New Ticket Range" button smaller */}
                <button type="button" onClick={addNewTicketRange} className="add-range-button">
                    Add New Ticket Range
                </button>
            </div>

            <button type="button" onClick={handleDelete} className="delete-babe">
                Delete
            </button>
        </div>
    );
};

export default BoothBabe;
