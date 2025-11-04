const fetch = require('node-fetch');

const TRAKT_CONFIG = {
    clientId: '92e0c311e18ec187627337bad034f1bc74a5274706090696caaa385ddc21fa8d',
    username: 'sourpatchdad'
};

// TMDB API key - Get free key at https://www.themoviedb.org/settings/api
const TMDB_API_KEY = process.env.TMDB_API_KEY || 'f8ca8528b52ea7d24ad9175f4aff5dc4';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

async function getTMDBPoster(tmdbId, type) {
    if (!tmdbId || !TMDB_API_KEY) {
        return null;
    }

    try {
        const endpoint = type === 'movie' ? 'movie' : 'tv';
        const response = await fetch(
            `https://api.themoviedb.org/3/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`
        );

        if (!response.ok) return null;

        const data = await response.json();
        return data.poster_path ? `${TMDB_IMAGE_BASE}${data.poster_path}` : null;
    } catch (error) {
        console.error('Error fetching TMDB poster:', error);
        return null;
    }
}

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

        // Enrich with TMDB poster URLs if API key is configured
        if (TMDB_API_KEY) {
            const enriched = await Promise.all(
                data.map(async (item) => {
                    const media = item.type === 'movie' ? item.movie : item.show;
                    if (media.ids?.tmdb) {
                        const posterUrl = await getTMDBPoster(media.ids.tmdb, item.type);
                        return {
                            ...item,
                            posterUrl
                        };
                    }
                    return item;
                })
            );

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=300'
                },
                body: JSON.stringify(enriched)
            };
        }

        // Return without poster URLs if TMDB key not configured
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300'
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
