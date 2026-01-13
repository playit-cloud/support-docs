(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIconLight = document.getElementById('theme-icon-light');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const html = document.documentElement;

  // Get current theme
  function getCurrentTheme() {
    return html.classList.contains('dark') ? 'dark' : 'light';
  }

  // Set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  // Update theme icon visibility
  function updateThemeIcon(theme) {
    if (!themeIconDark || !themeIconLight) return;
    if (theme === 'dark') {
      themeIconDark.classList.remove('hidden');
      themeIconLight.classList.add('hidden');
    } else {
      themeIconLight.classList.remove('hidden');
      themeIconDark.classList.add('hidden');
    }
  }

  // Initialize icon based on current state (dark class already set by inline script)
  updateThemeIcon(getCurrentTheme());

  // Enable smooth transitions after initial render
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      html.classList.add('transitions-enabled');
    });
  });

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();