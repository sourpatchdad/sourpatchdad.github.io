const fs = require('fs');
const path = require('path');

// Configuration
const TRAKT_CONFIG = {
    clientId: process.env.TRAKT_CLIENT_ID,
    username: 'sourpatchdad'
};

const TMDB_API_KEY = process.env.TMDB_API_KEY;
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

async function fetchTraktData() {
    try {
        console.log('Fetching Trakt history for:', TRAKT_CONFIG.username);

        const response = await fetch(
            `https://api.trakt.tv/users/${TRAKT_CONFIG.username}/history?limit=8`,
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
            throw new Error(`Trakt API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully fetched', data.length, 'items');

        // Enrich with TMDB poster URLs if API key is configured
        if (TMDB_API_KEY) {
            console.log('Enriching with TMDB poster URLs...');
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
            console.log('Enrichment complete!');
            return enriched;
        }

        return data;
    } catch (error) {
        console.error('Error fetching Trakt data:', error);
        throw error;
    }
}

async function main() {
    try {
        const data = await fetchTraktData();

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log('Created data directory');
        }

        // Write data to file
        const outputPath = path.join(dataDir, 'trakt.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log('Successfully wrote data to', outputPath);
        console.log('Total items:', data.length);
    } catch (error) {
        console.error('Failed to update Trakt data:', error);
        process.exit(1);
    }
}

main();
