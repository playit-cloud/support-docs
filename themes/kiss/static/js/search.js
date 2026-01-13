(function() {
  // Search functionality for both sidebar and home page search
  const searchInputs = [
    { input: document.getElementById('search-input'), results: document.getElementById('search-results') },
    { input: document.getElementById('home-search-input'), results: document.getElementById('home-search-results') }
  ];

  // Get search index from the page (injected by Hugo)
  const searchIndex = window.searchIndex || [];

  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-terminal-green/30 text-inherit">$1</mark>');
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const page of searchIndex) {
      const titleMatch = page.title.toLowerCase().includes(lowerQuery);
      const contentMatch = page.content.toLowerCase().includes(lowerQuery);
      const tagMatch = page.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      if (titleMatch || contentMatch || tagMatch) {
        let score = 0;
        if (titleMatch) score += 10;
        if (tagMatch) score += 5;
        if (contentMatch) score += 1;

        results.push({ ...page, score });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 10);
  }

  function renderResults(results, container, query) {
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = '<div class="p-3 text-sm text-left text-[#1a1f1c]/60 dark:text-[#e0e6e3]/60">No results found</div>';
      container.classList.remove('hidden');
      return;
    }

    const html = results.map(result => {
      const title = highlightMatch(result.title, query);
      const snippet = result.content.substring(0, 150) + (result.content.length > 150 ? '...' : '');
      
      return `
        <a href="${result.url}" class="block p-3 text-left hover:bg-terminal-green/5 dark:hover:bg-terminal-green/10 border-b border-terminal-green/10 dark:border-terminal-green/10 last:border-0">
          <div class="font-heading font-medium text-[#1a1f1c] dark:text-[#e0e6e3] text-sm">${title}</div>
          <div class="text-xs text-[#1a1f1c]/60 dark:text-[#e0e6e3]/60 mt-1 line-clamp-2">${snippet}</div>
        </a>
      `;
    }).join('');

    container.innerHTML = html;
    container.classList.remove('hidden');
  }

  function hideResults(container) {
    if (container) {
      container.classList.add('hidden');
    }
  }

  // Set up each search input
  searchInputs.forEach(({ input, results }) => {
    if (!input) return;

    const debouncedSearch = debounce((query) => {
      const searchResults = search(query);
      renderResults(searchResults, results, query);
    }, 200);

    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length < 2) {
        hideResults(results);
        return;
      }
      debouncedSearch(query);
    });

    input.addEventListener('focus', (e) => {
      const query = e.target.value.trim();
      if (query.length >= 2) {
        debouncedSearch(query);
      }
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !results?.contains(e.target)) {
        hideResults(results);
      }
    });

    // Handle keyboard navigation
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideResults(results);
        input.blur();
      }
    });
  });
})();