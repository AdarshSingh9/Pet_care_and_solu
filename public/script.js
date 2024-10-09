// script.js

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Check if the link is for an internal section (starts with '#')
      if (this.getAttribute('href').charAt(0) === '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  
  // Toggle Active Class for Navigation Links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Form Validation (if there's a form on any page)
  function validateForm() {
    const form = document.querySelector('form');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;
  
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          valid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = 'green';
        }
      });
  
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  }
  
  validateForm();
  
  fetch('/api/data')
  .then(response => response.json())
  .then(data => {
      console.log(data.message); // Should log "Hello from the backend!"
  })
  .catch(error => console.error('Error:', error));

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
