const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const getLogin = $(".get-login");
function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}
const handleRegister = async () => {
  const { email } = getSearchParameters();
  const response = await fetch(`${http}verify/${email}`);
  const getRegister = await response.json();
  if (getRegister.success) register(getRegister.data);
};
handleRegister();
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
        console.log("response:", response);
        if (response.success) {
          getLogin.removeAttribute("disabled");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

window.addEventListener("load", function () {
  getLogin.addEventListener("click", function () {
    window.location.replace("../user.html");
  });
});
