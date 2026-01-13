document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (!navLinks || !mobileMenuBtn) return;
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Toggle mobile menu
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks || !mobileMenuBtn) return;
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) closeMobileMenu();
    });
    
    // Close menu when clicking on a nav link
    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            if (document.getElementById(tabId)) {
                document.getElementById(tabId).classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .resource-card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.feature, .resource-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on page load
    setTimeout(animateOnScroll, 300);
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// E-books data (you can add more books to this array)
const ebooks = [
    {
        id: 1,
        title: "Introduction to Computer Science",
        author: "John Doe",
        category: "Computer Science",
        link: "#",
        description: "A comprehensive introduction to computer science concepts."
    },
    {
        id: 2,
        title: "Mathematics for Beginners",
        author: "Jane Smith",
        category: "Mathematics",
        link: "#",
        description: "Basic mathematics concepts for beginners."
    },
    // Add more e-books as needed
];

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    // Function to filter e-books based on search query
    function searchBooks(query) {
        if (!query.trim()) {
            return []; // Return empty array if query is empty
        }
        
        const lowerCaseQuery = query.toLowerCase();
        return ebooks.filter(book => 
            book.title.toLowerCase().includes(lowerCaseQuery) ||
            book.author.toLowerCase().includes(lowerCaseQuery) ||
            book.category.toLowerCase().includes(lowerCaseQuery) ||
            book.description.toLowerCase().includes(lowerCaseQuery)
        );
    }

    // Function to display search results
    function displayResults(results) {
        if (!searchResults) return; // Exit if searchResults element doesn't exist
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No e-books found matching your search.</div>';
            return;
        }

        const html = results.map(book => `
            <div class="book-card">
                <div class="book-cover">
                    <i class="fas fa-book"></i>
                </div>
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">By ${book.author}</p>
                    <p class="book-category">${book.category}</p>
                    <div class="book-actions">
                        <a href="${book.link}" class="book-link">Read Now</a>
                    </div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = html;
    }

    // Only add event listeners if the elements exist on the page
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            const results = searchBooks(query);
            displayResults(results);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                const results = searchBooks(query);
                displayResults(results);
            }
        });
    }
});