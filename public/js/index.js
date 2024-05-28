const scrollHeader = document.querySelector('header');
const nav = document.querySelector('nav');
  const menu = document.getElementById("mobileMenu");
  const menuUl = document.querySelector("#mobileMenu ul");
  const hamburger = document.querySelector(".hamburger");
  const logo = document.querySelector(".logo svg");

  window.addEventListener('scroll', () => {
    if (window.scrollY > 1) { // Adjust this value based on when you want the color to change
        logo.classList.add('active');
        scrollHeader.classList.add('active');
        menuUl.classList.add('active');
    } else {
        logo.classList.remove('active');
        scrollHeader.classList.remove('active');
        menuUl.classList.remove('active');
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
