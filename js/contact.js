
document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      // Reset error messages
      resetErrorMessages();
      
      // Validate form
      let isValid = true;
      
      if (!validateField(name, 'name-error', 'Name is required', value => value.trim().length >= 2, 'Name must be at least 2 characters')) {
        isValid = false;
      }
      
      if (!validateField(email, 'email-error', 'Email is required', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Please enter a valid email address')) {
        isValid = false;
      }
      
      if (!validateField(subject, 'subject-error', 'Subject is required', value => value.trim().length >= 5, 'Subject must be at least 5 characters')) {
        isValid = false;
      }
      
      if (!validateField(message, 'message-error', 'Message is required', value => value.trim().length >= 10, 'Message must be at least 10 characters')) {
        isValid = false;
      }
      
      // If form is valid, submit
      if (isValid) {
        // Disable form elements
        setFormLoading(true);
        
        // Simulate form submission (would be an API call in a real project)
        setTimeout(() => {
          showToast('Your message has been sent! We\'ll get back to you soon.', 'success');
          contactForm.reset();
          setFormLoading(false);
        }, 1500);
      }
    });
    
    // Validate field
    function validateField(field, errorId, requiredMessage, validationFn, validationMessage) {
      if (!field) return true;
      
      const errorElement = document.getElementById(errorId);
      
      if (!field.value.trim()) {
        if (errorElement) {
          errorElement.textContent = requiredMessage;
        }
        field.classList.add('error');
        return false;
      } else if (validationFn && !validationFn(field.value)) {
        if (errorElement) {
          errorElement.textContent = validationMessage;
        }
        field.classList.add('error');
        return false;
      }
      
      return true;
    }
    
    // Reset error messages
    function resetErrorMessages() {
      document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
      });
      
      document.querySelectorAll('input, textarea').forEach(el => {
        el.classList.remove('error');
      });
    }
    
    // Set form loading state
    function setFormLoading(isLoading) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      if (submitButton) {
        if (isLoading) {
          submitButton.textContent = 'Sending...';
          submitButton.disabled = true;
        } else {
          submitButton.textContent = 'Send Message';
          submitButton.disabled = false;
        }
      }
      
      // Disable/enable form inputs
      contactForm.querySelectorAll('input, textarea').forEach(el => {
        el.disabled = isLoading;
      });
    }
  });
  