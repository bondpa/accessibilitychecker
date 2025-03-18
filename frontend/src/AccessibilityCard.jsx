import React, { useState } from 'react';

const AccessibilityCard = ({ url }) => {
    const [accessibilityData, setAccessibilityData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost/check-webpage/?url=${url}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAccessibilityData(data);
            setError(null);
        } catch (e) {
            setError(e.message);
            setAccessibilityData(null);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <a href={url} onClick={handleClick}>
                {url}
            </a>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {accessibilityData && (
                <pre>{JSON.stringify(accessibilityData, null, 2)}</pre>
            )}
        </div>
    );
};

export default AccessibilityCard;