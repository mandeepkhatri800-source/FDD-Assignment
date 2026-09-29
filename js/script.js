/**
 * LBEF/APU Hackathon 2026 - Client-Side Interactivity
 * Written in vanilla JS, designed for ease of understanding and presentation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Navigation & Hamburger Menu
    // ==========================================
    const hamburger = document.getElementById('hamburgerToggle');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon animation states if desired
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });


    // ==========================================
    // 2. Countdown Timer (Homepage)
    // ==========================================
    const countdownContainer = document.getElementById('countdownGrid');
    if (countdownContainer) {
        // Set event date: October 24, 2026 09:00:00 AM (Nepalese Time / UTC offset +5:45)
        const eventDate = new Date('October 24, 2026 09:00:00').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference <= 0) {
                // Event started
                if (document.getElementById('countdownTitle')) {
                    document.getElementById('countdownTitle').textContent = "HACKATHON IS NOW LIVE!";
                }
                countdownContainer.style.display = 'none';
                clearInterval(timerInterval);
                return;
            }

            // Calculations for days, hours, minutes, and seconds
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Output the results
            const daysEl = document.getElementById('timerDays');
            const hoursEl = document.getElementById('timerHours');
            const minutesEl = document.getElementById('timerMinutes');
            const secondsEl = document.getElementById('timerSeconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        // Run immediately then every second
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }


    // ==========================================
    // 3. Challenge Filtering (Challenges Page)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');

    if (filterButtons.length > 0 && challengeCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');

                const selectedCategory = button.getAttribute('data-filter');

                // Filter card logic
                challengeCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }


    // ==========================================
    // 4. Registration Form Validation (Register Page)
    // ==========================================
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop form submission to server

            // Fetch alerts elements
            const successAlert = document.getElementById('successAlert');
            const errorAlert = document.getElementById('errorAlert');

            // Hide previous alerts
            successAlert.style.display = 'none';
            errorAlert.style.display = 'none';

            // Gather inputs
            const teamName = document.getElementById('teamName').value.trim();
            const leaderName = document.getElementById('leaderName').value.trim();
            const studentId = document.getElementById('studentId').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const memberCount = document.getElementById('memberCount').value;
            const category = document.getElementById('category').value;
            const projectIdea = document.getElementById('projectIdea').value.trim();
            const termsCheckbox = document.getElementById('termsCheckbox').checked;

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation checks
            if (!teamName) {
                showError("ERROR: Please enter your Team Name.");
                return;
            }
            if (!leaderName) {
                showError("ERROR: Please enter Team Leader's Name.");
                return;
            }
            if (!studentId) {
                showError("ERROR: Please enter a valid Student ID.");
                return;
            }
            if (!email || !emailRegex.test(email)) {
                showError("ERROR: Please enter a valid email address.");
                return;
            }
            if (!phone) {
                showError("ERROR: Please enter a phone number.");
                return;
            }
            if (memberCount < 2 || memberCount > 4) {
                showError("ERROR: Team size must be between 2 and 4 members.");
                return;
            }
            if (!category) {
                showError("ERROR: Please select a challenge category.");
                return;
            }
            if (!projectIdea) {
                showError("ERROR: Please provide a brief project idea.");
                return;
            }
            if (!termsCheckbox) {
                showError("ERROR: You must agree to the Terms & Conditions.");
                return;
            }

            // Success state - Show alert
            successAlert.textContent = "SUCCESS: Registration submitted successfully! (Demo Mode - No data stored)";
            successAlert.style.display = 'block';
            
            // Smooth scroll to top of form to see alert
            registerForm.scrollIntoView({ behavior: 'smooth' });

            // Reset form
            registerForm.reset();
        });

        // Helper to display error messages
        function showError(message) {
            const errorAlert = document.getElementById('errorAlert');
            errorAlert.textContent = message;
            errorAlert.style.display = 'block';
            registerForm.scrollIntoView({ behavior: 'smooth' });
        }
    }


    // ==========================================
    // 5. FAQ Accordion (FAQ Page)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const parent = question.parentElement;

                // Close other items if one is opened
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });

                // Toggle current item
                parent.classList.toggle('active');
            });
        });
    }


    // ==========================================
    // 6. Gallery Lightbox Modal (Gallery Page)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    if (galleryItems.length > 0 && modal && modalImage && modalCaption && modalClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-overlay h3').textContent;
                const category = item.querySelector('.gallery-overlay span').textContent;

                modal.style.display = 'flex';
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalCaption.textContent = `${title} (${category})`;
            });
        });

        // Close modal when close button is clicked
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }


    // ==========================================
    // 7. Contact Form Confirmation (Contact Page)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const successAlert = document.getElementById('contactSuccess');
            const errorAlert = document.getElementById('contactError');

            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !subject || !message) {
                if (errorAlert) {
                    errorAlert.textContent = "ERROR: Please fill in all fields.";
                    errorAlert.style.display = 'block';
                }
                return;
            }

            if (successAlert) {
                successAlert.textContent = "Thank you! Your message has been sent successfully. We will get back to you shortly.";
                successAlert.style.display = 'block';
            }
            contactForm.reset();
        });
    }


    // ==========================================
    // 8. Feedback Form Confirmation (Feedback Page)
    // ==========================================
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const successAlert = document.getElementById('feedbackSuccess');
            const errorAlert = document.getElementById('feedbackError');

            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            const name = document.getElementById('feedbackName').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked');
            const experience = document.getElementById('experience').value;
            const comments = document.getElementById('comments').value.trim();

            if (!rating || !experience || !comments) {
                if (errorAlert) {
                    errorAlert.textContent = "ERROR: Please complete the required feedback fields.";
                    errorAlert.style.display = 'block';
                }
                return;
            }

            if (successAlert) {
                successAlert.textContent = `Thank you ${name ? name : 'Valued Participant'}! Your feedback has been submitted successfully.`;
                successAlert.style.display = 'block';
            }
            feedbackForm.reset();
        });
    }
});
