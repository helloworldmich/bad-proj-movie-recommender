document.addEventListener("DOMContentLoaded", async function () {
  let navStr = `
    <nav class="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
            <a class="navbar-brand" href="index.html">
            <img src="assets/img/logo.png" alt="logo">
            </a>
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                    <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item" id="profile">
                     </li>
                     <li class="nav-item" id='reviews-per-user'>
                     <a class="nav-link" href="reviewsPerUser.html">Login for Review History</a>
                      </li>
                  <li class="nav-item"  id='reviews-per-user-loggedin'>
                  </li>
                    <li class="nav-item" id="log-in">
                    <a class="nav-link" href="userLogin.html">Log-in</a>
                    </li>
                    <li class="nav-item" id="log-out">
                    <a class="nav-link" href="">Log-out</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input id="search-box" class="form-control mr-sm-2" type="text" placeholder="Search">
                <span id="search-button" class="search-icon"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span>
              </form>
            </div>
        </div>
  </nav>
      `;
  document.querySelector("#nav-placeholder").innerHTML = navStr;

  const resp = await fetch("/get-username");
  resp.json().then((data) => {
    let isLoggedIn = data.result;
    let username = data.username;
    if (isLoggedIn) {
      const userBox = document.createElement("a");
      userBox.classList.add("nav-link");
      userBox.href = "index.html";
      userBox.textContent = `${username}`;
      document.querySelector("#profile").appendChild(userBox);
      document.getElementById("log-in").style.display = "none";

      const reviewHistoryBox = document.createElement("a"); //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
      reviewHistoryBox.classList.add("nav-link"); //nav-link:  reviewsPerUser.html
      reviewHistoryBox.href = "reviewsPerUser.html";
      reviewHistoryBox.textContent = "Your Review History";
      document
        .querySelector("#reviews-per-user-loggedin")
        .appendChild(reviewHistoryBox);
      document.getElementById("reviews-per-user").style.display = "none";
    } else {
      document.getElementById("log-out").style.display = "none";
      document.getElementById("reviews-per-user-loggedin").style.display =
        "none";
    }
  });
  $("#log-out").click(async function () {
    console.log("You are logged out");
    const resp = await fetch("/logout");
    window.location = "./index.html";
  });
});

//
window.onload = function () {
  const searchParams = new URLSearchParams(window.location.search);
  const errMessage = searchParams.get("error");

  if (errMessage) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert", "alert-danger");
    alertBox.textContent = "Invalid username or password";
    document.querySelector("#error-message").appendChild(alertBox);
  }
  // else{
  //     document.querySelector('#error-message').innerHTML = "Invalid username or password";
  // }
  initLoginForm();
};

async function initLoginForm() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formObject = {};
    formObject.username = form.username.value;
    formObject.password = form.password.value;
    form.reset();
    const resp = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });

    respStatus = resp.status;
    console.log(resp);
    if (respStatus === 200) {
      window.location = "/index.html";
      console.log("success login");
    } else if (respStatus === 401) {
      // const errMessage = (await resp.json()).message
      console.log("failed login");
    }
  });
}
