// Custom JavaScript for Bootstrap template

document.addEventListener('DOMContentLoaded', function() {
    // Create sidebar overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Handle sidebar toggle button for collapsing/expanding sidebar
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
            // Save sidebar state to localStorage
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }
    
    // Restore sidebar state from localStorage on page load
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    if (sidebarState === 'true') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('sidebar-collapsed');
    }
    
    // Add toggle button for mobile sidebar
    const mobileToggleBtn = document.createElement('button');
    mobileToggleBtn.className = 'btn btn-sm btn-outline-secondary d-md-none sidebar-toggler mt-2 ms-2';
    mobileToggleBtn.innerHTML = '<i class="fas fa-bars"></i> Menu';
    mobileToggleBtn.setAttribute('type', 'button');
    mainContent.insertBefore(mobileToggleBtn, mainContent.firstChild);
    
    // Toggle sidebar on mobile button click
    mobileToggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });
    
    // Hide sidebar when clicking on overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    });
    
    // Make dropdown arrows rotate on sidebar menu expand/collapse
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    sidebarToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            // Prevent the click from toggling the sidebar on mobile
            if (window.innerWidth < 768) {
                e.stopPropagation();
            }
            
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Give time for Bootstrap to update the aria-expanded attribute
            setTimeout(() => {
                if (expanded) {
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    this.setAttribute('aria-expanded', 'true');
                }
            }, 10);
        });
    });
    
    // Close sidebar when clicking a link on mobile
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-link:not(.sidebar-toggle)');
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });
    });
    
    // Handle window resize to reset sidebar state
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            overlay.classList.remove('show');
            sidebar.classList.remove('show'); // Remove show class as it's not needed on desktop
        }
    });
});