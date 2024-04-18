"use strict";

///////////////////////////////////////
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab"); //tab btn
const tabsContainers = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const showMenuBar = document.querySelector(".menu-button");
const footer = document.querySelector(".footer");
const copyYear = document.querySelector(".copyYear");

//////////////////////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////////////
//sticky navigation
// const initialCoordinates = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > initialCoordinates.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//////////////////////////////////////////////////////
//sticky navigation  with intersectionAPI
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; //destructured the entries

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, obsOption);
headerObserver.observe(header);

//////////////////////////////////////////////////////
//Reveal pages
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; //if entry is not intersecting

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};
const revealOptions = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealSection, revealOptions);
allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//////////////////////////////////////////////////////
//lazy loading
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replacing src with dataset-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const loadOptions = {
  root: null,
  threshold: 0,
};
const imageObserver = new IntersectionObserver(loadImg, loadOptions);

imgTarget.forEach((img) => imageObserver.observe(img));

//////////////////////////////////////////////////////
//menu fade anime
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = 0.5;
      }
      logo.style.opacity = 0.5;
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = 1;
      }
      logo.style.opacity = 1;
    });
  }
});

//////////////////////////////////////////////////////
// smooth scroll(learn more)
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////
//page navigation with smooth scroll using event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////
//operations components
tabsContainers.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); //to get the closest parentNode

  if (!clicked) return;

  //remove active class
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach(function (con) {
    return con.classList.remove("operations__content--active");
  });

  clicked.classList.add("operations__tab--active");

  //activate content areas
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////////////////////
//slider component
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
let curSlide = 0;
const maxSlide = slides.length;
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide)

//////////////////////////////////////////////////////
//sidebar
showMenuBar.addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
});

const hideMenuBar = document.querySelector(".hideSidebar");
hideMenuBar.addEventListener("click", function (e) {
  e.preventDefault();

  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
});

//////////////////////////////////////////////////////
//copyright year updates
const calcYear = function () {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  copyYear.textContent = year;
};
calcYear();
