const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");

signupBtn.onclick = function (e) {
  formBx.classList.add("active");
  wrapperForm.classList.add("active");
};

signinBtn.onclick = function (e) {
  formBx.classList.remove("active");
  wrapperForm.classList.remove("active");
};
