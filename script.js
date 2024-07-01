// Registration Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      let valid = true;
  
      // Simple email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        valid = false;
      }
  
      // Simple password validation
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        valid = false;
      }
  
      if (valid) {
        alert('Form submitted successfully!');
        registrationForm.submit(); // This would actually submit the form
      }
    });
  });
  
  // Product Gallery Image Click Event
  document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery img');
    
    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        alert('Image clicked: ' + this.alt);
      });
    });
  });
  