// Blog Data 
const blogPosts = [
    {
      id: "1",
      title: "Getting Started with React.js: A Beginner's Guide",
      excerpt: "Learn the basics of React.js, a popular JavaScript library for building user interfaces, through practical examples and clear explanations.",
      content: `...`, // Content truncated for brevity
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
      author: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/150?u=alex",
        role: "Senior Frontend Developer"
      },
      publishedAt: "2023-05-15T09:00:00Z",
      readingTime: "8 min read",
      featured: true
    },
    {
      id: "2",
      title: "CSS Grid Layout: Revolutionizing Web Design",
      excerpt: "Discover how CSS Grid Layout is changing the game for web designers and developers with its powerful two-dimensional layout capabilities.",
      content: `...`,
      coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
      category: "CSS",
      tags: ["CSS", "Frontend", "Web Design", "Layout"],
      author: {
        name: "Emily Chen",
        avatar: "https://i.pravatar.cc/150?u=emily",
        role: "UI/UX Designer"
      },
      publishedAt: "2023-06-22T14:30:00Z",
      readingTime: "6 min read",
      featured: false
    },
    {
      id: "3",
      title: "Introduction to TypeScript: Making JavaScript Type-Safe",
      excerpt: "Explore how TypeScript enhances JavaScript by adding static type definitions, improving development experience and code quality.",
      content: `...`,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      category: "JavaScript",
      tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
      author: {
        name: "Michael Smith",
        avatar: "https://i.pravatar.cc/150?u=michael",
        role: "Software Engineer"
      },
      publishedAt: "2023-07-05T10:15:00Z",
      readingTime: "10 min read",
      featured: true
    },
    {
      id: "4",
      title: "Understanding Web Accessibility: Designing for All Users",
      excerpt: "Learn the importance of web accessibility and how to implement best practices to make your websites usable for everyone, including people with disabilities.",
      content: `...`,
      coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      category: "Accessibility",
      tags: ["Accessibility", "Web Development", "UX", "Design"],
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        role: "Accessibility Specialist"
      },
      publishedAt: "2023-08-12T16:45:00Z",
      readingTime: "9 min read",
      featured: true
    },
    {
      id: "5",
      title: "Node.js Essentials: Server-Side JavaScript",
      excerpt: "Dive into Node.js fundamentals and learn how to build efficient and scalable server-side applications with JavaScript.",
      content: `...`,
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      category: "Backend",
      tags: ["Node.js", "JavaScript", "Backend", "Server-Side"],
      author: {
        name: "David Wilson",
        avatar: "https://i.pravatar.cc/150?u=david",
        role: "Backend Developer"
      },
      publishedAt: "2023-09-03T11:20:00Z",
      readingTime: "11 min read",
      featured: false
    },
    {
      id: "6",
      title: "Modern CSS Techniques for Better Responsive Designs",
      excerpt: "Explore advanced CSS techniques like CSS Grid, Flexbox, and custom properties to create responsive designs that work across all devices.",
      content: `...`,
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "CSS",
      tags: ["CSS", "Responsive Design", "Web Development", "Frontend"],
      author: {
        name: "Michelle Lee",
        avatar: "https://i.pravatar.cc/150?u=michelle",
        role: "Frontend Developer"
      },
      publishedAt: "2023-10-18T13:40:00Z",
      readingTime: "7 min read",
      featured: false
    }
  ];
  
  // Helper functions
  function getPostById(id) {
    return blogPosts.find(post => post.id === id);
  }
  
  function getRecentPosts(limit = 3) {
    return [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  }
  
  function getFeaturedPosts() {
    return blogPosts.filter(post => post.featured);
  }
  
  function getRelatedPosts(postId, limit = 3) {
    const currentPost = getPostById(postId);
    if (!currentPost) return [];
  
    return blogPosts
      .filter(post =>
        post.id !== postId &&
        (post.category === currentPost.category ||
          post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  }
  
  
  function searchPosts(query) {
    if (!query || query.trim() === '') return blogPosts;
  
    const normalizedQuery = query.toLowerCase().trim();
  
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.excerpt.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  }
  
  function getAllCategories() {
    const categories = {};
  
    blogPosts.forEach(post => {
      if (!categories[post.category]) {
        categories[post.category] = 0;
      }
      categories[post.category]++;
    });
  
    return Object.entries(categories)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }
  
  function getAllTags() {
    const tagsSet = new Set();
  
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
  
    return Array.from(tagsSet).sort();
  }
  
 
  function filterPosts({ query, category, tag }) {
    let filteredPosts = [...blogPosts];
  
    if (query && query.trim() !== '') {
      const normalizedQuery = query.toLowerCase().trim();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
      );
    }
  
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
  
    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    }
  
    return filteredPosts;
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  