import React, { useState } from 'react';

const AccessibilityCard = ({ url }) => {
    const [accessibilityData, setAccessibilityData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3300/check-webpage/?url=${url}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data from API:", data); // Add this line
            setAccessibilityData(data);
            setError(null);
        } catch (e) {
            setError(e.message);
            setAccessibilityData(null);
        }
    };

    const renderIssueDetails = (issues) => {
        console.log("Issues received by renderIssueDetails:", issues);
        if (!issues || issues.length === 0) {
            return <p>No accessibility issues found.</p>;
        }

        return issues.map((issue, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px' }}>
                <h3>{issue.help}</h3>
                <p>{issue.description}</p>
                <p><strong>Impact:</strong> {issue.impact}</p>
                <a href={issue.helpUrl} target="_blank" rel="noopener noreferrer">
                    Learn more
                </a>

                <h4>Occurrences:</h4>
                {issue.nodes.map((node, nodeIndex) => (
                    <div key={nodeIndex} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #f0f0f0' }}>
                        <p><strong>Issue Details:</strong></p>
                        <p>{node.failureSummary}</p>
                        <p><strong>HTML:</strong><br /><pre>{node.html}</pre></p>
                        {node.target && node.target.length > 0 && (
                            <p><strong>Target:</strong> {node.target.join(', ')}</p>
                        )}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <a href={url} onClick={handleClick}>
                {url}
            </a>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {accessibilityData && ( // Remove the length check here
                <div>
                    {/*<h2>{accessibilityData.message}</h2> This line is removed because the message is no longer at the top level */}
                    {/*<h3>Issues for: <a href={accessibilityData.url} target="_blank" rel="noopener noreferrer">{accessibilityData.url}</a></h3> This line is removed because the URL is no longer at the top level */}
                    {console.log("AccessibilityData.issues being passed:", accessibilityData.issues)}
                    {renderIssueDetails(accessibilityData.issues)} {/* Access the issues array */}
                </div>
            )}
        </div>
    );
};

export default AccessibilityCard;