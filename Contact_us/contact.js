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
    const reservationForm = document.getElementById("reservation-form");

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const emailValue = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {   
            alert("Please enter a valid email address.");
            return;
        }

        const phoneInput = document.getElementById("phone");
        const phoneValue = phoneInput.value;
        const phonePattern = /^\d{10}$/; // Assuming a 10-digit phone number
        if (!phonePattern.test(phoneValue)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        alert("Submitted successfully!");
        
        // Submit the form
        reservationForm.submit();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const reservationForm = document.getElementById("reservation-form");

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Format Date (dd-mm-yyyy)
        const dateInput = document.getElementById("date");
        const dateValue = dateInput.value;
        const formattedDate = dateValue.split("-").reverse().join("-");
        dateInput.value = formattedDate;

        // Format Time (hh:mm AM/PM)
        const timeInput = document.getElementById("time");
        const timeValue = timeInput.value;
        const [hours, minutes] = timeValue.split(":");
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        timeInput.value = `${formattedHours}:${minutes} ${period}`;

        // Submit the form
        reservationForm.submit();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector("header"); // Select the navigation bar
    let lastScrollPosition = 0; // Track the last scroll position

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
            navbar.style.backgroundColor = "#0f172a";
        }

        lastScrollPosition = currentScrollPosition; // Update the last scroll position
    });
});