import React, { useState } from 'react';

function SitemapUrlList() {
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState('');

    const fetchUrls = async () => {
        try {
            setError('');
            const response = await fetch(`http://localhost:3300/get-pages-from-sitemap/?url=${sitemapUrl}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            if (Array.isArray(data)) {
                setUrls(data);
            } else {
                throw new Error('Invalid data format. Expected an array of URLs.');
            }
        } catch (e) {
            setError(e.message);
            setUrls([]);
        }
    };

    return (
        <div>
            <label htmlFor="sitemapUrl">Sitemap URL:</label>
            <input
                type="text"
                id="sitemapUrl"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
            />
            <button onClick={fetchUrls}>Get URLs</button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {urls.length > 0 && (
                <ul>
                    {urls.map((url, index) => (
                        <li key={index}>
                            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SitemapUrlList;