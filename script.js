// DOM Elements
const businessCardLayer = document.getElementById('business-card-layer');
const portfolioLayer = document.getElementById('portfolio-layer');
const slideIndicator = document.querySelector('.slide-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navToggle = document.querySelector('.nav-toggle');
const sidebarNav = document.querySelector('.sidebar-nav');
const roleText = document.getElementById('role-text');

// Role typing animation
const roles = [
    'Full Stack Developer',
    'System Programmer',
    '42 School Student'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = 50;
    } else {
        roleText.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next role
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Start typing animation
typeRole();

// Business card slide functionality
let startY = 0;
let currentY = 0;
let isSliding = false;

function handleSlideStart(e) {
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    isSliding = true;
}

function handleSlideMove(e) {
    if (!isSliding) return;
    
    e.preventDefault();
    currentY = (e.type === 'touchmove' ? e.touches[0].clientY : e.clientY) - startY;
    
    if (currentY < 0) { // Sliding up
        const progress = Math.min(Math.abs(currentY) / 200, 1);
        businessCardLayer.style.transform = `translateY(${currentY}px)`;
        businessCardLayer.style.opacity = 1 - progress * 0.3;
    }
}

function handleSlideEnd() {
    if (!isSliding) return;
    isSliding = false;
    
    if (currentY < -100) { // Threshold for slide up
        slideToPortfolio();
    } else {
        // Snap back
        businessCardLayer.style.transform = 'translateY(0)';
        businessCardLayer.style.opacity = '1';
    }
}

function slideToPortfolio() {
    businessCardLayer.classList.add('slide-up');
    setTimeout(() => {
        businessCardLayer.style.display = 'none';
    }, 800);
}

// Event listeners for slide functionality
businessCardLayer.addEventListener('mousedown', handleSlideStart);
businessCardLayer.addEventListener('mousemove', handleSlideMove);
businessCardLayer.addEventListener('mouseup', handleSlideEnd);
businessCardLayer.addEventListener('mouseleave', handleSlideEnd);

businessCardLayer.addEventListener('touchstart', handleSlideStart, { passive: false });
businessCardLayer.addEventListener('touchmove', handleSlideMove, { passive: false });
businessCardLayer.addEventListener('touchend', handleSlideEnd);

// Click on slide indicator
slideIndicator.addEventListener('click', slideToPortfolio);

// Navigation functionality
function showSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const targetSection = document.getElementById(targetId);
    const targetLink = document.querySelector(`[href="#${targetId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    if (targetLink) {
        targetLink.classList.add('active');
    }
}

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
        
        // Close mobile menu if open
        sidebarNav.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    sidebarNav.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebarNav.contains(e.target) && !navToggle.contains(e.target)) {
            sidebarNav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Smooth scrolling for sections
function smoothScrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && businessCardLayer.style.display !== 'none') {
        slideToPortfolio();
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Add glitch effect to profile image occasionally
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            profileImg.style.filter = 'brightness(0.9) contrast(1.1) hue-rotate(90deg)';
            setTimeout(() => {
                profileImg.style.filter = 'brightness(0.9) contrast(1.1)';
            }, 200);
        }
    }, 3000);
}

// Matrix rain effect (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain effect only on business card layer
if (window.innerWidth > 768) { // Only on desktop
    createMatrixRain();
}

// GitHub API Integration
const GITHUB_USERNAME = 'wongjushao';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Medium RSS Integration
const MEDIUM_USERNAME = 'wongjushao';
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const MEDIUM_API_URL = `${CORS_PROXY}${encodeURIComponent(MEDIUM_RSS_URL)}`;
const ARTICLES_CACHE_KEY = 'medium_articles_cache';
const ARTICLES_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Language color mapping
const languageColors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572a5',
    'C': '#555555',
    'C++': '#f34b7d',
    'Java': '#b07219',
    'TypeScript': '#2b7489',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'Shell': '#89e051',
    'Makefile': '#427819',
    'Dockerfile': '#384d54',
    'Go': '#00add8',
    'Rust': '#dea584',
    'PHP': '#4f5d95'
};

// Priority repositories (manually curated for better showcase)
const priorityRepos = [
    'libft',
    'ft_printf',
    'get_next_line',
    'push_swap',
    'minishell',
    'philosophers',
    'cub3d',
    'webserv',
    'ft_containers',
    'inception'
];

// Fallback data in case GitHub API is unavailable
const fallbackRepos = [
    {
        name: 'libft',
        description: 'Custom implementation of standard C library functions',
        html_url: `https://github.com/${GITHUB_USERNAME}/libft`,
        language: 'C',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        size: 1024,
        fork: false,
        homepage: null
    },
    {
        name: 'ft_printf',
        description: 'Recreation of the printf function with format specifiers',
        html_url: `https://github.com/${GITHUB_USERNAME}/ft_printf`,
        language: 'C',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2023-02-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        size: 512,
        fork: false,
        homepage: null
    },
    {
        name: 'get_next_line',
        description: 'Function that reads a file line by line',
        html_url: `https://github.com/${GITHUB_USERNAME}/get_next_line`,
        language: 'C',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2023-03-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        size: 256,
        fork: false,
        homepage: null
    }
];

async function fetchGitHubRepos(forceRefresh = false) {
    const loadingElement = document.getElementById('projects-loading');
    const errorElement = document.getElementById('projects-error');
    const gridElement = document.getElementById('projects-grid');

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cachedData = getCachedRepos();
        if (cachedData) {
            console.log('Using cached repository data');
            displayProjects(cachedData);
            loadingElement.style.display = 'none';
            gridElement.style.display = 'grid';
            return;
        }
    }

    try {
        // Show loading state
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        gridElement.style.display = 'none';

        // Fetch repositories with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(GITHUB_API_URL, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Website'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            // Handle rate limiting
            if (response.status === 403) {
                const resetTime = response.headers.get('X-RateLimit-Reset');
                if (resetTime) {
                    const resetDate = new Date(parseInt(resetTime) * 1000);
                    throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`);
                }
            }
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();

        // Validate response
        if (!Array.isArray(repos)) {
            throw new Error('Invalid response format from GitHub API');
        }

        if (repos.length === 0) {
            throw new Error('No repositories found');
        }

        // Filter and sort repositories
        const filteredRepos = filterAndSortRepos(repos);

        // Cache the filtered results
        cacheRepos(filteredRepos);

        // Display repositories
        displayProjects(filteredRepos);

        // Hide loading, show grid
        loadingElement.style.display = 'none';
        gridElement.style.display = 'grid';

        console.log(`Successfully loaded ${filteredRepos.length} repositories`);

    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);

        // Update error message with specific details
        const errorMessageElement = errorElement.querySelector('p');
        if (error.name === 'AbortError') {
            errorMessageElement.textContent = 'Request timed out. Please check your internet connection and try again.';
        } else if (error.message.includes('rate limit')) {
            errorMessageElement.textContent = error.message;
        } else if (error.message.includes('Failed to fetch')) {
            errorMessageElement.textContent = 'Unable to connect to GitHub. Please check your internet connection.';
        } else {
            errorMessageElement.textContent = `Error: ${error.message}`;
        }

        // Try fallback data as last resort
        try {
            console.log('Attempting to use fallback data...');
            const filteredRepos = filterAndSortRepos(fallbackRepos);
            displayProjects(filteredRepos);

            // Show warning about using fallback data
            const warningElement = document.createElement('div');
            warningElement.className = 'fallback-warning';
            warningElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Showing sample projects. Unable to load live data from GitHub.</span>
            `;
            gridElement.parentNode.insertBefore(warningElement, gridElement);

            loadingElement.style.display = 'none';
            gridElement.style.display = 'grid';
            errorElement.style.display = 'none';

        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            // Show error state
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            gridElement.style.display = 'none';
        }
    }
}

// Medium Articles Integration
async function fetchMediumArticles(forceRefresh = false) {
    const loadingElement = document.getElementById('articles-loading');
    const errorElement = document.getElementById('articles-error');
    const gridElement = document.getElementById('articles-grid');

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cachedData = getCachedArticles();
        if (cachedData) {
            console.log('Using cached articles data');
            displayArticles(cachedData);
            loadingElement.style.display = 'none';
            gridElement.style.display = 'grid';
            return;
        }
    }

    try {
        // Show loading state
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        gridElement.style.display = 'none';

        // Fetch RSS feed with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch(MEDIUM_API_URL, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Portfolio-Website'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Medium RSS error: ${response.status} ${response.statusText}`);
        }

        const jsonResponse = await response.json();

        // Extract XML content from the CORS proxy response
        if (!jsonResponse.contents) {
            throw new Error('No content received from CORS proxy');
        }

        const xmlText = jsonResponse.contents;

        // Parse RSS XML
        const articles = parseRSSFeed(xmlText);

        if (articles.length === 0) {
            throw new Error('No articles found in RSS feed');
        }

        // Cache the articles
        cacheArticles(articles);

        // Display articles
        displayArticles(articles);

        // Hide loading, show grid
        loadingElement.style.display = 'none';
        gridElement.style.display = 'grid';

        console.log(`Successfully loaded ${articles.length} articles from Medium`);

    } catch (error) {
        console.error('Error fetching Medium articles:', error);

        // Update error message with specific details
        const errorMessageElement = errorElement.querySelector('p');
        if (error.name === 'AbortError') {
            errorMessageElement.textContent = 'Request timed out. Please check your internet connection and try again.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessageElement.textContent = 'Unable to connect to Medium. Please check your internet connection.';
        } else {
            errorMessageElement.textContent = `Error: ${error.message}`;
        }

        // Try fallback data as last resort
        try {
            console.log('Attempting to use fallback articles...');
            const fallbackArticles = getFallbackArticles();
            displayArticles(fallbackArticles);

            // Show warning about using fallback data
            const warningElement = document.createElement('div');
            warningElement.className = 'fallback-warning';
            warningElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Showing sample articles. Unable to load live data from Medium.</span>
            `;
            gridElement.parentNode.insertBefore(warningElement, gridElement);

            loadingElement.style.display = 'none';
            gridElement.style.display = 'grid';
            errorElement.style.display = 'none';

        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            // Show error state
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            gridElement.style.display = 'none';
        }
    }
}

function parseRSSFeed(xmlText) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('Failed to parse RSS XML');
        }

        const items = xmlDoc.querySelectorAll('item');
        const articles = [];

        items.forEach((item, index) => {
            if (index >= 9) return; // Limit to 9 articles

            const title = item.querySelector('title')?.textContent || 'Untitled';
            const link = item.querySelector('link')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const categories = Array.from(item.querySelectorAll('category')).map(cat => cat.textContent);

            // Extract content and estimate reading time
            const content = stripHtml(description);

            // Extract excerpt (first 200 characters for better readability)
            const excerpt = content.length > 200 ? content.substring(0, 200) + '...' : content;

            articles.push({
                title: stripHtml(title),
                link,
                pubDate: new Date(pubDate),
                description: excerpt,
                categories: categories.slice(0, 3), // Limit to 3 categories
                content
            });
        });

        // Sort by publication date (most recent first)
        return articles.sort((a, b) => b.pubDate - a.pubDate);

    } catch (error) {
        console.error('Error parsing RSS feed:', error);
        throw new Error('Failed to parse Medium RSS feed');
    }
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function displayArticles(articles) {
    const gridElement = document.getElementById('articles-grid');
    gridElement.innerHTML = '';

    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        gridElement.appendChild(articleCard);
    });
}

function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';

    // Format date
    const formattedDate = article.pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Create categories HTML
    const categoriesHtml = article.categories.length > 0
        ? article.categories.map(cat => `<span>${cat}</span>`).join('')
        : '<span>Article</span>';

    card.innerHTML = `
        <div class="article-header">
            <div class="article-meta">
                <span class="article-date">${formattedDate}</span>
                <span class="article-category">Medium</span>
            </div>
            <h3>${article.title}</h3>
        </div>
        <div class="article-content">
            <p>${article.description}</p>
            <div class="article-tags">
                ${categoriesHtml}
            </div>
        </div>
        <div class="article-footer">
            <a href="${article.link}" target="_blank" class="read-more">
                Read on Medium <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;

    return card;
}

function getFallbackArticles() {
    return [
        {
            title: 'Understanding Memory Management in C',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            pubDate: new Date('2024-01-15'),
            description: 'Deep dive into memory allocation, deallocation, and common pitfalls in C programming. Learn about stack vs heap, memory leaks, and best practices.',
            categories: ['C Programming', 'Memory Management', '42 School'],
        },
        {
            title: 'Introduction to Ethical Hacking',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            pubDate: new Date('2024-01-08'),
            description: 'Exploring the fundamentals of ethical hacking, penetration testing methodologies, and the importance of cybersecurity in modern applications.',
            categories: ['Ethical Hacking', 'Penetration Testing', 'Security'],
        },
        {
            title: 'My Journey at 42 School',
            link: `https://medium.com/@${MEDIUM_USERNAME}`,
            pubDate: new Date('2023-12-20'),
            description: 'Sharing my experience transitioning from web development to low-level programming at 42 School, challenges faced, and lessons learned.',
            categories: ['42 School', 'Career Change', 'Learning'],
        }
    ];
}

// Cache utility functions
function getCachedRepos() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - timestamp < CACHE_DURATION) {
            return data;
        } else {
            // Cache expired, remove it
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    } catch (error) {
        console.error('Error reading cache:', error);
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

function cacheRepos(repos) {
    try {
        const cacheData = {
            data: repos,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error caching repos:', error);
    }
}

// Articles cache utility functions
function getCachedArticles() {
    try {
        const cached = localStorage.getItem(ARTICLES_CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - timestamp < ARTICLES_CACHE_DURATION) {
            // Convert date strings back to Date objects
            return data.map(article => ({
                ...article,
                pubDate: new Date(article.pubDate)
            }));
        } else {
            // Cache expired, remove it
            localStorage.removeItem(ARTICLES_CACHE_KEY);
            return null;
        }
    } catch (error) {
        console.error('Error reading articles cache:', error);
        localStorage.removeItem(ARTICLES_CACHE_KEY);
        return null;
    }
}

function cacheArticles(articles) {
    try {
        const cacheData = {
            data: articles,
            timestamp: Date.now()
        };
        localStorage.setItem(ARTICLES_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error caching articles:', error);
    }
}

function filterAndSortRepos(repos) {
    // Filter out forks unless they have significant activity
    const filtered = repos.filter(repo => {
        // Keep non-forks
        if (!repo.fork) return true;

        // Keep forks with significant stars or recent activity
        const recentActivity = new Date(repo.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 days
        return repo.stargazers_count > 5 || recentActivity;
    });

    // Sort by priority, then by stars, then by recent activity
    return filtered.sort((a, b) => {
        // Priority repositories first
        const aPriority = priorityRepos.indexOf(a.name.toLowerCase());
        const bPriority = priorityRepos.indexOf(b.name.toLowerCase());

        if (aPriority !== -1 && bPriority !== -1) {
            return aPriority - bPriority;
        }
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;

        // Then by stars
        if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
        }

        // Then by recent activity
        return new Date(b.updated_at) - new Date(a.updated_at);
    }).slice(0, 9); // Limit to 9 repositories for better layout
}

function displayProjects(repos) {
    const gridElement = document.getElementById('projects-grid');
    gridElement.innerHTML = '';

    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        gridElement.appendChild(projectCard);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Format dates
    const createdDate = new Date(repo.created_at).toLocaleDateString();
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();

    // Get language color
    const languageColor = languageColors[repo.language] || '#666666';

    // Create language indicator
    const languageIndicator = repo.language ?
        `<span class="project-language" style="background-color: ${languageColor}"></span>${repo.language}` :
        'No language detected';

    // Create description with fallback
    const description = repo.description || 'No description available for this repository.';

    card.innerHTML = `
        <div class="project-header">
            <div class="project-title-row">
                <h3>${repo.name}</h3>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="github-link" title="View on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="demo-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>` : ''}
                </div>
            </div>
            <div class="project-tech">
                <span>${languageIndicator}</span>
            </div>
        </div>
        <p>${description}</p>
        <div class="project-stats">
            <div class="project-stat">
                <i class="fas fa-star"></i>
                <span>${repo.stargazers_count}</span>
            </div>
            <div class="project-stat">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
            </div>
            ${repo.size > 0 ? `<div class="project-stat">
                <i class="fas fa-database"></i>
                <span>${formatSize(repo.size)}</span>
            </div>` : ''}
        </div>
        <div class="project-dates">
            Created: ${createdDate} • Updated: ${updatedDate}
        </div>
    `;

    return card;
}

function formatSize(sizeInKB) {
    if (sizeInKB < 1024) {
        return `${sizeInKB} KB`;
    } else if (sizeInKB < 1024 * 1024) {
        return `${(sizeInKB / 1024).toFixed(1)} MB`;
    } else {
        return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
    }
}

// Refresh and retry functionality
document.addEventListener('DOMContentLoaded', () => {
    // Projects buttons
    const retryProjectsButton = document.getElementById('retry-projects');
    const refreshProjectsButton = document.getElementById('refresh-projects');

    if (retryProjectsButton) {
        retryProjectsButton.addEventListener('click', fetchGitHubRepos);
    }

    if (refreshProjectsButton) {
        refreshProjectsButton.addEventListener('click', () => {
            // Add spinning animation
            refreshProjectsButton.classList.add('spinning');

            // Remove any existing fallback warnings
            const existingWarning = document.querySelector('.fallback-warning');
            if (existingWarning) {
                existingWarning.remove();
            }

            // Fetch fresh data (force refresh)
            fetchGitHubRepos(true).finally(() => {
                // Remove spinning animation after a minimum time
                setTimeout(() => {
                    refreshProjectsButton.classList.remove('spinning');
                }, 500);
            });
        });
    }

    // Articles buttons
    const retryArticlesButton = document.getElementById('retry-articles');
    const refreshArticlesButton = document.getElementById('refresh-articles');

    if (retryArticlesButton) {
        retryArticlesButton.addEventListener('click', fetchMediumArticles);
    }

    if (refreshArticlesButton) {
        refreshArticlesButton.addEventListener('click', () => {
            // Add spinning animation
            refreshArticlesButton.classList.add('spinning');

            // Remove any existing fallback warnings
            const existingWarning = document.querySelector('.fallback-warning');
            if (existingWarning) {
                existingWarning.remove();
            }

            // Fetch fresh data (force refresh)
            fetchMediumArticles(true).finally(() => {
                // Remove spinning animation after a minimum time
                setTimeout(() => {
                    refreshArticlesButton.classList.remove('spinning');
                }, 500);
            });
        });
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Show home section by default
    showSection('home');

    // Load GitHub projects
    fetchGitHubRepos();

    // Load Medium articles
    fetchMediumArticles();

    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS class for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }

    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
