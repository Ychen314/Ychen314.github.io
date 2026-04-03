document.addEventListener('DOMContentLoaded', () => {
  // Fade-up Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Image Loading Logic
  function checkImage(img) {
    if (img.complete && img.naturalHeight !== 0) {
      showImg(img);
    } else {
      img.onload = () => showImg(img);
    }
  }

  function showImg(img) {
    img.style.display = 'block';
    // Hide placeholders
    const parent = img.parentElement;
    parent.querySelectorAll('.placeholder-icon, .placeholder-text, .screenshot-placeholder-icon, .screenshot-placeholder-text')
          .forEach(el => el.style.display = 'none');
  }

  const pImg = document.getElementById('profileImg');
  if (pImg && pImg.getAttribute('src') !== "") checkImage(pImg);

  document.querySelectorAll('.project-screenshot img').forEach(img => {
    if (img.getAttribute('src') !== "") checkImage(img);
  });

  // --- Carousel Slider Logic ---
  const projectsSlider = document.getElementById('projectsSlider');
  const slideLeftBtn = document.getElementById('slideLeft');
  const slideRightBtn = document.getElementById('slideRight');

  if (projectsSlider && slideLeftBtn && slideRightBtn) {
    // Width of card (320px) + gap (28px)
    const scrollAmount = 348; 

    slideLeftBtn.addEventListener('click', () => {
      projectsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    slideRightBtn.addEventListener('click', () => {
      projectsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
});