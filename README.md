# Personal Portfolio Website

A minimalist, mobile-friendly personal portfolio website.

## Features

- Clean, minimalist design
- Fully responsive (mobile, tablet, desktop)
- About Me section
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