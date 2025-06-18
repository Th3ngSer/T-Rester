// Navigation Active State Management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname;
    
    // Function to set active state
    function setActiveLink(clickedLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Store active link in localStorage for persistence
        localStorage.setItem('activeNavLink', clickedLink.getAttribute('href'));
    }
    
    // Function to restore active state on page load
    function restoreActiveState() {
        const savedActiveLink = localStorage.getItem('activeNavLink');
        
        // If there's a saved active link, apply it
        if (savedActiveLink) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === savedActiveLink) {
                    link.classList.add('active');
                }
            });
        } else {
            // Default: set Home as active if no saved state
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
        
        // Special handling for current page detection
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if current page matches any navigation link
            if (linkPath && currentPage.includes(linkPath.replace('./', ''))) {
                link.classList.add('active');
                localStorage.setItem('activeNavLink', linkPath);
            }
            
            // Special case for menu page
            if (currentPage.includes('menu.html') && linkPath.includes('menu.html')) {
                link.classList.add('active');
                localStorage.setItem('activeNavLink', linkPath);
            }
        });
    }
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for external links or hash links
            const href = this.getAttribute('href');
            
            // Set active state
            setActiveLink(this);
            
            // For hash links (same page navigation), handle smooth scrolling
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Initialize active state on page load
    restoreActiveState();
});

// Additional function for manual active state setting (if needed)
function setNavActive(linkHref) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === linkHref) {
            link.classList.add('active');
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("text-white-700", "font-bold");
        } else {
            link.classList.remove("text-white-700", "font-bold");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
     const navbar = document.querySelector("header");
    let lastScrollPosition = 0;

    if (navbar) { // Ensure navbar exists
        window.addEventListener("scroll", () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down - hide the navbar
                navbar.style.transform = "translateY(-100%)";
                navbar.style.transition = "transform 0.3s ease";
            } else {
                // Scrolling up - show the navbar
                navbar.style.transform = "translateY(0)";
                navbar.style.transition = "transform 0.3s ease";
                navbar.style.backgroundColor = "#0f172a"; // Ensure background color is reset
            }
            lastScrollPosition = currentScrollPosition;
        });
    } else {
        console.warn("Header element not found for scroll logic.");
    }


    // --- NEW: Image Modal Logic ---
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const closeModalBtn = document.getElementById('closeModalBtn');
    // Select all elements with the class 'dish-item' to attach click listeners
    const dishItems = document.querySelectorAll('.dish-item');

    // Function to open the modal
    function openModal(imageSrc, dishName) {
        modalImage.src = imageSrc; // Set the image source
        modalImage.alt = dishName; // Set the alt text for accessibility
        modalName.textContent = dishName; // Set the dish name
        imageModal.classList.remove('hidden'); // Make the modal visible
        // Use requestAnimationFrame for smoother CSS transition activation
        requestAnimationFrame(() => {
            imageModal.classList.add('visible');
        });
        document.body.style.overflow = 'hidden'; // Prevent scrolling on the body when modal is open
    }

    // Function to close the modal
    function closeModal() {
        imageModal.classList.remove('visible'); // Trigger fade-out transition
        // Set a timeout to truly hide the modal after the CSS transition completes
        setTimeout(() => {
            imageModal.classList.add('hidden'); // Hide the modal completely
            modalImage.src = ''; // Clear image source
            modalName.textContent = ''; // Clear name
            document.body.style.overflow = ''; // Restore scrolling on the body
        }, 300); // Match this duration with the 'transition' property in menu.css for #imageModal
    }

    // Add click listeners to each dish item
    dishItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgElement = item.querySelector('img'); // Get the image element within the dish item
            const h3Element = item.querySelector('h3'); // Get the h3 (name) element

            if (imgElement && h3Element) {
                const imageSrc = imgElement.src; // Get the image source
                const dishName = h3Element.textContent; // Get the dish name
                openModal(imageSrc, dishName); // Open the modal
            }
        });
    });

    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the image (on the overlay itself)
    if (imageModal) {
        imageModal.addEventListener('click', function(event) {
            // Check if the click occurred directly on the modal overlay, not on its content
            if (event.target === imageModal) {
                closeModal();
            }
        });
    }

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', function(event) {
        // Check if the modal is currently visible and the key pressed is 'Escape'
        if (event.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            closeModal();
        }
    });


});