/* ========================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   ======================================== */

// ========================================
// 1. DARK MODE TOGGLE
// ========================================
const darkModeToggle = document.querySelector(".dark-mode-toggle");
const body = document.body;

// Check for saved dark mode preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Save preference
  const theme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// ========================================
// 2. STICKY NAVIGATION & SCROLL EFFECTS
// ========================================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Add scrolled class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active nav link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ========================================
// 3. MOBILE NAVIGATION TOGGLE
// ========================================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !isExpanded);
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ========================================
// 4. SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// 5. SCROLL REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll(".reveal-on-scroll");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 50;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("revealed");
    }
  });
};

// Initial check
revealOnScroll();

// Check on scroll with throttling for performance
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    revealOnScroll();
  });
});

// ========================================
// 6. PROJECT FILTERING
// ========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects with animation
    projectCards.forEach((card, index) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        // Show card with staggered animation
        setTimeout(() => {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.5s ease-out";
        }, index * 50);
      } else {
        // Hide card
        card.classList.add("hidden");
      }
    });
  });
});

// ========================================
// 7. PROJECT MODAL
// ========================================
const modal = document.getElementById("projectModal");
const modalOverlay = modal.querySelector(".modal-overlay");
const modalClose = modal.querySelector(".modal-close");
const modalBody = modal.querySelector(".modal-body");
const expandButtons = document.querySelectorAll(".project-expand");

// Project details data (in production, this could come from an API)
const projectDetails = [
  {
    title: "TaskFlow Dashboard",
    image: "images/project-1.jpg",
    description:
      "A comprehensive project management platform designed for modern teams. TaskFlow combines intuitive kanban boards with powerful analytics and real-time collaboration features.",
    challenge:
      "Creating a system that could handle real-time updates for multiple users while maintaining performance and data consistency.",
    solution:
      "Implemented WebSocket connections with Socket.io for real-time updates, optimistic UI updates for better perceived performance, and PostgreSQL with proper indexing for efficient queries.",
    features: [
      "Real-time collaborative kanban boards",
      "Advanced team analytics and reporting",
      "Custom workflow automation",
      "Time tracking and sprint planning",
      "Integration with popular tools (Slack, GitHub, Jira)",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io", "Redis", "Docker"],
    github: "https://github.com/yourusername/taskflow",
    demo: "https://taskflow-demo.netlify.app",
  },
  {
    title: "FitTrack Mobile",
    image: "images/project-2.jpg",
    description:
      "Cross-platform fitness tracking application that helps users plan workouts, track progress, and connect with a community of fitness enthusiasts.",
    challenge:
      "Designing an app that works seamlessly on both iOS and Android while providing smooth animations and offline functionality.",
    solution:
      "Used React Native for cross-platform development, implemented local-first architecture with Firebase sync, and created custom animations using React Native Reanimated.",
    features: [
      "Customizable workout plans",
      "Progress tracking with charts",
      "Social features and challenges",
      "Offline mode with data sync",
      "Integration with health apps",
    ],
    tech: [
      "React Native",
      "Firebase",
      "TypeScript",
      "Redux",
      "React Native Reanimated",
    ],
    github: "https://github.com/yourusername/fittrack",
    demo: "https://apps.apple.com/fittrack",
  },
  {
    title: "Artisan Marketplace",
    image: "images/project-3.jpg",
    description:
      "E-commerce platform connecting independent artists and makers with customers who value handcrafted, unique products.",
    challenge:
      "Building a scalable platform that handles complex product variations, inventory management, and secure payments while maintaining excellent performance.",
    solution:
      "Leveraged Next.js for server-side rendering and SEO, Stripe for payment processing, and MongoDB for flexible product schema. Implemented image optimization and lazy loading.",
    features: [
      "Multi-vendor marketplace",
      "Advanced product filtering",
      "Secure payment processing",
      "Seller analytics dashboard",
      "Review and rating system",
    ],
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Vercel"],
    github: "https://github.com/yourusername/marketplace",
    demo: "https://artisan-marketplace.vercel.app",
  },
  {
    title: "Aurora UI Kit",
    image: "images/project-4.jpg",
    description:
      "Accessible, customizable component library designed to help teams build beautiful applications faster.",
    challenge:
      "Creating components that are flexible enough for various use cases while maintaining consistency and accessibility standards.",
    solution:
      "Built with React and styled-components for maximum customization. Used Storybook for documentation and visual testing. Implemented comprehensive WCAG 2.1 AA compliance.",
    features: [
      "50+ accessible components",
      "Dark mode support",
      "Customizable theme system",
      "Comprehensive documentation",
      "TypeScript support",
    ],
    tech: ["React", "Storybook", "styled-components", "TypeScript", "Jest"],
    github: "https://github.com/yourusername/aurora-ui",
    demo: "https://aurora-ui.netlify.app",
  },
  {
    title: "WeatherWise",
    image: "images/project-5.jpg",
    description:
      "Beautiful weather dashboard featuring interactive maps, detailed forecasts, and location-based alerts.",
    challenge:
      "Visualizing complex weather data in an intuitive way while ensuring the app works offline as a PWA.",
    solution:
      "Used Vue.js for reactive UI updates, D3.js for custom data visualizations, and service workers for offline functionality. Implemented smart caching strategies.",
    features: [
      "7-day detailed forecasts",
      "Interactive weather maps",
      "Severe weather alerts",
      "Multiple location tracking",
      "Works offline (PWA)",
    ],
    tech: ["Vue.js", "D3.js", "OpenWeather API", "Workbox", "Netlify"],
    github: "https://github.com/yourusername/weatherwise",
    demo: "https://weatherwise-app.netlify.app",
  },
  {
    title: "GreenLeaf Branding",
    image: "images/project-6.jpg",
    description:
      "Complete brand identity system for a sustainable living startup, from logo design to comprehensive brand guidelines.",
    challenge:
      "Creating a visual identity that communicates sustainability and modernity while being versatile across all touchpoints.",
    solution:
      "Developed a flexible logo system with multiple variations, created a cohesive color palette inspired by nature, and built comprehensive brand guidelines.",
    features: [
      "Logo and icon system",
      "Brand color palette",
      "Typography system",
      "Brand guidelines document",
      "Marketing collateral templates",
    ],
    tech: ["Figma", "Adobe Illustrator", "Brand Strategy", "Design Systems"],
    demo: "https://behance.net/gallery/greenleaf",
  },
];

// Open modal
expandButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const projectCard = button.closest(".project-card");
    const projectIndex = parseInt(projectCard.getAttribute("data-project"));
    openModal(projectIndex);
  });
});

function openModal(index) {
  const project = projectDetails[index];

  // Build modal content
  const modalContent = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: var(--border-radius); margin-bottom: var(--spacing-lg);">
            
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: var(--spacing-md); color: var(--color-dark);">
                ${project.title}
            </h2>
            
            <p style="font-size: 1.125rem; color: var(--color-mid); margin-bottom: var(--spacing-xl); line-height: 1.8;">
                ${project.description}
            </p>
            
            <div style="margin-bottom: var(--spacing-xl);">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: var(--spacing-md); color: var(--color-dark);">
                    The Challenge
                </h3>
                <p style="color: var(--color-mid); line-height: 1.8;">
                    ${project.challenge}
                </p>
            </div>
            
            <div style="margin-bottom: var(--spacing-xl);">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: var(--spacing-md); color: var(--color-dark);">
                    The Solution
                </h3>
                <p style="color: var(--color-mid); line-height: 1.8;">
                    ${project.solution}
                </p>
            </div>
            
            <div style="margin-bottom: var(--spacing-xl);">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: var(--spacing-md); color: var(--color-dark);">
                    Key Features
                </h3>
                <ul style="list-style: none; padding-left: 0;">
                    ${project.features
                      .map(
                        (feature) => `
                        <li style="padding: var(--spacing-xs) 0; color: var(--color-mid); position: relative; padding-left: var(--spacing-md);">
                            <span style="position: absolute; left: 0; color: var(--color-primary);">✓</span>
                            ${feature}
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            
            <div style="margin-bottom: var(--spacing-xl);">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: var(--spacing-md); color: var(--color-dark);">
                    Technologies Used
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs);">
                    ${project.tech
                      .map(
                        (tech) => `
                        <span style="padding: 0.5rem 1rem; background: rgba(6, 182, 212, 0.1); color: var(--color-primary); border-radius: 1rem; font-size: 0.875rem; font-weight: 500;">
                            ${tech}
                        </span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            
            <div style="display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
                ${
                  project.github
                    ? `
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Code
                    </a>
                `
                    : ""
                }
                ${
                  project.demo
                    ? `
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                        View Live
                    </a>
                `
                    : ""
                }
            </div>
        </div>
    `;

  modalBody.innerHTML = modalContent;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// ========================================
// 8. FORM VALIDATION & SUBMISSION
// ========================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // add custom validation here if needed

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert("Please enter a valid email address.");
      return;
    }

    //is passed Formspree will handle the submission
  });
}

// ========================================
// 9. PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images
const images = document.querySelectorAll('img[loading="lazy"]');

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ========================================
// 10. ANALYTICS (Optional - Simple Page View Tracking)
// ========================================

// Track page views (replace with your analytics service)
function trackPageView() {
  // Example: Google Analytics
  // if (typeof gtag !== 'undefined') {
  //     gtag('config', 'GA_MEASUREMENT_ID', {
  //         page_path: window.location.pathname
  //     });
  // }

  console.log("Page view tracked:", window.location.pathname);
}

// Track initial page load
trackPageView();

// Track navigation clicks
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(trackPageView, 100);
  });
});

// ========================================
// 11. UTILITIES
// ========================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ========================================
// INITIALIZATION
// ========================================
console.log("Portfolio website loaded successfully!");
console.log("Built with vanilla JavaScript - no frameworks needed! 🚀");
