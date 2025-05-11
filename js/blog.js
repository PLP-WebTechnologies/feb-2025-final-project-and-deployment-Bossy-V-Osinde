
document.addEventListener('DOMContentLoaded', function() {
    // Blog page specific elements
    const blogSearch = document.getElementById('blog-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const postsContainer = document.getElementById('posts-container');
    const categoriesContainer = document.getElementById('categories-container');
    const tagsContainer = document.getElementById('tags-container');
    const filterInfo = document.getElementById('filter-info');
    const filterTags = document.getElementById('filter-tags');
    const clearFilters = document.getElementById('clear-filters');
    const noResults = document.getElementById('no-results');
    
    // Filter state
    let currentFilters = {
      query: '',
      category: null,
      tag: null
    };
    
    // Initialize blog elements
    initBlogPage();
    
    // Search functionality
    if (blogSearch) {
      blogSearch.addEventListener('input', function() {
        currentFilters.query = this.value.trim();
        updateFilters();
        
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', !this.value);
        }
      });
    }
    
    // Clear search button
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function() {
        if (blogSearch) {
          blogSearch.value = '';
          currentFilters.query = '';
          updateFilters();
          clearSearchBtn.classList.add('hidden');
        }
      });
    }
    
    // Clear all filters button
    if (clearFilters) {
      clearFilters.addEventListener('click', function() {
        clearAllFilters();
      });
    }
    
    // Initialize blog page elements
    function initBlogPage() {
      // Render categories
      if (categoriesContainer) {
        renderCategories();
      }
      
      // Render tags
      if (tagsContainer) {
        renderTags();
      }
      
      // Render all posts initially
      renderPosts(blogPosts);
    }
    
    // Render categories
    function renderCategories() {
      const categories = getAllCategories();
      
      // Create "All Categories" option
      const allCategoriesItem = document.createElement('div');
      allCategoriesItem.className = 'category-item';
      allCategoriesItem.classList.toggle('active', currentFilters.category === null);
      allCategoriesItem.innerHTML = `
        <span>All Categories</span>
        <span class="category-count">${blogPosts.length}</span>
      `;
      allCategoriesItem.addEventListener('click', function() {
        currentFilters.category = null;
        updateFilters();
        
        // Update active state
        document.querySelectorAll('.category-item').forEach(item => {
          item.classList.remove('active');
        });
        this.classList.add('active');
      });
      categoriesContainer.appendChild(allCategoriesItem);
      
      // Create category items
      categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.classList.toggle('active', currentFilters.category === category.name);
        categoryItem.innerHTML = `
          <span>${category.name}</span>
          <span class="category-count">${category.count}</span>
        `;
        
        categoryItem.addEventListener('click', function() {
          currentFilters.category = category.name;
          updateFilters();
          
          // Update active state
          document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
          });
          this.classList.add('active');
        });
        
        categoriesContainer.appendChild(categoryItem);
      });
    }
    
    // Render tags
    function renderTags() {
      const tags = getAllTags();
      
      tags.forEach(tag => {
        const tagItem = document.createElement('span');
        tagItem.className = 'tag-item';
        tagItem.classList.toggle('active', currentFilters.tag === tag);
        tagItem.textContent = tag;
        
        tagItem.addEventListener('click', function() {
          // Toggle tag selection
          if (currentFilters.tag === tag) {
            currentFilters.tag = null;
            this.classList.remove('active');
          } else {
            // Remove active class from all tags
            document.querySelectorAll('.tag-item').forEach(item => {
              item.classList.remove('active');
            });
            
            currentFilters.tag = tag;
            this.classList.add('active');
          }
          
          updateFilters();
        });
        
        tagsContainer.appendChild(tagItem);
      });
    }
    
    // Update filters and re-render posts
    function updateFilters() {
      const filteredPosts = filterPosts(currentFilters);
      renderPosts(filteredPosts);
      updateFilterInfo();
    }
    
    // Update filter information display
    function updateFilterInfo() {
      if (!filterInfo || !filterTags) return;
      
      const hasFilters = currentFilters.query || currentFilters.category || currentFilters.tag;
      filterInfo.classList.toggle('hidden', !hasFilters);
      
      if (hasFilters) {
        filterTags.innerHTML = '';
        
        if (currentFilters.query) {
          addFilterTag('Search: ' + currentFilters.query, 'query');
        }
        
        if (currentFilters.category) {
          addFilterTag('Category: ' + currentFilters.category, 'category');
        }
        
        if (currentFilters.tag) {
          addFilterTag('Tag: ' + currentFilters.tag, 'tag');
        }
      }
    }
    
    // Add filter tag to the filter info section
    function addFilterTag(text, type) {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${text}
        <button data-type="${type}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;
      
      // Remove filter when close button is clicked
      tag.querySelector('button').addEventListener('click', function() {
        const filterType = this.getAttribute('data-type');
        currentFilters[filterType] = null;
        
        if (filterType === 'query' && blogSearch) {
          blogSearch.value = '';
          if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
        }
        
        if (filterType === 'category') {
          document.querySelectorAll('.category-item').forEach((item, index) => {
            item.classList.toggle('active', index === 0); // Activate "All Categories"
          });
        }
        
        if (filterType === 'tag') {
          document.querySelectorAll('.tag-item').forEach(item => {
            item.classList.remove('active');
          });
        }
        
        updateFilters();
      });
      
      filterTags.appendChild(tag);
    }
    
    // Clear all filters
    function clearAllFilters() {
      currentFilters = {
        query: '',
        category: null,
        tag: null
      };
      
      if (blogSearch) {
        blogSearch.value = '';
      }
      
      if (clearSearchBtn) {
        clearSearchBtn.classList.add('hidden');
      }
      
      // Reset category active state
      document.querySelectorAll('.category-item').forEach((item, index) => {
        item.classList.toggle('active', index === 0); // Activate "All Categories"
      });
      
      // Reset tag active state
      document.querySelectorAll('.tag-item').forEach(item => {
        item.classList.remove('active');
      });
      
      updateFilters();
    }
    
    // Render posts based on current filters
    function renderPosts(posts) {
      if (!postsContainer) return;
      
      postsContainer.innerHTML = '';
      
      // Show/hide no results message
      if (noResults) {
        noResults.classList.toggle('hidden', posts.length > 0);
      }
      
      if (posts.length === 0) return;
      
      posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'featured-post';
        
        postElement.innerHTML = `
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
        `;
        
        postsContainer.appendChild(postElement);
      });
    }
  });
  const headerSearch = document.getElementById('search-input');
if (headerSearch) {
  headerSearch.addEventListener('input', function () {
    currentFilters.query = this.value.trim();
    updateFilters();
  });
}
