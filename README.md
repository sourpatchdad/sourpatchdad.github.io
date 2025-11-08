# Nathan Nicholas Portfolio

Professional portfolio website for Nathan Nicholas, Senior Data Analyst specializing in Power BI, Excel automation, and home automation projects.

**Live Site:** https://nbnstack.com
**Repository:** https://github.com/sourpatchdad/sourpatchdad.github.io

---

## 🎯 Features

### Core Features
- **Fully SEO Optimized** - Comprehensive meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Google Analytics 4** - Full visitor tracking and analytics
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Dark Mode** - Theme toggle with localStorage persistence
- **Automated Trakt Integration** - Recently watched movies/TV shows updated hourly via GitHub Actions

### Sections
- **About** - Professional biography and background
- **Projects** - Portfolio showcase with 4 detailed project pages (Home Assistant, BitAxe, Bitty 2.0, TrueNAS)
- **Recently Watched** - Live integration with Trakt API showing 10 most recent items
- **Current Rotation** - Music albums from Spotify/Apple Music
- **Referrals** - 7 service referrals with exclusive offers
- **Contact** - Form powered by Formspree + social links (LinkedIn, Substack)

---

## 📁 File Structure

```
├── index.html                 # Main landing page
├── about.html                 # Extended biography
├── projects.html              # Projects grid (dynamically loaded)
├── contact.html               # Contact form
├── referrals.html             # Referral links
├── style.css                  # Main stylesheet (1,395 lines)
├── script.js                  # Main JavaScript (403 lines)
├── sitemap.xml                # SEO sitemap for search engines
├── robots.txt                 # Crawler directives
├── CNAME                      # Custom domain configuration
│
├── projects/                  # Project detail pages
│   ├── home-assistant.html    # Home automation setup
│   ├── bitaxe.html           # Bitcoin mining project
│   ├── bitty-2.html          # Python Discord bot
│   └── truenas-migration.html # Server migration project
│
├── data/                      # JSON data files
│   ├── projects.json         # 4 projects metadata
│   ├── referrals.json        # 7 referral services
│   ├── music.json            # 4 current albums (manual)
│   └── trakt.json            # Recently watched (auto-updated)
│
├── images/
│   ├── NN-light.svg          # Logo (light mode)
│   ├── NN-dark.svg           # Logo (dark mode)
│   ├── albums/               # 4 album artwork files
│   ├── custom-icons/         # 4 SVG project icons
│   ├── frames/               # Device frame PNGs
│   ├── referrals/            # 7 referral logos
│   └── screenshots/          # 17 Home Assistant screenshots
│
└── .github/
    ├── workflows/
    │   └── update-trakt.yml  # Hourly Trakt sync workflow
    └── scripts/
        └── fetch-trakt.js    # Trakt + TMDB API fetcher
```

---

## 🚀 Technology Stack

**Frontend:**
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build tools
- Font Awesome 6.4.0 (icons)
- CSS Custom Properties (theming)
- Flexbox & CSS Grid (layout)

**APIs & Services:**
- Google Analytics 4 (tracking)
- Trakt API (recently watched)
- TMDB API (movie/TV posters)
- Formspree (contact form)

**Hosting & Automation:**
- GitHub Pages (free hosting)
- GitHub Actions (hourly Trakt updates)
- Custom domain via Cloudflare

---

## 🔧 Setup & Deployment

### Prerequisites
- GitHub account
- Custom domain (optional)
- Google Analytics 4 property
- Trakt account (for media tracking)
- TMDB API key (for posters)
- Formspree account (for contact form)

### Local Development
```bash
# Clone repository
git clone https://github.com/sourpatchdad/sourpatchdad.github.io.git
cd sourpatchdad.github.io

# Open in browser
open index.html
```

### GitHub Pages Deployment
1. Push to `main` branch
2. GitHub Pages automatically deploys
3. Site live at: https://sourpatchdad.github.io

### Custom Domain Setup
1. Add `CNAME` file with your domain
2. Configure DNS:
   - Type: CNAME
   - Name: @ (or www)
   - Value: sourpatchdad.github.io
3. Enable HTTPS in GitHub Pages settings

---

## 📊 Analytics & SEO Setup

### Google Analytics 4
**Current ID:** `G-8Z268T69R9`

**Tracks:**
- Page views
- User sessions
- Traffic sources
- Geographic data
- Device types
- Real-time visitors

**Dashboard:** https://analytics.google.com

### Search Console Integration
- **Google:** https://search.google.com/search-console
- **Bing:** https://www.bing.com/webmasters
- Sitemap submitted: https://nbnstack.com/sitemap.xml

### SEO Features
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags (Facebook, LinkedIn, Discord)
- ✅ Twitter Card metadata
- ✅ JSON-LD structured data (Person schema)
- ✅ Canonical URLs
- ✅ Optimized page titles
- ✅ sitemap.xml (9 pages)
- ✅ robots.txt

---

## 🤖 Automated Trakt Integration

### How It Works
1. **GitHub Actions** runs every hour
2. Fetches last 12 watched items from Trakt API
3. Enriches with TMDB poster images
4. Updates `data/trakt.json`
5. Commits and pushes changes
6. Site automatically refreshes with new data

### Required Secrets
Set in GitHub Repository Settings → Secrets:

- `TRAKT_CLIENT_ID` - Your Trakt API client ID
- `TMDB_API_KEY` - Your TMDB API key (v3 auth)

### Manual Trigger
Go to Actions → "Update Trakt Data" → "Run workflow"

---

## 🎨 Customization Guide

### Update Personal Information

**In `index.html`:**
- Hero title and subtitle
- About section text
- Social media links

**In `about.html`:**
- Extended biography
- Professional experience
- Skills and interests

**In `data/projects.json`:**
```json
{
  "id": "project-name",
  "title": "Project Title",
  "shortDescription": "Brief description",
  "tags": ["tag1", "tag2"],
  "date": "2025",
  "detailPage": "projects/project-name.html",
  "headerImage": "images/custom-icons/icon.svg",
  "externalLink": "https://github.com/..."
}
```

### Update Music Rotation

Edit `data/music.json`:
```json
{
  "album": "Album Name",
  "artist": "Artist Name",
  "year": "2025",
  "appleMusic": "https://music.apple.com/...",
  "spotify": "https://open.spotify.com/..."
}
```

Add album artwork to `images/albums/[Album Name].jpg`

### Add Referral Links

Edit `data/referrals.json`:
```json
{
  "name": "Service Name",
  "logo": "images/referrals/service.png",
  "description": "What the service does",
  "offer": "Special offer text",
  "link": "https://referral-link.com"
}
```

Add logo to `images/referrals/`

### Theme Customization

Edit `style.css` `:root` variables:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --accent-color: #3498db;
  --text-color: #333;
}
```

Dark mode variables in `[data-theme="dark"]`

---

## 📝 Content Management

### Adding a New Project

1. **Create detail page:** `projects/project-name.html`
2. **Add to projects.json:** Include metadata
3. **Add assets:** Images, icons to appropriate folders
4. **Update sitemap.xml:** Add new URL

### Updating Sitemap

After adding new pages, update `sitemap.xml`:
```xml
<url>
  <loc>https://nbnstack.com/new-page.html</loc>
  <lastmod>2025-01-08</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 🔍 Performance & Best Practices

### Current Stats
- **Total Size:** ~15 MB (mostly images)
- **CSS:** 25 KB (1,395 lines)
- **JavaScript:** 14 KB (403 lines)
- **Load Time:** < 2 seconds on 3G

### Optimization Opportunities
- ✅ Lazy loading images (implemented)
- ✅ Minified CSS/JS (via CDN for Font Awesome)
- ⚠️ Image optimization (screenshots could be compressed)
- ✅ Caching via GitHub Pages CDN

### Accessibility
- ✅ Semantic HTML5
- ✅ ARIA labels
- ✅ Alt text on images
- ✅ Keyboard navigation
- ✅ Screen reader compatible

---

## 🐛 Troubleshooting

### Trakt Data Not Updating
1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Ensure Trakt profile is public
4. Check TMDB API key is valid

### Contact Form Not Working
1. Verify Formspree endpoint: `mqagvrrg`
2. Check browser console for errors
3. Ensure JavaScript is enabled

### Analytics Not Tracking
1. Verify GA4 ID: `G-8Z268T69R9`
2. Check browser ad blockers
3. View in Incognito mode
4. Check Real-Time reports

### Images Not Loading
1. Check file paths are correct
2. Verify image files exist in `images/` folder
3. Check console for 404 errors

---

## 📈 Traffic Growth Strategy

### High-Impact Actions
1. **LinkedIn Posts** - Share projects weekly
2. **Reddit** - Post to r/homeassistant, r/PowerBI, r/selfhosted
3. **GitHub Profile** - Pin repos, add website link
4. **Content Marketing** - Write detailed project guides

### SEO Monitoring
- Weekly: Check Google Search Console
- Monthly: Review GA4 dashboard
- Quarterly: Update meta descriptions

---

## 📄 License

© 2025 Nathan Nicholas. All rights reserved.

This code is provided as a portfolio demonstration. You're welcome to reference and learn from it, but please don't clone it directly for your own portfolio. Create something unique!

---

## 🤝 Contact

- **Website:** https://nbnstack.com
- **LinkedIn:** https://linkedin.com/in/nathan-nicholas
- **Substack:** https://excellinginmediocrity.substack.com
- **GitHub:** https://github.com/sourpatchdad

---

## 🔄 Recent Updates

**v3.0 - January 2025**
- Complete SEO optimization (meta tags, Open Graph, structured data)
- Google Analytics 4 integration
- Album section alignment fix
- Professional about page content
- Comprehensive sitemap and robots.txt
- Repository cleanup and organization

**v2.0 - December 2024**
- Automated Trakt integration via GitHub Actions
- Music rotation section
- Referrals page
- Dark mode toggle
- Mobile responsiveness improvements

**v1.0 - November 2024**
- Initial portfolio launch
- Projects showcase
- Contact form
- Basic responsive design
