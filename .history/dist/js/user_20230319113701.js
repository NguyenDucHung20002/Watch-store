const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");
const formSignin = $(".get-signin");
const formSignup = $(".get-signup");

const checkRegister = JSON.parse(localStorage.getItem("register"));

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

console.log(getSearchParameters());

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
        localStorage.setItem("loginUser", JSON.stringify(data));
        window.location.replace("./index.html");
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
      .then((response) => {
        if (!response.success) {
          alertDanger.children[0].textContent = `${response.message}`;
          alertDanger.classList.add("get-active");
          setTimeout(() => {
            alertDanger.classList.remove("get-active");
          }, 3000);
        } else {
          signinBtn.click();
          formSignin.elements["email"].value = data.email;
          formSignin.elements["password"].value = data.password;
        }
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
  signupBtn.onclick = function (e) {
    formBx.classList.add("active");
    wrapperForm.classList.add("active");
  };

  signinBtn.onclick = function (e) {
    formBx.classList.remove("active");
    wrapperForm.classList.remove("active");
  };
  if (checkRegister) {
    signupBtn.click();
    localStorage.removeItem("register");
  }
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

  formSignup.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const username = this.elements["username"].value;
    const password = this.elements["password"].value;
    const confirm = this.elements["confirm"].value;
    if (password === confirm) {
      const data = {
        email,
        username,
        password,
      };
      register(data);
    } else {
      alertDanger.children[0].textContent =
        "The password doesn't match the comfirm";
      alertDanger.classList.add("get-active");
      setTimeout(() => {
        alertDanger.classList.remove("get-active");
      }, 3000);
    }
  });
});
