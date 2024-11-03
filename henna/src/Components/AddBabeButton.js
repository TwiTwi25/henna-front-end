import React, { useState } from 'react';

const AddBabeButton = ({ addBabe }) => {
    const [babeName, setBabeName] = useState('');

    const handleAddBabe = () => {
        if (babeName) {
            addBabe(babeName); // Add the new booth babe
            setBabeName(''); // Clear the input after adding
        } else {
            alert('Please enter a valid name.');
        }
    };

    return (
        <div className="add-babe">
            {/* Input field for booth babe name */}
            <input
                type="text"
                value={babeName}
                onChange={(e) => setBabeName(e.target.value)}
                placeholder="Enter booth babe's name"
            />
            {/* Button below the input */}
            <button onClick={handleAddBabe}>Add Booth Babe</button>
        </div>
    );
};

export default AddBabeButton;