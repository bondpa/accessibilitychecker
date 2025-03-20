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
            console.log("Data from API:", data);
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

                        {/* Related Nodes - NEW SECTION */}
                        {node.any && node.any.length > 0 && (
                            (() => { //Immediately Invoked Function Expression (IIFE)
                                const hasRelatedNodes = node.any.some(anyNode => anyNode.relatedNodes && anyNode.relatedNodes.length > 0);
                                if (!hasRelatedNodes) {
                                    return null; // Don't render anything if no related nodes
                                }

                                return (
                                    <div>
                                        <h5>Related Nodes:</h5>
                                        {node.any.map((anyNode, anyIndex) => (
                                            anyNode.relatedNodes && anyNode.relatedNodes.length > 0 ? (
                                                anyNode.relatedNodes.map((relatedNode, relatedIndex) => (
                                                    <div key={relatedIndex} style={{ marginLeft: '20px', marginBottom: '5px', border: '1px solid #ddd', padding: '5px' }}>
                                                        <p><strong>Related HTML:</strong><br /><pre>{relatedNode.html}</pre></p>
                                                        {relatedNode.target && relatedNode.target.length > 0 && (
                                                            <p><strong>Related Target:</strong> {relatedNode.target.join(', ')}</p>
                                                        )}
                                                    </div>
                                                ))
                                            ) : null
                                        ))}
                                    </div>
                                );
                            })()
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
            {accessibilityData && (
                <div>
                    {console.log("AccessibilityData.issues being passed:", accessibilityData.issues)}
                    {renderIssueDetails(accessibilityData.issues)}
                </div>
            )}
        </div>
    );
};

export default AccessibilityCard;