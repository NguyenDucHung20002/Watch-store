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

async function verifyDate(data) {
  try {
    await fetch(`${http}verifyregister`, {
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
          verifyEmail(data);
          console.log("data:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

async function register(data) {
  try {
    await fetch(`${http}isuserexisted`, {
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
          verifyDate(data);
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

function verifyEmail(data) {
  let ebody = `
    <a style="font-size: 24px;" href="http://127.0.0.1:5500/vevifyUser.html?email=${data?.email}">http://127.0.0.1:5500/vevifyUser.html?email=${data?.email}</a>
    `;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "hungduc2102@gmail.com",
    Password: "64723179CC01B59B16647A572C0E57E96783",
    To: data?.email,
    From: "hungduc2102@gmail.com",
    Subject: "Verify Email with LUX",
    Body: ebody,
  }).then((message) => {
    if (message === "OK") {
      localStorage.setItem("registerUser", JSON.stringify(data));
      alert(`We've sent a confirmation to ${data?.email}`);
    }
  });
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
