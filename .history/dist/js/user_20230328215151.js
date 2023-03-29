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
const http = "http://localhost:5000/api/";
const checkRegister = JSON.parse(localStorage.getItem("register"));

async function login(data) {
  await fetch(`${http}login`, {
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
        // const user
        localStorage.setItem(
          "loginUser",
          JSON.stringify({ data: data.data, token: data.token })
        );
        // localStorage.setItem("loginUser", JSON.stringify(data));
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
    await fetch(`${http}register`, {
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
          alertSuccess.children[0].textContent = `Register successfuly`;
          alertSuccess.classList.add("get-active");
          setTimeout(() => {
            alertSuccess.classList.remove("get-active");
          }, 3000);
          signinBtn.click();
          formSignin.elements["email"].value = data.email;
          formSignin.elements["password"].value = data.password;
          fetch(`${http}statistic`)
            .then((data) => data.json())
            .then((data) => {
              if (data.success) {
                const users = data.data[0].users;
                fetch(`${http}statistic`, {
                  method: "POST", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });
              }
            });
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
