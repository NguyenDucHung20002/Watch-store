const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");

signupBtn.onclick = function (e) {
  formBx.classList.add("active");
};

signinBtn.onclick = function (e) {
  formBx.classList.remove("active");
};
