
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetElement.offsetTop - 60,
              behavior: 'smooth'
          });
      });
  });
  
  // Projects Slider
  const slider = document.querySelector('.projects-slider');
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  
  function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
      });
  }
  
  dots.forEach(dot => {
      dot.addEventListener('click', () => {
          currentIndex = parseInt(dot.getAttribute('data-index'));
          updateSlider();
      });
  });
  
  // Auto slide change
  setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
  }, 5000);
  
  // Form submission
  alertify.set('notifier', 'position', 'top-right');
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const ACCESS_KEY = "cae29069-0cc5-45c0-a740-f6a1767aacf6";
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const message = formData.get("message");
    
        // Validate inputs
        let isValid = true;
        
        // Name validation
        if (!/^[A-Za-z ]{3,}$/.test(name)) {
            document.getElementById('name-error').textContent = 'Please enter a valid name (letters and spaces only, min 3 chars)';
            isValid = false;
        }
        
        // Email validation
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Phone validation (optional but must be valid if provided)
        if (phone && !/^[0-9]{10}$/.test(phone)) {
            document.getElementById('phone-error').textContent = 'Phone number must be 10 digits';
            isValid = false;
        }
        
        // Message validation
        if (message.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (!isValid) {
            alertify.error('Please correct the errors in the form');
            return;
        }
      

        const payload = {
            access_key: ACCESS_KEY,
            subject: "Enquiry From Portfolio Website",
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    alertify.success('Message submitted successfully');
                    const home = document.getElementById('home');
                    if (home) {
                        home.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        window.location.hash = '#home';  
                    } 
                } else {
                    alertify.error('Submission failed', 2);
                }
            })
            .catch(error => {
                sending.dismiss();
                console.error(err);
                alertify.error('Something went wrong. Please try again later.', 8);
            })
            .then(() => {
                form.reset();
            });
    });
