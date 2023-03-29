const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");

signupBtn.onclick = function (e) {
  formBx.classList.add("active");
  wrapperForm.classList.add("active");
};

signinBtn.onclick = function (e) {
  formBx.classList.remove("active");
  wrapperForm.classList.remove("active");
};

async function login(data) {
  await fetch("http://localhost:5000/api/login", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        alertDanger.children[0].textContent = `${data.message}`;
        alertDanger.classList.add("get-active");
        setTimeout(() => {
          alertDanger.classList.remove("get-active");
        }, 2000);
      } else {
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alertDanger.classList.add("get-active");
      setTimeout(() => {
        alertDanger.classList.remove("get-active");
      }, 2000);
    });
}

async function register(data) {
  try {
    await fetch("http://localhost:5000/api/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log(error);
    alertDanger.classList.add("get-active");
    setTimeout(() => {
      alertDanger.classList.remove("get-active");
    }, 2000);
  }
}

window.addEventListener("load", function () {
  const formSignin = $(".get-signin");
  const formSignup = $(".get-signup");
  formSignin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const password = this.elements["password"].value;
    const data = {
      email,
      password,
    };

    login(data);
  });

  // formSignup.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   const username = this.elements["username"].value;
  //   console.log("username:", username);
  //   const password = this.elements["password"].value;
  //   console.log("password:", password);

  // });
});
