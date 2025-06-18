// Ensure all DOM-related operations run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Navigation Active State Management ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Get the current HTML file name (e.g., 'index.html', 'menu.html')

    /**
     * Sets the 'active' class on the clicked navigation link
     * and stores it in localStorage for persistence across pages.
     * @param {HTMLElement} clickedLink - The <a> element that was clicked.
     */
    function setActiveLink(clickedLink) {
        // Remove 'nav-active' class from all links
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
        });

        // Add 'nav-active' class to the clicked link
        clickedLink.classList.add('nav-active');

        // Store active link's href in localStorage for persistence
        localStorage.setItem('activeNavLink', clickedLink.getAttribute('href'));
    }

    /**
     * Restores the active navigation state on page load based on localStorage or current URL.
     */
    function restoreActiveState() {
        const savedActiveLinkHref = localStorage.getItem('activeNavLink');

        // First, try to activate based on the saved link in localStorage
        if (savedActiveLinkHref) {
            let foundSavedLink = false;
            navLinks.forEach(link => {
                // Special handling for internal hash links vs. full page links
                if (link.getAttribute('href') === savedActiveLinkHref) {
                    link.classList.add('nav-active');
                    foundSavedLink = true;
                }
            });
            if (foundSavedLink) return; // If a saved link was activated, stop here
        }

        // If no saved link or it's not the current page, activate based on current URL
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            let targetPage = '';

            if (linkHref.startsWith('#')) {
                // For internal hash links like #home, check if current URL is index.html (or variants)
                // and if the hash matches an existing section ID.
                if (currentPath === 'index.html' || currentPath === '' || currentPath === 'restaurant.html') {
                    // Check if the current URL's hash matches this link's hash (if any)
                    // Or if it's the home link and we are on the root/index page.
                    if (linkHref === '#home') { // Assuming #home refers to the default index page
                         link.classList.add('nav-active');
                         localStorage.setItem('activeNavLink', linkHref); // Save for persistence
                    }
                }
            } else {
                // For external HTML links (e.g., 'menu.html', 'reservations.html')
                targetPage = linkHref.split('/').pop(); // Extract file name (e.g., 'menu.html')

                if (currentPath === targetPage) {
                    link.classList.add('nav-active');
                    localStorage.setItem('activeNavLink', linkHref); // Save for persistence
                }
            }
        });

        // Fallback: If no link was activated (e.g., first visit, or no exact match),
        // ensure 'Home' is active if it exists and the current path is the root/index page.
        if (!localStorage.getItem('activeNavLink') || !document.querySelector('.nav-active')) {
            const homeLink = document.querySelector('a[href="index.html"]'); // Assuming index.html is the home page
            if (homeLink) {
                homeLink.classList.add('nav-active');
                localStorage.setItem('activeNavLink', 'index.html');
            }
        }
    }

    // Add click event listeners to all navigation links for active state and smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Set active state immediately on click
            setActiveLink(this);

            // Handle smooth scrolling for internal hash links
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Scroll to the start of the element
                    });
                } else {
                    console.warn(`Target element with ID "${href}" not found for smooth scrolling.`);
                }
            }
            // For external links, the default behavior (navigation) will occur
        });
    });

    // Initialize active state on page load
    restoreActiveState();


    // --- Carousel Functionality ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;

    /**
     * Displays a specific slide in the carousel.
     * @param {number} index - The index of the slide to show.
     */
    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active'); // Remove 'active' from all slides
        });
        slides[index].classList.add('active'); // Add 'active' to the target slide
    }

    /**
     * Advances the carousel to the next slide.
     */
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    /**
     * Rewinds the carousel to the previous slide.
     */
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance carousel
    let autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Event listeners for carousel buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Stop auto-advance on manual click
            nextSlide();
            autoSlideInterval = setInterval(nextSlide, 5000); // Restart auto-advance
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval); // Stop auto-advance on manual click
            prevSlide();
            autoSlideInterval = setInterval(nextSlide, 5000); // Restart auto-advance
        });
    }

    // Initialize with the first slide visible
    if (slides.length > 0) {
        showSlide(currentSlide);
    }


    // --- Search Functionality ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const searchTerm = searchInput.value.trim(); // Get the trimmed search term

            if (searchTerm) {
                console.log('Search initiated for:', searchTerm);
                 results.
                console.log(`Searching for: "${searchTerm}"`);
            } else {
                console.log('Please enter a search term.'); // Using console.log instead of alert()
            }
        });
    } else {
        console.error('Error: Search form or input not found.');
    }


    // --- Smart Header Scroll Logic ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Pixels to scroll before hiding/showing

    if (header) { // Ensure header exists before adding scroll listener
        window.addEventListener('scroll', () => {
            // Check if user has scrolled beyond a certain point from the top
            // This prevents the header from immediately hiding when the page loads or is at the very top
            if (window.scrollY > header.offsetHeight + scrollThreshold) {
                if (window.scrollY < lastScrollY) {
                    // Scrolling Up
                    header.classList.remove('header-hidden');
                } else {
                    // Scrolling Down
                    header.classList.add('header-hidden');
                }
            } else {
                // At or near the top of the page, always show header
                header.classList.remove('header-hidden');
            }
            lastScrollY = window.scrollY;
        });
    } else {
        console.error('Error: Header element not found for smart scroll logic.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitted');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Show a confirmation message
            alert('Thank you for your subscription! We will keep you updated with the latest news and offers.');
        });
    } 

    // --- NEW: Image Modal Logic ---
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const closeModalBtn = document.getElementById('closeModalBtn');
    // Select all elements with the class 'dish-item' to attach click listeners
    const dishItems = document.querySelectorAll('.dish-item' , 'services');

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

document.addEventListener("DOMContentLoaded", () => {
    const photos = document.querySelectorAll(".menu-photo");
    const modal = document.getElementById("photo-modal");
    const modalPhoto = document.getElementById("modal-photo");
    const closeModal = document.getElementById("close-modal");

    // Open modal when a photo is clicked
    photos.forEach(photo => {
        photo.addEventListener("click", () => {
            const fullPhotoSrc = photo.getAttribute("data-src");
            modalPhoto.src = fullPhotoSrc; // Set the modal photo source
            modal.style.display = "flex"; // Show the modal
        });
    });

    // Close modal when the close button is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
    });

    // Close modal when clicking outside the photo
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });
});