function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('show');
  hamburger.classList.toggle('active');
}

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
  initialiseApp();

  function initialiseApp() {
    initialiseGSAPScrollTriggerPinningHorizontal();
    initialiseLenisScroll();
  }

  function initialiseGSAPScrollTriggerPinningHorizontal() {
    let sectionPin = document.getElementById('section_pin');

    let containerAnimation = gsap.to(sectionPin, {
      scrollTrigger: {
        trigger: '#section_to-pin',
        start: 0,
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

});
