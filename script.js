// Script version 20250104001 - Trakt Integration with debugging
console.log('✅ Script loaded - Version 20250104001 ✅');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Add fade-in animation for sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Don't animate the hero section on load
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Make sure recently-watched section is visible for loading state
const recentlyWatchedSection = document.querySelector('.recently-watched');
if (recentlyWatchedSection) {
    recentlyWatchedSection.style.opacity = '1';
    recentlyWatchedSection.style.transform = 'translateY(0)';
}

// Image lazy loading fallback
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Trakt API Integration
const TRAKT_CONFIG = {
    clientId: '92e0c311e18ec187627337bad034f1bc74a5274706090696caaa385ddc21fa8d', // Replace with your Trakt API Client ID
    username: 'sourpatchdad'   // Replace with your Trakt username
};

// Function to fetch recently watched from Trakt
async function fetchRecentlyWatched() {
    console.log('fetchRecentlyWatched called');
    const feedContainer = document.getElementById('trakt-feed');

    if (!feedContainer) {
        console.error('Trakt feed container not found!');
        return;
    }

    // Check if configuration is set
    if (TRAKT_CONFIG.clientId === '92e0c311e18ec187627337bad034f1bc74a5274706090696caaa385ddc21fa8d' ||
        TRAKT_CONFIG.username === 'sourpatchdad') {
        feedContainer.innerHTML = `
            <div class="error-message">
                <p>To display your recently watched content, please configure your Trakt API credentials.</p>
                <p>Update the TRAKT_CONFIG in script.js with your Client ID and username.</p>
            </div>
        `;
        return;
    }

    console.log('Fetching from Trakt API...', TRAKT_CONFIG.username);

    // First, verify the user exists
    const userUrl = `https://api.trakt.tv/users/${TRAKT_CONFIG.username}`;
    console.log('Checking user profile:', userUrl);

    try {
        // Check if user exists
        const userCheck = await fetch(userUrl, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': TRAKT_CONFIG.clientId
            }
        });

        console.log('User check status:', userCheck.status);

        if (userCheck.status === 404) {
            throw new Error(`User "${TRAKT_CONFIG.username}" not found on Trakt. Please verify your username.`);
        }

        if (!userCheck.ok) {
            throw new Error(`User profile error: ${userCheck.status}`);
        }

        // Now fetch watch history
        const apiUrl = `https://api.trakt.tv/users/${TRAKT_CONFIG.username}/history?limit=12`;
        console.log('Fetching history from:', apiUrl);

        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': TRAKT_CONFIG.clientId
            }
        });

        console.log('History response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Data received:', data.length, 'items');
        displayTraktItems(data);
    } catch (error) {
        console.error('Error fetching Trakt data:', error);
        feedContainer.innerHTML = `
            <div class="error-message">
                <p>Unable to load recently watched content.</p>
                <p>Error: ${error.message}</p>
                <p>Check the console (F12) for more details.</p>
            </div>
        `;
    }
}

// Function to display Trakt items
function displayTraktItems(items) {
    console.log('displayTraktItems called with', items);
    const feedContainer = document.getElementById('trakt-feed');

    if (!items || items.length === 0) {
        feedContainer.innerHTML = '<div class="loading">No recently watched content found.</div>';
        return;
    }

    feedContainer.innerHTML = items.map(item => {
        const media = item.type === 'movie' ? item.movie : item.show;
        const title = media.title;
        const year = media.year;
        const type = item.type === 'movie' ? 'Movie' :
                     item.episode ? `S${item.episode.season}E${item.episode.number}` : 'TV Show';

        // Construct TMDB poster URL (if available)
        const posterUrl = media.ids?.tmdb
            ? `https://image.tmdb.org/t/p/w500${getPosterPath(media.ids.tmdb, item.type)}`
            : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster';

        // Create Trakt URL
        const traktUrl = item.type === 'movie'
            ? `https://trakt.tv/movies/${media.ids.slug}`
            : `https://trakt.tv/shows/${media.ids.slug}`;

        return `
            <div class="trakt-item" onclick="window.open('${traktUrl}', '_blank')">
                <img src="${posterUrl}" alt="${title}" class="trakt-poster"
                     onerror="this.src='https://via.placeholder.com/300x450/cccccc/666666?text=No+Poster'">
                <div class="trakt-info">
                    <div class="trakt-title">${title}</div>
                    <div class="trakt-meta">
                        <span class="trakt-type">${type}</span>
                        <span>${year}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Helper function to get poster path (placeholder - would need TMDB API for actual posters)
function getPosterPath(tmdbId, type) {
    // This is a placeholder - you would need to integrate TMDB API for actual poster paths
    // For now, return empty string which will trigger the onerror fallback
    return '';
}

// Load Trakt feed when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchRecentlyWatched);
} else {
    // DOM is already loaded, run immediately
    fetchRecentlyWatched();
}
