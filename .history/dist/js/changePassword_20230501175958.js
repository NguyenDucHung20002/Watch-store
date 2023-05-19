import spinner from "./spinner.js";
import { alertFullfill, alertFail } from "./alert.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}
spinner(true);
async function changePassword(password, newPassword) {
  try {
    spinner(true);
    await fetch(`${http}changepassword`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, newPassword }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.success) {
          alertFullfill("Password changed");
        } else {
          alertFail(response?.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
  formChangePass.addEventListener("submit", function (e) {
    e.preventDefault();
    const currentPassword = this.elements["oldPassword"].value;
    const newPassword = this.elements["newPassword"].value;
    const comfirm = this.elements["reenterPassword"].value;
    if (comfirm !== newPassword) {
      alertFail("Password is diffirent form Comfirm");
    } else {
      changePassword(currentPassword, newPassword);
    }
  });
}
