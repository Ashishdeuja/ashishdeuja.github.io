
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

        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const message = formData.get("message");

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