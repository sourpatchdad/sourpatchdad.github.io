const fetch = require('node-fetch');

const TRAKT_CONFIG = {
    clientId: '92e0c311e18ec187627337bad034f1bc74a5274706090696caaa385ddc21fa8d',
    username: 'sourpatchdad'
};

exports.handler = async function(event, context) {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Fetching Trakt history for:', TRAKT_CONFIG.username);

        const response = await fetch(
            `https://api.trakt.tv/users/${TRAKT_CONFIG.username}/history?limit=12`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'trakt-api-version': '2',
                    'trakt-api-key': TRAKT_CONFIG.clientId
                }
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Trakt API error:', response.status, errorText);
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: `Trakt API error: ${response.status}`,
                    details: errorText
                })
            };
        }

        const data = await response.json();
        console.log('Successfully fetched', data.length, 'items');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error in Trakt function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to fetch Trakt data',
                message: error.message
            })
        };
    }
};
