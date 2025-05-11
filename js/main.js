
// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileMenu = document.getElementById('mobile-menu');
const currentYearSpan = document.getElementById('current-year');
const newsletterForm = document.getElementById('newsletter-form');
const footerNewsletterForm = document.getElementById('footer-newsletter-form');
const toastContainer = document.getElementById('toast-container');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Initialize featured and recent posts on homepage
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    initHomepage();
  }

  // Initialize newsletter forms
  initNewsletterForms();
});

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Set theme
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (moonIcon) moonIcon.classList.add('hidden');
    if (sunIcon) sunIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    if (moonIcon) moonIcon.classList.remove('hidden');
    if (sunIcon) sunIcon.classList.add('hidden');
  }
  localStorage.setItem('theme', theme);
}

// Search toggle functionality
if (searchToggle) {
  searchToggle.addEventListener('click', function() {
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
      searchInput.focus();
    }
  });
}

// Mobile menu functionality
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
}

// Initialize homepage content
function initHomepage() {
  // Initialize featured posts
  const featuredPostsContainer = document.getElementById('featured-posts-container');
  if (featuredPostsContainer) {
    const featuredPosts = getFeaturedPosts();
    renderFeaturedPosts(featuredPosts, featuredPostsContainer);
  }

  // Initialize recent posts
  const recentPostsContainer = document.getElementById('recent-posts-container');
  if (recentPostsContainer) {
    const recentPosts = getRecentPosts(3);
    renderPostsGrid(recentPosts, recentPostsContainer);
  }
}

// Render featured posts
function renderFeaturedPosts(posts, container) {
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p>No featured posts available.</p>';
    return;
  }

  let html = '';
  posts.forEach((post, index) => {
    const isFirstPost = index === 0;
    const postClass = isFirstPost ? 'featured-post-large' : 'featured-post';
    
    html += `
      <article class="${postClass}">
        <div class="featured-post-image">
          <img src="${post.coverImage}" alt="${post.title}">
          <span class="featured-post-badge">Featured</span>
        </div>
        <div class="featured-post-content">
          <div class="featured-post-meta">
            <span class="post-category">${post.category}</span>
            <span class="post-reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${post.readingTime}
            </span>
          </div>
          <h3>${post.title}</h3>
          <p class="featured-post-excerpt">${post.excerpt}</p>
          <div class="featured-post-footer">
            <div class="author-info">
              <img src="${post.author.avatar}" alt="Author" class="author-avatar">
              <div class="author-details">
                <div class="author-name">${post.author.name}</div>
                <div class="post-date">${formatDate(post.publishedAt)}</div>
              </div>
            </div>
            <a href="post.html?id=${post.id}" class="read-more">Read more</a>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

// Render posts grid
function renderPostsGrid(posts, container) {
  if (!posts || posts.length === 0) {
    container.innerHTML = '<p>No posts available.</p>';
    return;
  }

  let html = '';
  posts.forEach(post => {
    html += `
      <article class="featured-post">
        <div class="featured-post-image">
          <img src="${post.coverImage}" alt="${post.title}">
          ${post.featured ? '<span class="featured-post-badge">Featured</span>' : ''}
        </div>
        <div class="featured-post-content">
          <div class="featured-post-meta">
            <span class="post-category">${post.category}</span>
            <span class="post-reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${post.readingTime}
            </span>
          </div>
          <h3>${post.title}</h3>
          <p class="featured-post-excerpt">${post.excerpt}</p>
          <div class="featured-post-footer">
            <div class="author-info">
              <img src="${post.author.avatar}" alt="Author" class="author-avatar">
              <div class="author-details">
                <div class="author-name">${post.author.name}</div>
                <div class="post-date">${formatDate(post.publishedAt)}</div>
              </div>
            </div>
            <a href="post.html?id=${post.id}" class="read-more">Read more</a>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

// Initialize newsletter forms
function initNewsletterForms() {
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  // Get email input
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  emailInput.value = '';
  showToast('Thank you for subscribing to our newsletter!', 'success');
}

// Email validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Show toast message
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  toast.innerHTML = `
    <div class="toast-content">
      ${type === 'success' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' 
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'}
      <span>${message}</span>
    </div>
    <button class="toast-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    </button>
  `;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Add close functionality
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// URL parameter helper
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Markdown to HTML conversion (simple implementation)
function markdownToHTML(markdown) {
  if (!markdown) return '';
  
  // Convert headings
  let html = markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>');
  
  // Convert bold and italic
  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  html = html
    .replace(/^\s*\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)(?=\n<li>)/g, '$1');
  html = html.replace(/(<li>.*<\/li>(\n)?)+/g, '<ul>$&</ul>');
  
  // Convert code blocks
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Convert paragraphs (simple approach)
  html = html.replace(/^(?!<h|<ul|<pre)(.*$)/gm, '<p>$1</p>');
  
  // Remove empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  
  return html;
}
