# OMDb API Setup for Trakt Ratings

This guide explains how to add OMDb API ratings (IMDb, Rotten Tomatoes, Metacritic) to your Trakt Recently Watched feed.

## Prerequisites

- GitHub repository with GitHub Actions enabled
- Trakt integration already working

## Step 1: Get Your OMDb API Key

1. Go to [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Select the **FREE** tier (1,000 requests/day)
3. Enter your email address
4. Check your email for the activation link
5. Click the activation link to get your API key
6. Copy your API key (looks like: `a1b2c3d4`)

## Step 2: Add API Key to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OMDB_API_KEY`
5. Value: Paste your API key from Step 1
6. Click **Add secret**

## Step 3: Verify It's Working

The GitHub Action runs automatically every hour. To test it immediately:

1. Go to **Actions** tab in your repository
2. Click **Update Trakt Data** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait for the workflow to complete (usually 30-60 seconds)
5. Check your website's "Recently Watched" section

## What You'll See

Each Trakt card will now display up to 3 rating sources:

- **⭐ IMDb**: Yellow badge with star (e.g., ⭐ 8.5)
- **🍅 Rotten Tomatoes**: Red badge with tomato (e.g., 🍅 95%)
- **Ⓜ️ Metacritic**: Color-coded badge (green/yellow/red based on score)

## Troubleshooting

### Ratings not showing up?

1. Check GitHub Actions logs:
   - Go to **Actions** tab
   - Click on the most recent **Update Trakt Data** run
   - Look for "Enriching data with TMDB posters and OMDb ratings..."

2. Verify your API key is set:
   - Settings → Secrets and variables → Actions
   - `OMDB_API_KEY` should be listed

3. Check if items have IMDb IDs:
   - Open `data/trakt.json` in your repository
   - Look for `"imdb": "tt1234567"` in movie/show objects
   - Some content may not have IMDb IDs and won't show ratings

### Rate limiting?

The free tier allows 1,000 requests/day. With the workflow running hourly and fetching 12 items each time, you'll use approximately 288 requests/day.

## API Costs

- **FREE tier**: 1,000 requests/day (more than enough)
- **Patron tier**: $1/month for 100,000 requests/day (unnecessary for this use case)

## Privacy & Security

- Your API key is stored securely in GitHub Secrets
- The key is never exposed in logs or public code
- OMDb API does not track user viewing history
- Only public movie/show data is fetched
