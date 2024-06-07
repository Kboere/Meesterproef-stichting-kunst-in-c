const scrollHeader = document.querySelector("header");
const nav = document.querySelector("nav");
const menu = document.getElementById("mobileMenu");
const menuUl = document.querySelector("#mobileMenu ul");
const hamburger = document.querySelector(".hamburger");
const logo = document.querySelector(".logo svg");
const darkmodeLamp = document.getElementById("lamp-svgrepo-com");
const darkmodeLampLine = document.querySelector("#Group_6 #Path_79");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1) {
    // Adjust this value based on when you want the color to change
    logo.classList.add("active");
    scrollHeader.classList.add("active");
    menuUl.classList.add("active");
    darkmodeLamp.classList.add("active");
    darkmodeLampLine.classList.add("active");
  } else {
    logo.classList.remove("active");
    scrollHeader.classList.remove("active");
    menuUl.classList.remove("active");
    darkmodeLamp.classList.remove("active");
    darkmodeLampLine.classList.remove("active");
  }
});

function toggleMenu() {
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
}

hamburger.addEventListener("click", () => {
  if (hamburger.classList.contains("active")) {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }

  toggleMenu();
});

function initializeGSAPScroll() {
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

      if (!sectionPin) {
        return;
      }

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
}

// Call the function on the necessary pages
initializeGSAPScroll();
