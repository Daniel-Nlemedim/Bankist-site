"use strict";

///////////////////////////////////////
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
// smooth scroll
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////
//page navigation with smooth scroll
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////
//operations components
const tabs = document.querySelectorAll(".operations__tab"); //tab btn
const tabsContainers = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
