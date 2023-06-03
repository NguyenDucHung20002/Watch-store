import spinner from "./spinner.js";
import { alertFullfill, alertFail } from "./alert.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
let date = "";
spinner(true);
async function changePassword(password, newPassword) {
  try {
    spinner(true);
    await fetch(`${http}changepassword`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authentication: User?.token,
      },
      body: JSON.stringify({ password, newPassword }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.success) {
          alertFullfill("Password changed");
          localStorage.removeItem("loginUser");
        } else {
          alertFail(response?.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(spinner(false));
  } catch (error) {}
}

export default function Password() {
  const userId = $(".userid .data");
  const userName = $(".username .data");
  const email = $(".useremail .data");
  userName.innerHTML = User?.data.username;
  userId.innerHTML = User?.data.idUser;
  email.innerHTML = User?.data.email;
  const formChangePass = $(".change-password");
  const btnSendEmail = $(".btn-send-email");
  btnSendEmail.addEventListener("click", function (e) {
    e.preventDefault();
    date = new Date().getTime();
    let ebody = `
    <h1>Hello ${User?.data.username}</h1>
    <br>
    <h1>Your code is ${date}</h1>
    `;

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "hungduc2102@gmail.com",
      Password: "64723179CC01B59B16647A572C0E57E96783",
      To: User?.data.email,
      From: "hungduc2102@gmail.com",
      Subject: "Here is the code to change your password!",
      Body: ebody,
    }).then((message) => {
      if (message === "OK") {
        alertFullfill(`Sending code to ${User?.data.email}`);
      } else {
        alertFail(`Can not send to ${User?.data.email}`);
      }
    });
  });

  formChangePass.addEventListener("submit", function (e) {
    e.preventDefault();
    const currentPassword = this.elements["oldPassword"].value;
    const verifyEmail = this.elements["verifyEmail"].value;
    const newPassword = this.elements["newPassword"].value;
    const comfirm = this.elements["reenterPassword"].value;
    if (verifyEmail != date) {
      alertFail("Invalid Verify Code!");
    } else if (comfirm !== newPassword) {
      alertFail("Password is diffirent form Comfirm");
    } else {
      changePassword(currentPassword, newPassword);
    }
  });
}
