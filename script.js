// HomHari - script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const loginBtnNav = document.getElementById('loginBtnNav');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModal');
    const currentLanguage = document.getElementById('currentLanguage');
    const languagesDropdown = document.getElementById('languagesDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const dashboardTabs = document.querySelectorAll('.dashboard-tabs .tab');
    const tabContents = document.querySelectorAll('.dashboard-container .tab-content');
    const sellForm = document.getElementById('sellForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const priceChartCanvas = document.getElementById('priceChart');
    const currentYearSpan = document.getElementById('currentYear');
    const weatherDate = document.getElementById('weatherDate');
    const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

    // --- Mobile Navigation ---
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.querySelector('i').classList.toggle('fa-bars');
            menuBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Close nav when a link is clicked (for single-page nav)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.querySelector('i').classList.add('fa-bars');
                    menuBtn.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }


    // --- Active Navigation Link Highlighting on Scroll ---
    function highlightNavOnScroll() {
        let currentSection = "";
        const sections = document.querySelectorAll('section[id]'); // Ensure sections have IDs

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active-link');
            if (anchor.getAttribute('href').substring(1) === currentSection) {
                anchor.classList.add('active-link');
            }
        });
        // Special case for top of page / hero
        if (currentSection === "" && pageYOffset < sections[0].offsetTop - sections[0].clientHeight / 3) {
             const homeLink = navLinks.querySelector('a[href="#home"]');
             if(homeLink) homeLink.classList.add('active-link');
        }
    }
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial call


    // --- Language Selector ---
    if (currentLanguage && languagesDropdown) {
        currentLanguage.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from bubbling to document
            languagesDropdown.classList.toggle('show');
            currentLanguage.classList.toggle('open');
        });

        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.dataset.lang;
                const langName = this.querySelector('span').textContent;
                const langFlagSrc = this.querySelector('img').src;

                currentLanguage.querySelector('span').textContent = lang.toUpperCase();
                currentLanguage.querySelector('img').src = langFlagSrc;
                currentLanguage.querySelector('img').alt = langName + " Flag";

                languagesDropdown.classList.remove('show');
                currentLanguage.classList.remove('open');
                // Add actual language switching logic here if needed
                console.log(`Language changed to: ${langName}`);
            });
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!languagesDropdown.contains(event.target) && !currentLanguage.contains(event.target)) {
                languagesDropdown.classList.remove('show');
                currentLanguage.classList.remove('open');
            }
        });
    }

    // --- Dashboard Tabs ---
    if (dashboardTabs.length > 0 && tabContents.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                dashboardTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetTabContentId = this.dataset.tab + '-content'; // e.g. prices-content
                const targetTabContent = document.getElementById(targetTabContentId);
                if (targetTabContent) {
                    targetTabContent.classList.add('active');
                }

                // If trends tab is activated, and chart exists, potentially re-render or update
                if (this.dataset.tab === 'trends' && priceChart) {
                    // priceChart.update(); // Or other Chart.js update methods if needed
                }
            });
        });
    }

    // --- Login Modal ---
    if (loginBtnNav && loginModal && closeModalBtn) {
        loginBtnNav.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('show');
        });

        closeModalBtn.addEventListener('click', () => {
            loginModal.classList.remove('show');
        });

        // Close modal if backdrop is clicked
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('show');
            }
        });
    }
    // Also handle login button inside the actual form if it exists
    const actualLoginForm = document.getElementById('actualLoginForm');
    if (actualLoginForm) {
        actualLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add actual login logic here
            console.log('Login form submitted');
            // For demo, just close modal
            if(loginModal) loginModal.classList.remove('show');
            // You might want to show a success/error message
        });
    }


    // --- Form Submission Handling (Mock) ---
    function handleFormSubmit(formElement, messageElementId) {
        if (formElement) {
            formElement.addEventListener('submit', (e) => {
                e.preventDefault();
                const messageDiv = document.getElementById(messageElementId);
                if (!messageDiv) {
                    console.error(`Message element with ID ${messageElementId} not found.`);
                    return;
                }

                // Basic validation example (check if required fields are filled)
                let isValid = true;
                formElement.querySelectorAll('[required]').forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'var(--danger-color)'; // Highlight empty required fields
                    } else {
                        input.style.borderColor = '#ced4da'; // Reset border color
                    }
                });

                if (!isValid) {
                    messageDiv.textContent = 'Please fill in all required fields.';
                    messageDiv.className = 'form-submission-message error';
                    messageDiv.style.display = 'block';
                    return;
                }


                // Simulate form submission
                messageDiv.textContent = 'Thank you! Your submission was successful.';
                messageDiv.className = 'form-submission-message success';
                messageDiv.style.display = 'block';

                formElement.reset(); // Clear the form

                // Hide message after a few seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                    messageDiv.className = 'form-submission-message'; // Reset class
                }, 5000);
            });
        }
    }

    handleFormSubmit(sellForm, 'form-submission-message');
    handleFormSubmit(contactForm, 'contact-form-submission-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                console.log(`Newsletter subscription for: ${emailInput.value}`);
                alert(`Thank you for subscribing, ${emailInput.value}! (This is a demo)`);
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }


    // --- Price Chart (Chart.js) ---
    let priceChart; // Declare chart variable in a broader scope
    if (priceChartCanvas) {
        // Sample data (replace with actual data)
        const cropNames = ['Maize', 'Rice (Paddy)', 'Wheat', 'Lentils'];
        const lastMonthPrices = [22, 28, 30, 90];
        const currentPrices = [25, 32, 31, 95];

        // Check if Chart.js is loaded
        if (typeof Chart !== 'undefined') {
            const ctx = priceChartCanvas.getContext('2d');
            priceChart = new Chart(ctx, {
                type: 'line', // Can be 'bar', 'line', etc.
                data: {
                    labels: cropNames,
                    datasets: [
                        {
                            label: 'Last Month (NPR/kg)',
                            data: lastMonthPrices,
                            borderColor: 'rgba(56, 102, 65, 0.6)', // Primary color with opacity
                            backgroundColor: 'rgba(56, 102, 65, 0.1)',
                            borderWidth: 2,
                            tension: 0.3, // Makes the line curved
                            fill: true,
                        },
                        {
                            label: 'Current (NPR/kg)',
                            data: currentPrices,
                            borderColor: 'rgba(252, 163, 17, 0.9)', // Secondary color
                            backgroundColor: 'rgba(252, 163, 17, 0.2)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false, // Start y-axis near lowest data point
                            title: {
                                display: true,
                                text: 'Price (NPR per kg)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Crop Type'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        } else {
            console.warn('Chart.js is not loaded. Price chart cannot be displayed.');
            const chartContainer = document.querySelector('.chart-container');
            if(chartContainer) {
                chartContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Price chart could not be loaded. Please ensure Chart.js is included.</p>';
            }
        }
    }

    // --- Dynamic Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Update Weather Date ---
    if (weatherDate) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        weatherDate.textContent = today.toLocaleDateString('en-US', options);
        // You could also fetch real weather data here using an API
    }

    // --- Scroll Animations (Intersection Observer) ---
    const animatedSections = document.querySelectorAll('.animated-section');
    if (animatedSections.length > 0 && "IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: stop observing once animated
                }
            });
        }, {
            rootMargin: "0px 0px -100px 0px" // Trigger when 100px from bottom of viewport
        });

        animatedSections.forEach(section => {
            // Add the class initially for JS to pick up
            // The CSS handles the initial state (opacity 0, transform)
            // section.classList.add('animated-section'); // Already in HTML, but good practice if dynamically adding
            sectionObserver.observe(section);
        });
    } else if (animatedSections.length > 0) {
        // Fallback for older browsers or if IntersectionObserver is not supported
        // Simply make them visible (or implement a simpler scroll listener)
        animatedSections.forEach(section => {
            section.classList.add('is-visible');
        });
    }

    // --- Dynamic Crop Variety Options (Example for Sell Form) ---
    const cropTypeSelect = document.getElementById('crop-type');
    const cropVarietySelect = document.getElementById('crop-variety');

    if (cropTypeSelect && cropVarietySelect) {
        const cropVarieties = {
            maize: ['Yellow Hybrid', 'White Hybrid', 'Local Yellow', 'Other'],
            rice: ['Basmati', 'Mansuli', 'Sona Masuri', 'Jeera Masino', 'Other'],
            wheat: ['HD-2967', 'Annapurna-1', 'PBW-343', 'Local White', 'Other'],
            lentils: ['Masoor (Red Lentil)', 'Moong (Green Gram)', 'Chana (Chickpea)', 'Other'],
            other: ['Please specify in message']
        };

        cropTypeSelect.addEventListener('change', function() {
            const selectedCrop = this.value;
            cropVarietySelect.innerHTML = '<option value="">-- Select Variety --</option>'; // Clear previous options

            if (selectedCrop && cropVarieties[selectedCrop]) {
                cropVarieties[selectedCrop].forEach(variety => {
                    const option = document.createElement('option');
                    option.value = variety.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = variety;
                    cropVarietySelect.appendChild(option);
                });
                cropVarietySelect.disabled = false;
            } else {
                cropVarietySelect.disabled = true;
            }
        });
        // Initialize with disabled state if no crop is selected
        cropVarietySelect.disabled = true;
    }

}); // End DOMContentLoaded
