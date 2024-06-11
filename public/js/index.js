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
      cleanupGSAP();
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
        invalidateOnRefresh: true, // Recalculate on refresh
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
          },
          invalidateOnRefresh: true // Recalculate on refresh
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

  function cleanupGSAP() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');
  }

  // Initial call
  checkScreenSize();

  // Call on resize
  window.addEventListener('resize', function () {
    checkScreenSize();
    ScrollTrigger.refresh();
  });
});


// document.addEventListener("DOMContentLoaded", function () {
//   var filterButton = document.getElementById("filter-button");
//   var dropdownContent = document.getElementById("myDropdown");

//   filterButton.addEventListener("click", function () {
//     dropdownContent.classList.toggle("show");
//   });

//   // Close the dropdown if the user clicks outside of it
//   window.addEventListener("click", function (event) {
//     if (!event.target.matches('#filter-button')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       for (var i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   });
// });

const dropdownContent = document.querySelector('.dropdown-content');
const dropdownBtn = document.querySelector('.dropdown-btn');

// Filter dropdown menu
function toggleDropdown() {
  dropdownContent.classList.toggle("show-filters");
}

dropdownBtn.addEventListener("click", () => {
  toggleDropdown();
});

// Close filter when clicked outside the filter button
window.onclick = function(e) {
  if (!e.target.matches('.dropdown-btn')) {
    const dropdownItems = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdownItems.length; i++) {
      const openDropdown = dropdownItems[i];
      if (openDropdown.classList.contains('show-filters')) {
        openDropdown.classList.remove('show-filters');
      }
    }
  }
}
