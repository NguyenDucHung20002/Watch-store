const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");

signupBtn.onclick = function (e) {
  e.preventDefault();
  formBx.classList.add("active");
};
