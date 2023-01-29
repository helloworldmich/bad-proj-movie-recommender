document.addEventListener("DOMContentLoaded", async function () {
  console.log("123");
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
                    <a class="nav-link" href="reviewsPerUser.html">Your Review History</a>
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

  const resp = await fetch(`/reviewsPerUserRoutes`); //shouldn't hv  /${reviewerID}
  resp.json().then((data) => {
    data = data.data;
    if (resp.status === 200) {
      // shouldn't put inside iLoggedIn, as being able to get data.data means already in
      // let isLoggedIn = data.result;
      // let username = data.username;
      // if (isLoggedIn) {
      //-----------------------------------------------------💛💛💛💛💛💛💛💛💛💛💛 james commented out
      const username = data;
      const userBox = document.createElement("a");
      userBox.classList.add("nav-link");
      userBox.href = "index.html";
      userBox.textContent = `${username}`;
      document.querySelector("#profile").appendChild(userBox);
      document.getElementById("log-in").style.display = "none";
      // document.getElementById("sign-up").style.display = "none";  // for sign up function
      const reviewHistoryBox = document.createElement("a"); //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
      reviewHistoryBox.classList.add("nav-link"); //nav-link:  reviewsPerUser.html
      reviewHistoryBox.href = "reviewsPerUser.html";
      reviewHistoryBox.textContent = "Your Review History";
      document
        .querySelector("#reviews-per-user-loggedin")
        .appendChild(reviewHistoryBox);
      document.getElementById("reviews-per-user").style.display = "none";
    } else {
      //-------------------------------------------------------💛💛💛💛💛💛💛💛💛💛💛 james commented out
      document.getElementById("log-out").style.display = "none";
      document.getElementById("reviews-per-user-loggedin").style.display =
        "none";
    }
  });
  $("#reviews-per-user").click(async function () {
    //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
    console.log("inside reviews-per-user tag");
    const resp = await fetch("/login");
    window.location = "./userLogin.html";
  });
});

///
async function loadReviewData() {
  // fetch -> HTTP Request (Method: GET + Path: /shops)
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  // reviewerID = url.searchParams.get("reviewerID");
  // console.log(reviewerID);
  //   const resp = await fetch(`/getDetail/${movieId}`);
  const resp = await fetch(`/reviewsPerUserRoutes`); //shouldn't hv  /${reviewerID}
  const details = (await resp.json()).data;
  if (resp.status === 200) {
    details.forEach((detail) => {
      // console.log(detail);
      htmlStr = `<div class="col-md-8 col-md-offset-2 col-xs-12">
      <div class="mainheading">
          <h1 class="posttitle">Movie Title: ${detail.title}</h1>
      </div>`;
      console.log(detail.title);
      // for (const detail of details) {
      //   var reviewText = eachReviewEachUser.reviewText;
      //   // var title = details.title;            //💛💛💛💛💛💛💛💛💛💛💛 continue james' work, getting reviewText
      //   console.log(eachReviewEachUser);
      //   htmlStr += `
      //       <div>
      //       <p> ${reviewText}</p>
      //       `;
      // }
    });
    document.querySelector(".review-container-per-user").innerHTML = htmlStr;
  }
  //   var imageURL = details[0].imageURL.slice(2, -2);
  //   if (imageURL == "") {
  //     imageURL = "../assets/img/movie.jpg";
  //   }
}

loadReviewData();
