const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

signupBtn.onclick = function (e) {
  formBx.classList.add("active");
  wrapperForm.classList.add("active");
};

signinBtn.onclick = function (e) {
  formBx.classList.remove("active");
  wrapperForm.classList.remove("active");
};

window.addEventListener("load", function () {
  const formSignin = $(".signin");
  const formSignup = $(".signup");
  formSignin.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(this.element);
    console.log("username:", username);
    const password = this.element["password"].value;
    console.log("password:", password);
  });

  formSignup.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = this.element["username"].value;
    console.log("username:", username);
    const password = this.element["password"].value;
    console.log("password:", password);
  });
});
