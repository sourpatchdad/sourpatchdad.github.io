# Personal Portfolio Website

A minimalist, mobile-friendly personal portfolio website.

## Features

- Clean, minimalist design
- Fully responsive (mobile, tablet, desktop)
- About Me section
- **Recently Watched section with Trakt integration** 🎬
- Photo gallery
- Contact links
- Smooth scrolling animations

## How to Customize

### 1. Update Your Personal Information

Open `index.html` and replace:
- `Your Name` with your actual name
- `your.email@example.com` with your email
- Update the About Me text with your own story
- Update social media links (Twitter, Instagram, LinkedIn)

### 2. Add Your Photos

- Place your photos in the `images/` folder
- Name them `photo1.jpg`, `photo2.jpg`, etc. (or update the filenames in index.html)
- The site displays 6 photos by default, but you can add or remove photo items in the HTML

### 3. Customize Colors

Open `style.css` and modify the colors in the `:root` section at the top:
```css
--primary-color: #2c3e50;
--accent-color: #3498db;
```

### 4. Deploy to GitHub Pages

1. Push your changes to GitHub
2. Go to your repository settings
3. Navigate to Pages section
4. Select your branch (usually `main` or `master`)
5. Your site will be live at `https://sourpatchdad.github.io`

### 5. Use a Custom Domain (Optional)

1. In GitHub Pages settings, add your custom domain
2. Update your domain's DNS settings to point to GitHub Pages
3. Follow GitHub's guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── script.js           # JavaScript for interactions
├── images/             # Your photos go here
└── README.md           # This file
```

## Local Development

Simply open `index.html` in your web browser to preview the site locally.

## Trakt "Recently Watched" Setup

### Prerequisites

The Trakt integration requires deployment to **Netlify** (free) because it uses serverless functions to avoid CORS issues.

### Step 1: Deploy to Netlify

1. Go to [Netlify](https://netlify.com) and sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select this repository
4. Netlify will auto-detect the configuration
5. Click **"Deploy site"**

### Step 2: Get a TMDB API Key (for poster images)

1. Create a free account at [TMDB](https://www.themoviedb.org/signup)
2. Go to [API Settings](https://www.themoviedb.org/settings/api)
3. Click **"Create"** under "Request an API Key"
4. Choose **"Developer"** option
5. Fill out the form (use your website URL)
6. Copy your **API Key (v3 auth)**

### Step 3: Add TMDB API Key to Netlify

1. In Netlify dashboard → **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Key: `TMDB_API_KEY`
4. Value: Your TMDB API key
5. Click **"Save"**
6. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### Step 4: Verify Trakt Profile is Public

1. Go to [Trakt Profile Settings](https://trakt.tv/settings/profile)
2. Make sure **Privacy** is set to **Public**

### Done! 🎉

Your site will now display your recently watched movies and TV shows with poster images.

### Troubleshooting

**Posters showing as placeholders?**
- Verify TMDB_API_KEY is added in Netlify environment variables
- Redeploy the site after adding the variable

**Trakt data not loading?**
- Check your Trakt profile is set to Public
- Verify your Trakt username in `netlify/functions/trakt.js`
- Check Netlify Function logs for errors