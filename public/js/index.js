  const menu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");
  const logo = document.querySelector(".logo svg");

//   const hamburgerLi = document.querySelectorAll("#mobileMenu ul li");
//   const hamburgerLiA = document.querySelectorAll("#mobileMenu ul li a");

  function toggleMenu() {
    menu.classList.toggle("show");
    hamburger.classList.toggle("active");
  }

  hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("active")) {
      logo.classList.remove("active");
      menu.style.display = "none";

    } else {
      logo.classList.add("active");
      menu.style.display = "block";
    }

    toggleMenu();
  });
