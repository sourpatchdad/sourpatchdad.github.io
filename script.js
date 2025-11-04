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

// Observe all sections except hero and recently-watched (they need to be visible immediately)
document.querySelectorAll('section').forEach(section => {
    // Skip animation for hero and recently-watched sections
    if (section.classList.contains('hero') || section.classList.contains('recently-watched')) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        return;
    }

    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Image lazy loading fallback
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Trakt API Integration (via Netlify Functions to avoid CORS)
// No need to expose credentials in frontend anymore - they're in the serverless function

// Function to fetch recently watched from Trakt
async function fetchRecentlyWatched() {
    console.log('✅ fetchRecentlyWatched called - Version 20250104001');
    const feedContainer = document.getElementById('trakt-feed');

    if (!feedContainer) {
        console.error('Trakt feed container not found!');
        return;
    }

    console.log('Fetching from Netlify Function...');

    try {
        // Call our Netlify serverless function instead of Trakt API directly
        const response = await fetch('/.netlify/functions/trakt');

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
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
                <p>Note: This feature requires deployment to Netlify for serverless functions.</p>
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

        // For TV shows, include episode info and title
        let episodeInfo = '';
        let type = 'Movie';

        if (item.type !== 'movie' && item.episode) {
            type = `S${item.episode.season}E${item.episode.number}`;
            if (item.episode.title) {
                episodeInfo = `<div class="trakt-episode-title">${item.episode.title}</div>`;
            }
        } else if (item.type !== 'movie') {
            type = 'TV Show';
        }

        // Use posterUrl from backend if available, otherwise use placeholder
        const posterUrl = item.posterUrl || 'https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=' + encodeURIComponent(title);

        // Create Trakt URL
        const traktUrl = item.type === 'movie'
            ? `https://trakt.tv/movies/${media.ids.slug}`
            : `https://trakt.tv/shows/${media.ids.slug}`;

        return `
            <div class="trakt-item" onclick="window.open('${traktUrl}', '_blank')">
                <img src="${posterUrl}" alt="${title}" class="trakt-poster" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=${encodeURIComponent(title)}'">
                <div class="trakt-info">
                    <div class="trakt-title">${title}</div>
                    ${episodeInfo}
                    <div class="trakt-meta">
                        <span class="trakt-type">${type}</span>
                        <span>${year}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Trakt feed when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchRecentlyWatched);
} else {
    // DOM is already loaded, run immediately
    fetchRecentlyWatched();
}
