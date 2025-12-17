# nbnstack.com Repository Documentation

**Complete reference documentation for Nathan Nicholas's personal portfolio website**

---

## Table of Contents
1. [Overview](#overview)
2. [Repository Structure](#repository-structure)
3. [Technology Stack](#technology-stack)
4. [Key Features](#key-features)
5. [Automation System](#automation-system)
6. [API Integrations](#api-integrations)
7. [Data Structures](#data-structures)
8. [Projects Showcase](#projects-showcase)
9. [Frontend Architecture](#frontend-architecture)
10. [Deployment & Hosting](#deployment--hosting)
11. [Configuration Files](#configuration-files)
12. [Code Examples](#code-examples)

---

## Overview

**Website:** https://nbnstack.com
**Repository:** sourpatchdad.github.io
**Owner:** Nathan Nicholas (sourpatchdad)
**Hosting:** GitHub Pages
**Purpose:** Personal portfolio and tech project showcase

This is a static website built with vanilla HTML, CSS, and JavaScript that features:
- Professional portfolio showcasing tech projects
- Automated watch history from Trakt.tv (movies/TV shows)
- Music listening feed
- Referral links to recommended services
- Dark/light theme toggle
- Fully responsive design
- SEO optimized with structured data

---

## Repository Structure

```
/home/user/sourpatchdad.github.io/
├── Core Pages (HTML)
│   ├── index.html              # Homepage with hero section and featured content
│   ├── about.html              # About page with professional background
│   ├── contact.html            # Contact form (Formspree integration)
│   ├── projects.html           # Projects showcase grid
│   ├── referrals.html          # Referral programs and affiliate links
│   └── uses.html               # Tools, services, and tech stack
│
├── Styling & Scripts
│   ├── style.css               # 1,515 lines - Main stylesheet with CSS variables
│   └── script.js               # 450 lines - Frontend logic and API integrations
│
├── Project Detail Pages
│   └── projects/
│       ├── server-build.html       # TrueNAS server build documentation
│       ├── truenas-migration.html  # Migration from Synology to TrueNAS
│       ├── home-assistant.html     # Smart home automation setup
│       ├── plex.html               # Media server with automation pipeline
│       ├── bitaxe.html             # Bitcoin mining project
│       └── bitty-2.html            # Bitcoin notification Discord bot
│
├── Data Files (JSON)
│   └── data/
│       ├── projects.json       # Project metadata (6 projects)
│       ├── trakt.json          # Recently watched (auto-updated hourly)
│       ├── music.json          # Favorite albums with streaming links
│       └── referrals.json      # Referral programs with offers
│
├── Images (organized by category)
│   └── images/
│       ├── branding/           # NN-light.svg, NN-dark.svg (site logos)
│       ├── albums/             # Album artwork images
│       ├── referrals/          # Referral program logos
│       ├── custom-icons/       # Service icons (TrueNAS, Plex, HA, etc.)
│       ├── frames/             # Device mockup frames (MacBook, iPhone)
│       ├── screenshots/        # Project screenshots
│       └── ratings/            # IMDb, Rotten Tomatoes logos
│
├── GitHub Automation
│   ├── .github/
│   │   ├── workflows/
│   │   │   └── update-trakt.yml        # Hourly Trakt update workflow
│   │   ├── scripts/
│   │   │   └── fetch-trakt.js          # Node.js script for API fetching
│   │   └── OMDB_SETUP.md               # Setup docs for ratings API
│   │
│   └── .git/                   # Git repository
│
├── SEO & Configuration
│   ├── CNAME                   # Custom domain: nbnstack.com
│   ├── robots.txt              # Search engine robots config
│   └── sitemap.xml             # SEO sitemap (12 URLs)
```

---

## Technology Stack

### Frontend
- **HTML5** - Semantic markup with Schema.org structured data
- **CSS3** - Modern styling with custom properties
  - CSS Variables for theming (`--primary-color`, `--bg-color`, etc.)
  - Flexbox and Grid layouts
  - Responsive design (mobile-first approach)
  - 1,515 lines of custom CSS
- **Vanilla JavaScript** - 450 lines of modern ES6+
  - Fetch API for data loading
  - LocalStorage for theme persistence
  - IntersectionObserver for scroll animations
  - Event-driven architecture

### External Libraries & Services
- **Font Awesome 6.4.0** - Icon library (CDN)
- **Iconify 3.1.0** - Additional icon system (CDN)
- **Google Analytics 4** - Analytics tracking (ID: G-8Z268T69R9)
- **Formspree** - Contact form handling (https://formspree.io/f/mqagvrrg)

### Backend & Automation
- **GitHub Actions** - CI/CD for automated updates
- **Node.js 18** - Runtime for fetch scripts
- **GitHub Pages** - Static site hosting

### APIs Integrated
1. **Trakt.tv API v2** - Entertainment tracking
2. **The Movie Database (TMDB)** - Movie/TV metadata and posters
3. **OMDb API** - Multi-source ratings (IMDb, RT, Metacritic)

---

## Key Features

### 1. Dynamic Content Integration
- **Automated Trakt Updates:** Recently watched content updates every hour
- **Real-time Ratings:** IMDb, Rotten Tomatoes, Metacritic scores
- **Music Feed:** Favorite albums with Spotify/Apple Music links
- **Project Showcase:** 6 detailed tech projects with metadata

### 2. Interactive Features
- **Theme Toggle:** Dark/light mode with LocalStorage persistence
- **Smooth Scrolling:** Navigation with smooth scroll behavior
- **Fade-in Animations:** IntersectionObserver-based scroll animations
- **Lazy Loading:** Images load only when needed
- **Responsive Design:** Mobile-first, works on all screen sizes

### 3. SEO Optimization
- **Meta Tags:** Comprehensive Open Graph and Twitter Card tags
- **Structured Data:** Schema.org JSON-LD for rich snippets
- **XML Sitemap:** All pages indexed for search engines
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **Custom Domain:** CNAME pointing to nbnstack.com

### 4. Professional Portfolio
- **About Page:** Career background (Senior Data Analyst at Aspen Integrity)
- **Projects Page:** Tech projects with tags, dates, and external links
- **Contact Form:** Working contact form via Formspree
- **Uses Page:** Tools, services, and tech stack documentation
- **Referrals Page:** Curated list of recommended services

---

## Automation System

### GitHub Actions Workflow

**File:** `.github/workflows/update-trakt.yml`

**Schedule:** Every 1 hour (`0 */1 * * *`)

**Process:**
1. Checkout main branch
2. Setup Node.js 18 environment
3. Run fetch-trakt.js with API keys from secrets
4. Auto-commit changes to data/trakt.json
5. Push to main branch

**Required Secrets:**
- `TRAKT_CLIENT_ID` - Trakt.tv API client ID
- `TMDB_API_KEY` - The Movie Database API key
- `OMDB_API_KEY` - Open Movie Database API key

**Workflow Code:**
```yaml
name: Update Trakt Data

on:
  schedule:
    - cron: '0 */1 * * *'  # Every 1 hour
  workflow_dispatch:        # Manual triggering allowed

jobs:
  update-trakt:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          ref: main

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Fetch Trakt data
        env:
          TRAKT_CLIENT_ID: ${{ secrets.TRAKT_CLIENT_ID }}
          TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}
          OMDB_API_KEY: ${{ secrets.OMDB_API_KEY }}
        run: |
          node .github/scripts/fetch-trakt.js

      - name: Commit and push if changed
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add data/trakt.json
          git diff --staged --quiet || git commit -m "Update Trakt watch history [automated]"
          git push
```

### Fetch Script Architecture

**File:** `.github/scripts/fetch-trakt.js`

**Purpose:** Fetch and enrich Trakt watch history with metadata

**Functions:**

1. **`fetchTraktData()`**
   - Fetches last 12 watched items from Trakt API
   - Endpoint: `https://api.trakt.tv/users/sourpatchdad/history?limit=12`
   - Headers: `trakt-api-version: 2`, `trakt-api-key: [CLIENT_ID]`

2. **`getTMDBPoster(tmdbId, type)`**
   - Fetches poster image URLs from TMDB
   - Endpoint: `https://api.themoviedb.org/3/{movie|tv}/{id}`
   - Returns: Full poster URL (`https://image.tmdb.org/t/p/w500{path}`)

3. **`getOMDBRatings(imdbId)`**
   - Fetches ratings from OMDb API
   - Endpoint: `https://www.omdbapi.com/?i={imdbId}`
   - Returns object with:
     - `imdb`: IMDb rating (e.g., "8.5")
     - `imdbVotes`: Number of votes (e.g., "1,234,567")
     - `rottenTomatoes`: RT score (e.g., "95%")
     - `metacritic`: Metacritic score (e.g., "85/100")

**Data Enrichment Process:**
```javascript
const enriched = await Promise.all(
  data.map(async (item) => {
    const media = item.type === 'movie' ? item.movie : item.show;
    const enrichedItem = { ...item };

    // Add TMDB poster
    if (media.ids?.tmdb) {
      enrichedItem.posterUrl = await getTMDBPoster(media.ids.tmdb, item.type);
    }

    // Add OMDb ratings
    if (media.ids?.imdb) {
      enrichedItem.ratings = await getOMDBRatings(media.ids.imdb);
    }

    return enrichedItem;
  })
);
```

**Output:** Writes enriched data to `/data/trakt.json`

---

## API Integrations

### 1. Trakt.tv API

**Purpose:** Track and fetch recently watched movies/TV shows

**Configuration:**
- Username: `sourpatchdad`
- API Version: 2
- Endpoint: `https://api.trakt.tv/users/sourpatchdad/history?limit=12`

**Authentication:** Client ID in headers (`trakt-api-key`)

**Response Structure:**
```json
[
  {
    "watched_at": "2025-01-04T12:34:56.000Z",
    "action": "watch",
    "type": "movie",
    "movie": {
      "title": "Example Movie",
      "year": 2024,
      "ids": {
        "trakt": 123456,
        "slug": "example-movie-2024",
        "imdb": "tt1234567",
        "tmdb": 654321
      }
    }
  }
]
```

### 2. The Movie Database (TMDB) API

**Purpose:** Fetch poster images for movies and TV shows

**Endpoints:**
- Movies: `https://api.themoviedb.org/3/movie/{id}?api_key={key}`
- TV Shows: `https://api.themoviedb.org/3/tv/{id}?api_key={key}`

**Image Base URL:** `https://image.tmdb.org/t/p/w500{poster_path}`

**Usage:** Enriches Trakt data with high-quality poster images

### 3. OMDb API

**Purpose:** Fetch ratings from multiple sources

**Endpoint:** `https://www.omdbapi.com/?i={imdbId}&apikey={key}`

**Ratings Provided:**
- IMDb rating and vote count
- Rotten Tomatoes score (Fresh/Rotten)
- Metacritic score

**Response Example:**
```json
{
  "imdbRating": "8.5",
  "imdbVotes": "1,234,567",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "8.5/10" },
    { "Source": "Rotten Tomatoes", "Value": "95%" },
    { "Source": "Metacritic", "Value": "85/100" }
  ]
}
```

### 4. Formspree

**Purpose:** Handle contact form submissions

**Endpoint:** `https://formspree.io/f/mqagvrrg`

**Method:** POST with JSON body

**Fields:**
- `name`: Sender's name
- `email`: Sender's email
- `message`: Message content

---

## Data Structures

### projects.json

**Location:** `/data/projects.json`

**Structure:**
```json
[
  {
    "id": "server-build",
    "title": "TrueNAS Server Build",
    "shortDescription": "Custom-built homelab server...",
    "tags": ["TrueNAS", "Homelab", "Hardware"],
    "date": "2025",
    "position": 2,
    "detailPage": "projects/server-build.html",
    "headerImage": "images/custom-icons/true-nas.svg",
    "icon": "fa-solid fa-server",
    "iconType": "server",
    "externalLink": null
  }
]
```

**Fields:**
- `id`: Unique identifier
- `title`: Project name
- `shortDescription`: Brief description (displayed on cards)
- `tags`: Array of technology tags
- `date`: Year or date range
- `position`: Display order (1-6)
- `detailPage`: Link to full project page
- `headerImage`: Hero image path
- `icon`: Font Awesome icon class
- `iconType`: Category identifier
- `externalLink`: GitHub/external URL (null if none)

### trakt.json

**Location:** `/data/trakt.json`
**Updated:** Every hour via GitHub Actions

**Structure:**
```json
[
  {
    "watched_at": "2025-01-04T12:34:56.000Z",
    "action": "watch",
    "type": "movie",
    "movie": {
      "title": "Example Movie",
      "year": 2024,
      "ids": {
        "trakt": 123456,
        "slug": "example-movie-2024",
        "imdb": "tt1234567",
        "tmdb": 654321
      }
    },
    "posterUrl": "https://image.tmdb.org/t/p/w500/abc123.jpg",
    "ratings": {
      "imdb": "8.5",
      "imdbVotes": "1,234,567",
      "rottenTomatoes": "95%",
      "metacritic": "85/100"
    }
  }
]
```

**TV Show Structure:**
```json
{
  "type": "episode",
  "episode": {
    "season": 1,
    "number": 5,
    "title": "Episode Title"
  },
  "show": {
    "title": "Show Name",
    "year": 2024,
    "ids": { /* IDs */ }
  }
}
```

### music.json

**Location:** `/data/music.json`

**Structure:**
```json
[
  {
    "album": "Album Name",
    "artist": "Artist Name",
    "year": "2024",
    "artwork": "images/albums/Album Name.jpg",
    "appleMusic": "https://music.apple.com/...",
    "spotify": "https://open.spotify.com/..."
  }
]
```

**Display:** Shows 5 most recent albums sorted by year (descending)

### referrals.json

**Location:** `/data/referrals.json`

**Structure:**
```json
[
  {
    "name": "Honeygain",
    "logo": "images/referrals/honeygain.avif",
    "description": "Earn passive income by sharing unused internet bandwidth.",
    "offer": "Earn $3",
    "link": "https://join.honeygain.com/NATHA134A4"
  }
]
```

**Services Included:**
1. Honeygain - Passive income from internet bandwidth
2. Monarch Money - Personal finance tracking
3. Ownwell - Property tax reduction
4. River Financial - Bitcoin financial services
5. Tessie - Tesla app and controls
6. Trakt - Entertainment tracking (VIP trial)
7. US Mobile - Wireless service

---

## Projects Showcase

### 1. Plex Media Server
**Position:** 1
**Date:** 2024
**Tags:** Plex, Sonarr, Radarr, Prowlarr, Media Automation, TrueNAS

**Description:** Self-hosted 4K media streaming solution with full automation pipeline using Sonarr, Radarr, Prowlarr, and Transmission. Handles TV shows and movies with automatic downloading and organization.

**Key Features:**
- 4K transcoding capability
- Automated media management
- Integrated with TrueNAS storage

---

### 2. TrueNAS Server Build
**Position:** 2
**Date:** 2025
**Tags:** TrueNAS, Homelab, Hardware, Bitcoin, Infrastructure

**Description:** Custom-built homelab server with Intel i5-12500 processor, 32GB DDR5 RAM, and ZFS mirrored storage (2x8TB drives).

**Specifications:**
- **CPU:** Intel i5-12500 (6-core, 12-thread)
- **RAM:** 32GB DDR5
- **Storage:** 2x8TB in ZFS mirror
- **Network:** Dual NIC for redundancy

**Services Running:**
- Media automation (Plex, Sonarr, Radarr)
- Bitcoin full node
- Immich photo management
- Home Assistant integrations

---

### 3. TrueNAS Migration
**Position:** 3
**Date:** 2025
**Tags:** TrueNAS, Plex, Homelab, Infrastructure

**Description:** Migration from underpowered Synology DS124 to custom TrueNAS server. Enabled 4K Plex transcoding and expanded capabilities.

**Migration Process:**
- Data transfer from Synology to TrueNAS
- Service reconfiguration
- Performance optimization
- Testing and validation

---

### 4. Bitty 2.0
**Position:** 4
**Date:** 2025
**Tags:** Python, GitHub Actions, Automation, Cryptocurrency
**GitHub:** https://github.com/sourpatchdad/bitty

**Description:** Bitcoin price notification bot migrated from Home Assistant to standalone Python application running on GitHub Actions.

**Improvements:**
- Fixed timing issues from Home Assistant version
- Eliminated duplicate notifications
- Corrected baseline logic problems
- More reliable scheduling via GitHub Actions

**Features:**
- Discord integration for notifications
- Price threshold alerts
- Historical baseline tracking

---

### 5. BitAxe
**Position:** 5
**Date:** 2025
**Tags:** Bitcoin, Mining, Hardware, Home Assistant Integration

**Description:** Running a BitAxe solo Bitcoin miner integrated with Home Assistant for comprehensive monitoring.

**Monitoring Metrics:**
- Hashrate performance
- Temperature monitoring
- Power consumption tracking
- Uptime statistics

**Purpose:** Learning about Bitcoin mining while participating in the lottery for finding a block.

---

### 6. Home Assistant
**Position:** 6
**Date:** 2024-2025
**Tags:** Home Assistant, Smart Home, IoT, Automation, YAML

**Description:** Self-hosting journey from zero coding experience to custom dashboards. Consolidated multiple services into one unified system.

**Replaced Services:**
- Notion (for tracking and organization)
- Google Nest (for smart home control)
- Multiple single-purpose apps

**Features:**
- Financial tracking dashboards
- Plant care monitoring
- Tesla control integration
- Security camera integration
- Custom automations
- Unified interface

---

## Frontend Architecture

### Theme System

**Implementation:** CSS Variables + JavaScript

**CSS Variables (in `:root` and `[data-theme="dark"]`):**
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --card-bg: #f8f9fa;
  /* ... more variables ... */
}

[data-theme="dark"] {
  --primary-color: #ecf0f1;
  --secondary-color: #3498db;
  --bg-color: #1a1a1a;
  --text-color: #ecf0f1;
  --card-bg: #2c2c2c;
  /* ... more variables ... */
}
```

**JavaScript Theme Toggle:**
```javascript
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  let newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

### Scroll Animations

**Implementation:** IntersectionObserver API

```javascript
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

// Observe sections (except hero and recently-watched)
document.querySelectorAll('section').forEach(section => {
  if (!section.classList.contains('hero') &&
      !section.classList.contains('recently-watched')) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  }
});
```

### Data Loading

**Trakt Feed:**
```javascript
async function fetchRecentlyWatched() {
  const response = await fetch('/data/trakt.json');
  const data = await response.json();
  displayTraktItems(data);
}

function displayTraktItems(items) {
  const limitedItems = items.slice(0, 10);  // Show 10 items (2x5 grid)

  feedContainer.innerHTML = limitedItems.map(item => {
    const media = item.type === 'movie' ? item.movie : item.show;
    // Generate HTML for each item
  }).join('');
}
```

**Music Feed:**
```javascript
async function fetchMusicFeed() {
  const response = await fetch('/data/music.json');
  const data = await response.json();
  displayMusicItems(data);
}

function displayMusicItems(albums) {
  // Sort by year (descending), then by artist
  const sortedAlbums = [...albums].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.artist.localeCompare(b.artist);
  });

  const limitedAlbums = sortedAlbums.slice(0, 5);
  // Render album grid
}
```

### Date Formatting

**Relative Time Display:**
```javascript
function formatWatchedDate(watchedAt) {
  const date = new Date(watchedAt);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diffTime / (1000 * 60));
      return minutes <= 1 ? 'Just now' : `${minutes}m ago`;
    }
    return hours === 1 ? '1h ago' : `${hours}h ago`;
  }

  if (diffDays < 7) {
    return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
  }

  // Show date for older items
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
```

### Ratings Display

**Dynamic Rating Badges:**
```javascript
function generateRatingsHTML(ratings) {
  if (!ratings) return '';

  const ratingBadges = [];

  // IMDb rating (theme-aware logo)
  if (ratings.imdb) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const imdbLogo = currentTheme === 'dark' ? 'imdb-dark.svg' : 'imdb-light.svg';
    ratingBadges.push(`
      <span class="rating-badge imdb">
        <img src="images/ratings/${imdbLogo}" alt="IMDb">
        <span>${ratings.imdb}</span>
      </span>
    `);
  }

  // Rotten Tomatoes (Fresh/Rotten logo based on score)
  if (ratings.rottenTomatoes) {
    const rtValue = parseInt(ratings.rottenTomatoes);
    const rtLogo = rtValue >= 60 ? 'rt-fresh.svg' : 'rt-rotten.svg';
    ratingBadges.push(`
      <span class="rating-badge rotten-tomatoes">
        <img src="images/ratings/${rtLogo}" alt="RT">
        <span>${ratings.rottenTomatoes}</span>
      </span>
    `);
  }

  return `<div class="trakt-ratings">${ratingBadges.join('')}</div>`;
}
```

---

## Deployment & Hosting

### GitHub Pages Configuration

**Custom Domain:** nbnstack.com
**CNAME File:** Contains single line: `nbnstack.com`
**Branch:** Main branch serves the site
**Build:** No build process required (static files)

### DNS Configuration

**Provider:** (Managed externally)
**Required Records:**
- `A` records pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- `CNAME` record: `www` → `sourpatchdad.github.io`

### Deployment Process

1. Push changes to main branch
2. GitHub Actions workflow runs (if scheduled)
3. GitHub Pages automatically serves updated content
4. Changes appear on nbnstack.com within minutes

### Performance Optimizations

- **Lazy Loading:** All images load only when visible
- **CDN Usage:** External libraries served via CDN
- **Minimal Dependencies:** Only essential external resources
- **Optimized Images:** Proper sizing and formats (SVG, WebP, AVIF)
- **Caching:** Leverages browser caching for static assets

---

## Configuration Files

### CNAME
```
nbnstack.com
```

### robots.txt
```
User-agent: *
Allow: /
```

### sitemap.xml

**Structure:**
- 6 main pages (index, about, projects, contact, referrals, uses)
- 6 project detail pages
- Total: 12 URLs indexed

**Priority Levels:**
- Homepage: 1.0 (highest)
- Projects page: 0.9
- About page: 0.8
- Project details: 0.8
- Contact: 0.7
- Uses: 0.7
- Referrals: 0.6

**Update Frequency:**
- Homepage: Weekly
- Projects: Monthly
- About/Uses/Referrals: Monthly
- Contact: Yearly

---

## Code Examples

### Complete Trakt Item Rendering

```javascript
function displayTraktItems(items) {
  const feedContainer = document.getElementById('trakt-feed');
  const limitedItems = items.slice(0, 10);

  feedContainer.innerHTML = limitedItems.map(item => {
    const media = item.type === 'movie' ? item.movie : item.show;
    const title = media.title;
    const year = media.year;

    // Episode info for TV shows
    let episodeInfo = '';
    let type = 'Movie';

    if (item.type !== 'movie' && item.episode) {
      type = `S${item.episode.season}E${item.episode.number}`;
      if (item.episode.title) {
        episodeInfo = `<div class="trakt-episode-title">${item.episode.title}</div>`;
      }
    }

    const watchedDate = formatWatchedDate(item.watched_at);
    const posterUrl = item.posterUrl || 'https://via.placeholder.com/300x450';
    const ratingsHTML = generateRatingsHTML(item.ratings);
    const traktUrl = item.type === 'movie'
      ? `https://trakt.tv/movies/${media.ids.slug}`
      : `https://trakt.tv/shows/${media.ids.slug}`;

    return `
      <div class="trakt-item" onclick="window.open('${traktUrl}', '_blank')">
        <img src="${posterUrl}" alt="${title}" class="trakt-poster" loading="lazy">
        <div class="trakt-info">
          <div class="trakt-title">${title}</div>
          ${episodeInfo}
          ${ratingsHTML}
          <div class="trakt-meta">
            <span class="trakt-type">${type}</span>
            <span>${year}</span>
          </div>
          <div class="trakt-watched-date">${watchedDate}</div>
        </div>
      </div>
    `;
  }).join('');
}
```

### Contact Form Submission

```javascript
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/mqagvrrg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      formStatus.textContent = 'Thank you for your message!';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    formStatus.textContent = 'Sorry, there was an error sending your message.';
    formStatus.className = 'form-status error';
  } finally {
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;
  }
});
```

### Navigation Scroll Effect

```javascript
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
```

---

## Professional Background

**Name:** Nathan Nicholas
**Title:** Senior Data Analyst
**Company:** Aspen Integrity
**Location:** (Remote/US)

**Website Purpose:**
- Showcase technical projects and homelab infrastructure
- Share knowledge about self-hosting and automation
- Demonstrate skills in data analysis, automation, and infrastructure
- Provide contact point for professional opportunities

**Key Technical Skills Demonstrated:**
- **Infrastructure:** TrueNAS, Docker, Linux, networking
- **Automation:** GitHub Actions, Python, Home Assistant, YAML
- **Media Management:** Plex, Sonarr, Radarr, Prowlarr
- **Web Development:** HTML, CSS, JavaScript, API integration
- **Data Analysis:** (Professional role)
- **Bitcoin/Crypto:** Full node operation, mining, bot development

---

## Pages Overview

### 1. index.html (Homepage)
- Hero section with name and title
- Recently watched section (Trakt integration)
- Featured projects grid
- CTA buttons to other sections

### 2. about.html
- Professional background
- Career history
- Skills and expertise
- Personal interests

### 3. projects.html
- Grid of 6 tech projects
- Filterable by tags
- Links to detailed project pages
- External GitHub links where applicable

### 4. contact.html
- Contact form (name, email, message)
- Social links (LinkedIn, GitHub, etc.)
- Formspree integration for form handling

### 5. referrals.html
- Grid of referral programs
- Service descriptions
- Offer/bonus information
- Direct links with referral codes

### 6. uses.html
- Tools and services used
- Hardware specifications
- Software stack
- Recommendations and reviews

### Project Detail Pages
- **server-build.html:** TrueNAS server documentation
- **truenas-migration.html:** Migration process
- **home-assistant.html:** Smart home journey
- **plex.html:** Media server setup
- **bitaxe.html:** Bitcoin mining project
- **bitty-2.html:** Discord bot development

---

## Git Development

**Current Branch:** `claude/create-repo-documentation-dh8Iq`
**Main Branch:** `main` (default for PRs)
**Recent Commits:** Primarily automated Trakt updates

**Commit Pattern:**
- Automated: "Update Trakt watch history [automated]"
- Manual: Descriptive commit messages for feature changes

**Branch Strategy:**
- Main branch for production
- Feature branches for development
- Claude-specific branches for documentation/automation work

---

## Analytics & Tracking

**Google Analytics 4**
- Tracking ID: `G-8Z268T69R9`
- Tracks page views, user interactions
- Privacy-focused implementation

**Events Tracked:**
- Page views
- Theme toggle usage
- External link clicks
- Form submissions
- Project card clicks

---

## Security & Privacy

**API Keys:** Stored as GitHub Secrets, never committed
**Form Handling:** Delegated to Formspree (no backend required)
**HTTPS:** Enforced via GitHub Pages
**No User Data Collection:** No cookies, no tracking beyond GA4
**External Links:** Use `rel="noopener noreferrer"` for security

---

## Future Enhancement Ideas

**Potential Additions:**
1. Blog section for technical writeups
2. RSS feed for updates
3. Newsletter signup
4. More granular project filtering
5. Search functionality
6. Comments system for project pages
7. GitHub contributions graph integration
8. Extended Trakt history archive
9. Music streaming API integration (Spotify/Last.fm)
10. YouTube video embedding for project demos

**Technical Improvements:**
1. Service worker for offline functionality
2. Progressive Web App (PWA) capabilities
3. WebP/AVIF image format adoption
4. Preloading critical resources
5. Code splitting for better performance
6. TypeScript migration for type safety
7. CSS preprocessor (Sass/Less)
8. Component-based architecture
9. Testing suite (Jest, Playwright)
10. Lighthouse performance optimization

---

## Repository Metrics

**Total Files:** ~100+ (HTML, CSS, JS, JSON, images)
**CSS Lines:** 1,515
**JavaScript Lines:** 450
**Projects Documented:** 6
**API Integrations:** 3 (Trakt, TMDB, OMDb)
**Automation Frequency:** Every hour
**Pages:** 12 (6 main + 6 project details)
**Repository Size:** ~50MB (including images)

---

## Contact & Social

**Website:** https://nbnstack.com
**GitHub:** https://github.com/sourpatchdad
**LinkedIn:** (via contact page)
**Email:** (via contact form)

---

## License & Usage

**Repository:** Public (GitHub Pages)
**Code:** Available for reference and learning
**Content:** Personal portfolio, not for reproduction
**Images:** Custom icons and screenshots, copyright owner

---

## Conclusion

This repository represents a modern, well-architected personal portfolio website that successfully combines static site simplicity with dynamic content through clever automation. The GitHub Actions integration provides a "serverless" approach to keeping content fresh without manual updates.

**Key Strengths:**
- Clean, maintainable codebase
- Smart automation reducing manual work
- Professional presentation
- Mobile-responsive design
- SEO optimized
- Fast performance
- No backend complexity

**Technical Highlights:**
- Vanilla JavaScript (no framework bloat)
- CSS Variables for theming
- GitHub Actions for automation
- Multiple API integrations
- Modern web standards
- Accessibility considerations

This documentation provides complete context for working with, understanding, or extending this portfolio website.
