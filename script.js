"use strict";

///////////////////////////////////////

const footer = document.querySelector('.footer')

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

//ham-menu
const hamMenu = document.querySelector('.ham-menu')
const offScreenMenu = document.querySelector(".off-screen-menu");
hamMenu.addEventListener('click', function(){
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active')
})


const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  "This website uses cookies to offer you the most relevant information. By continuing to browse the website, you are agreeing to use our site cookies.";

footer.append(message);
