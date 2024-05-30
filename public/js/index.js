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

gsap.registerPlugin(ScrollTrigger);

(function($) {
  $(document).ready(function() {
    initialiseApp();

    function initialiseApp() {
      initialiseGSAPScrollTriggerPinningHorizontal();
      initialiseLenisScroll();
    }

    function initialiseGSAPScrollTriggerPinningHorizontal() {
      let sectionPin             =   document.querySelector('#section_pin');

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

      var imageWrappers = sectionPin.querySelectorAll('.image_wrapper');

      imageWrappers.forEach(imageWrapper => {
        var imageWrapperID = imageWrapper.id;

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
        duration: 1.2
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  });
}) (jQuery);
