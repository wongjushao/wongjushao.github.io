# Wong Jun Keat - Portfolio Website

A modern, interactive portfolio website showcasing cybersecurity expertise and development skills. Features a unique business card interface that transitions into a comprehensive portfolio with dynamic content loading from GitHub and Medium. Recent achievements include AmBank Hackathon 2025 (1st Place) and CodeNection Hackathon 2025 (Second Runner-Up, Hardware Track).

## 🚀 Live Demo

Visit the live portfolio at: [wongjushao.github.io](https://wongjushao.github.io)

## ✨ Features

### Interactive Business Card
- **Matrix-style background animation** with falling code effect
- **Terminal-themed design** with authentic command-line aesthetics
- **Glitch text effects** and scanning animations
- **Typing animation** cycling through professional roles
- **Slide-up transition** to reveal the full portfolio

### Dynamic Portfolio Sections
- **Home**: Hero section with professional introduction and statistics
- **Projects**: Real-time GitHub repository integration with fallback data
- **Articles**: Medium blog posts fetched via RSS feed
- **Info**: Detailed about section with skills and background
- **Contact**: Professional contact information and form

### Technical Highlights
- **Responsive Design**: Mobile-first approach with sidebar navigation
- **API Integration**: GitHub API for projects, Medium RSS for articles
- **Caching System**: Local storage caching with configurable TTL
- **Error Handling**: Graceful fallbacks and retry mechanisms
- **Performance**: Optimized loading states and smooth animations

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern features including CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features, async/await, and DOM manipulation

### External APIs
- **GitHub API**: Repository data and statistics
- **Medium RSS**: Blog post integration via CORS proxy
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: JetBrains Mono and Inter font families

### Design Elements
- **Matrix Theme**: Cyberpunk aesthetic with green terminal colors
- **Terminal UI**: Command-line inspired interface elements
- **Glitch Effects**: CSS-based text distortion animations
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 📁 Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete stylesheet with animations
├── script.js           # JavaScript functionality and API integration
├── img/
│   └── profile.jpg     # Profile image
├── favicon.ico         # Website favicon
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for external resources (fonts, icons, APIs)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wongjushao/wongjushao.github.io.git
   cd wongjushao.github.io
   ```

2. **Serve the files**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx serve .
   ```
   
   Or simply open `index.html` in your browser.

3. **Access the portfolio**
   ```
   http://localhost:8000
   ```

## ⚙️ Configuration

### GitHub Integration
Update the GitHub username in `script.js`:
```javascript
const GITHUB_USERNAME = 'your-github-username';
```

### Medium Integration
Update the Medium username in `script.js`:
```javascript
const MEDIUM_USERNAME = 'your-medium-username';
```

### Personal Information
Update contact details and social links in `index.html`:
- Email address
- LinkedIn profile
- GitHub profile
- Location
- Professional title and description

## 🎨 Customization

### Color Scheme
Modify CSS custom properties in `styles.css`:
```css
:root {
    --primary-bg: #0a0a0a;
    --secondary-bg: #1a1a1a;
    --accent-color: #00ff41;
    /* ... other variables */
}
```

### Animations
- **Typing Speed**: Adjust `typeSpeed` in the role typing function
- **Matrix Effect**: Modify matrix animation parameters
- **Transition Duration**: Update CSS transition values

### Content
- **Skills**: Update skill tags and categories in HTML
- **Projects**: Modify fallback project data in `script.js`
- **About Section**: Edit personal information and background

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Desktop**: Full sidebar navigation and grid layouts
- **Tablet**: Collapsible sidebar with touch-friendly interactions
- **Mobile**: Hamburger menu and stacked content layout

## 🔧 API Integration Details

### GitHub API
- **Endpoint**: `https://api.github.com/users/{username}/repos`
- **Caching**: 5-minute local storage cache
- **Fallback**: Static project data when API is unavailable
- **Rate Limiting**: Handles GitHub API rate limits gracefully

### Medium RSS
- **Endpoint**: Medium RSS feed via CORS proxy
- **Caching**: 10-minute local storage cache
- **Parsing**: XML to JSON conversion for article data
- **Error Handling**: Fallback message when articles can't be loaded

## 🔍 SEO Enhancements

This site includes on-page SEO optimizations:

- Descriptive <title> and meta description
- Canonical URL and robots directives
- Open Graph and Twitter Card metadata for rich sharing
- JSON-LD structured data (Person + WebSite)
- `sitemap.xml` and `robots.txt` for better crawlability
- Accessible image alt text and explicit image dimensions
- Deferred JavaScript for faster First Contentful Paint

### Files
- `index.html`: head metadata + JSON-LD structured data
- `sitemap.xml`: list of important URLs (home and certificates)
- `robots.txt`: allows crawling and points to sitemap

### Updating the sitemap
When you add new HTML pages or important assets you want indexed, add entries to `sitemap.xml`:

```
<url>
  <loc>https://wongjushao.github.io/new-page</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

After pushing to `main`, submit/refresh the sitemap in Google Search Console.

### Recommended follow-ups
- Add `lastmod` dates to sitemap entries when updating content
- Create standalone pages for Articles and Projects if you want separate indexable URLs
- Consider compressing/optimizing `img/profile.jpg` if >150KB for performance
- Add Medium and GitHub profile links to the `sameAs` array if more networks are used

## 🚀 Deployment

### GitHub Pages
1. Push code to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source as `main` branch
4. Access via `https://username.github.io`

### Other Platforms
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration deployment
- **Firebase Hosting**: CLI-based deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Wong Jun Keat**
- GitHub: [@wongjushao](https://github.com/wongjushao)
- LinkedIn: [junkeatwong](https://linkedin.com/in/junkeatwong)
- Medium: [@wongjushao](https://medium.com/@wongjushao)
- Email: wongjushao@gmail.com

## 🙏 Acknowledgments

- **42 School KL** for the intensive programming education
- **Font Awesome** for the comprehensive icon library
- **Google Fonts** for the beautiful typography
- **GitHub API** for project data integration
- **Medium** for the blogging platform and RSS feeds

---

*Built with ❤️ and lots of ☕ by Wong Jun Keat*
