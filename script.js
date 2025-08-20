
// Dynamic data for vector showcase
const vectors = [
  {
    id: 1,
    title: "Solar Panel Vector",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    description: "Efficient solar solutions"
  },
  {
    id: 2,
    title: "Eco Cleaning Vector",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    description: "Green cleaning methods"
  },
  {
    id: 3,
    title: "Green Solutions Vector",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    description: "Sustainable practices"
  }
];

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderVectors();
  setupSmoothScrolling();
  setupFormHandling();
  addAnimations();
  setupMobileMenu();
});

// Render services dynamically
function renderServices() {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = services.map(service => `
    <div class="card" data-service-id="${service.id}">
      <img src="${service.image}" alt="${service.title}">
      <h3>${service.icon} ${service.title}</h3>
      <p>${service.description}</p>
      <button class="service-btn" onclick="showServiceDetails(${service.id})">Learn More</button>
    </div>
  `).join('');
}

// Render vectors dynamically
function renderVectors() {
  const vectorsContainer = document.querySelector('.vectors');
  if (!vectorsContainer) return;

  vectorsContainer.innerHTML = vectors.map(vector => `
    <div class="vector-item" data-vector-id="${vector.id}">
      <img src="${vector.image}" alt="${vector.title}">
      <p>${vector.description}</p>
    </div>
  `).join('');
}

// Show service details (placeholder for future modal)
function showServiceDetails(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (service) {
    alert(`Service: ${service.title}\n\n${service.description}\n\nContact us for more information!`);
  }
}

// Modal functionality
function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  document.body.style.overflow = ''; // Restore scrolling
  modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    const id = e.target.id.split('-')[1];
    closeModal(id);
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      const id = activeModal.id.split('-')[1];
      closeModal(id);
    }
  }
});

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    });
  });
}

// Setup mobile menu
function setupMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
}

// Setup form handling
function setupFormHandling() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual formspree handling)
    setTimeout(() => {
      showSuccessMessage();
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Show success message
function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-content">
      <h3>✅ Thank you!</h3>
      <p>Your request has been sent successfully. We'll get back to you soon!</p>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
    </div>
  `;
  
  document.body.appendChild(successDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentElement) {
      successDiv.remove();
    }
  }, 5000);
}

// Add animations and interactive effects
function addAnimations() {
  // Add scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Add hover effects to cards
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.card')) {
      e.target.closest('.card').classList.add('card-hover');
    }
  });
  
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.card')) {
      e.target.closest('.card').classList.remove('card-hover');
    }
  });
}

// Add dynamic navbar highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');
  
  let current = '';
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