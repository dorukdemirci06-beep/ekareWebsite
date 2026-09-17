// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Close menu when clicking on a link
navLinks.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Sticky Header & Active Link on Scroll
const header = document.getElementById("header");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    // Sticky header
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    
    // Active link highlighting
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Form Submission handling
const contactForm = document.getElementById("contactForm");
if(contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Change button text to show success (mock)
        const btn = this.querySelector("button[type='submit']");
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Başvurunuz Alındı!';
        btn.style.background = 'var(--gradient-2)';
        
        // Reset form
        this.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'var(--gradient-1)';
        }, 3000);
    });
}
