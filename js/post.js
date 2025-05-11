
document.addEventListener('DOMContentLoaded', function() {
    // Get post ID from URL
    const postId = getUrlParameter('id');
    
    if (!postId) {
      window.location.href = 'blog.html';
      return;
    }
    
    // Get post data
    const post = getPostById(postId);
    
    if (!post) {
      window.location.href = 'blog.html';
      return;
    }
    
    // Initialize post page
    initPostPage(post);
    
    // Initialize related posts
    initRelatedPosts(postId);
  });
  
  // Initialize post page
  function initPostPage(post) {
    // Update page title
    document.title = `${post.title} - InsightBlog`;
    
    // Update post category
    const postCategory = document.getElementById('post-category');
    if (postCategory) {
      postCategory.textContent = post.category;
    }
    
    // Update post reading time
    const postReadingTime = document.getElementById('post-reading-time');
    if (postReadingTime && postReadingTime.querySelector('span')) {
      postReadingTime.querySelector('span').textContent = post.readingTime;
    }
    
    // Update post title
    const postTitle = document.getElementById('post-title');
    if (postTitle) {
      postTitle.textContent = post.title;
    }
    
    // Update author info
    const authorAvatar = document.getElementById('author-avatar');
    if (authorAvatar) {
      authorAvatar.src = post.author.avatar;
      authorAvatar.alt = post.author.name;
    }
    
    const authorName = document.getElementById('author-name');
    if (authorName) {
      authorName.textContent = post.author.name;
    }
    
    const authorRole = document.getElementById('author-role');
    if (authorRole) {
      authorRole.textContent = post.author.role;
    }
    
    // Update post date
    const postDate = document.getElementById('post-date');
    if (postDate && postDate.querySelector('span')) {
      postDate.querySelector('span').textContent = formatDate(post.publishedAt);
    }
    
    // Update post image
    const postImage = document.getElementById('post-image');
    if (postImage) {
      postImage.src = post.coverImage;
      postImage.alt = post.title;
    }
    
    // Update post content
    const postBody = document.getElementById('post-body');
    if (postBody) {
        postBody.innerHTML = marked.parse(post.content);
    }
    
    // Update post tags
    const postTagsContainer = document.getElementById('post-tags-container');
    if (postTagsContainer) {
      postTagsContainer.innerHTML = '';
      
      post.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'post-tag';
        tagElement.textContent = tag;
        
        // Make tag clickable to go to blog page with tag filter
        tagElement.addEventListener('click', function() {
          window.location.href = `blog.html?tag=${encodeURIComponent(tag)}`;
        });
        
        postTagsContainer.appendChild(tagElement);
      });
    }
  }
  
  // Initialize related posts
  function initRelatedPosts(postId) {
    const relatedPostsContainer = document.getElementById('related-posts-container');
    
    if (!relatedPostsContainer) return;
    
    const relatedPosts = getRelatedPosts(postId, 3);
    
    if (relatedPosts.length === 0) {
      // If no related posts, hide the section
      const relatedSection = document.querySelector('.related-posts');
      if (relatedSection) {
        relatedSection.style.display = 'none';
      }
      return;
    }
    
    // Render related posts
    relatedPosts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.className = 'featured-post';
      
      postElement.innerHTML = `
        <div class="featured-post-image">
          <img src="${post.coverImage}" alt="${post.title}">
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
      
      relatedPostsContainer.appendChild(postElement);
    });
  }
  