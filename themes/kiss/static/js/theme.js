(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeTextLight = document.getElementById('theme-text-light');
  const themeTextDark = document.getElementById('theme-text-dark');
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
    updateThemeText(theme);
  }

  // Update theme text visibility
  function updateThemeText(theme) {
    if (!themeTextDark || !themeTextLight) return;
    if (theme === 'dark') {
      // In dark mode, show "LIGHT" option to switch to light
      themeTextDark.classList.remove('hidden');
      themeTextLight.classList.add('hidden');
    } else {
      // In light mode, show "DARK" option to switch to dark
      themeTextLight.classList.remove('hidden');
      themeTextDark.classList.add('hidden');
    }
  }

  // Initialize text based on current state (dark class already set by inline script)
  updateThemeText(getCurrentTheme());

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

  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarIconOpen = document.getElementById('sidebar-icon-open');
  const sidebarIconClose = document.getElementById('sidebar-icon-close');

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('hidden');
    sidebar.classList.add('block');
    if (sidebarOverlay) sidebarOverlay.classList.remove('hidden');
    if (sidebarIconOpen) sidebarIconOpen.classList.add('hidden');
    if (sidebarIconClose) sidebarIconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('hidden');
    sidebar.classList.remove('block');
    if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
    if (sidebarIconOpen) sidebarIconOpen.classList.remove('hidden');
    if (sidebarIconClose) sidebarIconClose.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const isHidden = sidebar.classList.contains('hidden');
      if (isHidden) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when clicking a link (mobile)
  if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeSidebar();
        }
      });
    });
  }

  // Handle window resize - reset sidebar state on desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      if (sidebar) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('block');
      }
      if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
      if (sidebarIconOpen) sidebarIconOpen.classList.remove('hidden');
      if (sidebarIconClose) sidebarIconClose.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      // On mobile, ensure sidebar is hidden by default
      if (sidebar && !sidebar.classList.contains('hidden')) {
        closeSidebar();
      }
    }
  });
})();