// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Typing animation
    initTypingAnimation();
    
    // Smooth scrolling
    initSmoothScroll();
    
    // Portfolio filtering
    initPortfolioFilter();
    
    // Portfolio modal
    initPortfolioModal();
    
    // Form handling
    initContactForm();
    
    // Animations on scroll
    initScrollAnimations();
    
    // Statistics counter
    initStatsCounter();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Développeur Full Stack',
        'Expert JavaScript',
        'Créateur d\'expériences web',
        'Développeur React & Node.js'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Smooth scrolling
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio filtering
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// Portfolio modal
function initPortfolioModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const projectBtns = document.querySelectorAll('[data-project]');
    
    const projects = {
        1: {
            title: 'Dashboard Analytics',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Une application de tableau de bord complète pour l\'analyse de données en temps réel. Interface moderne avec graphiques interactifs et métriques personnalisables.',
            technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSockets'],
            liveUrl: '#',
            githubUrl: '#'
        },
        2: {
            title: 'E-commerce Platform',
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Plateforme e-commerce complète avec gestion des produits, panier, paiements sécurisés et interface d\'administration avancée.',
            technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
            liveUrl: '#',
            githubUrl: '#'
        },
        3: {
            title: 'Mobile Banking App',
            image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Application bancaire mobile sécurisée avec gestion des comptes, virements, historique des transactions et notifications push.',
            technologies: ['React Native', 'Express.js', 'JWT', 'SQLite', 'Redux'],
            liveUrl: '#',
            githubUrl: '#'
        },
        4: {
            title: 'Task Management',
            image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
            description: 'Outil de gestion de tâches collaboratif avec tableaux Kanban, assignation d\'équipes et suivi de progression en temps réel.',
            technologies: ['Vue.js', 'Vuex', 'Firebase', 'Vuetify', 'PWA'],
            liveUrl: '#',
            githubUrl: '#'
        }
    };

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                // Update modal content
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-image').src = project.image;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-live-btn').href = project.liveUrl;
                document.getElementById('modal-github-btn').href = project.githubUrl;
                
                // Update technologies
                const techStack = document.getElementById('modal-tech-stack');
                techStack.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'feature';
                    span.textContent = tech;
                    techStack.appendChild(span);
                });
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Animate skill bars
function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    const targetWidth = progressBar.getAttribute('data-width');
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
    }, 300);
}

// Statistics counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
        
        animated = true;
    }

    // Trigger animation when stats section is visible
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
        if (!document.querySelector('.scroll-to-top')) {
            createScrollToTopButton();
        }
    } else {
        const btn = document.querySelector('.scroll-to-top');
        if (btn) {
            btn.remove();
        }
    }
});

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: var(--transition-base);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.background = 'var(--primary-dark)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.background = 'var(--primary-color)';
    });
    
    document.body.appendChild(btn);
}