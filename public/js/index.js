function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('show');
  hamburger.classList.toggle('active');
}

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
  let gsapScrollInitialized = false;

  function checkScreenSize() {
    if (window.innerWidth >= 900 && !gsapScrollInitialized) {
      initialiseApp();
      gsapScrollInitialized = true;
    } else if (window.innerWidth < 900 && gsapScrollInitialized) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsapScrollInitialized = false;
    }
  }

  function initialiseApp() {
    initialiseGSAPScrollTriggerPinningHorizontal();
    initialiseLenisScroll();
  }

  function initialiseGSAPScrollTriggerPinningHorizontal() {
    let sectionPin = document.getElementById('section_pin');

    let containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: '#section_to-pin',
        start: 'top top',
        end: () => "+=" + sectionPin.offsetWidth,
        pin: true,
        scrub: true,
      },
      x: () => -(sectionPin.scrollWidth - document.documentElement.clientWidth) + "px",
      ease: 'none'
    });

    let imageWrappers = sectionPin.querySelectorAll('.image_wrapper');

    imageWrappers.forEach(imageWrapper => {
      let imageWrapperID = imageWrapper.id;
      gsap.to(imageWrapper, {
        scrollTrigger: {
          trigger: imageWrapper,
          start: 'left center',
          end: 'right center',
          containerAnimation: containerAnimation,
          toggleClass: {
            targets: '.' + imageWrapperID,
            className: 'active'
          }
        }
      });
    });
  }

  function initialiseLenisScroll() {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 0.8
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Initial call
  checkScreenSize();

  // Call on resize
  window.addEventListener('resize', function () {
    checkScreenSize();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var filterButton = document.getElementById("filter-button");
  var dropdownContent = document.getElementById("myDropdown");

  filterButton.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.matches('#filter-button')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });
});