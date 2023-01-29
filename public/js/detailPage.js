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
      document.getElementById("log-out").style.display = "none";
      document.getElementById("reviews-per-user").style.display = "none";
    }
  });
  $("#log-out").click(async function () {
    console.log("You are logged out");
    const resp = await fetch("/logout");
    window.location = "./index.html";
  });
});

///
async function loadReviewData() {
  // fetch -> HTTP Request (Method: GET + Path: /shops)
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  movieId = url.searchParams.get("movieId");
  console.log(movieId);
  const resp = await fetch(`/getDetail/${movieId}`);
  const details = (await resp.json()).data;
  console.log(details);

  var imageURL = details[0].imageURL.slice(2, -2);
  if (imageURL == "") {
    imageURL = "../assets/img/movie.jpg";
  }

  htmlStr = `
      <div class="col-md-8 col-md-offset-2 col-xs-12">
			<div class="mainheading">
				<h1 class="posttitle">Movie Title: ${details[0].title}</h1>
			</div>

			<img class="featured-image img-fluid" src="${imageURL}" alt="">

			<div class="article-post">
				<p> Movie Description: ${details[0].description.slice(2, -2)}</p>
			</div>

   `;
  htmlStr2 = " <h1> Reviews</h1>";
  for (const detail of details) {
    var reviewText = detail.reviewText;
    var reviewerName = detail.reviewerName;
    if (reviewText == null) {
      reviewerName = "Ramsey";
      reviewText = "It's So Raw It's Still Got It's Wool On it!";
    }

    console.log(detail);
    htmlStr2 += `
        <div> 
        <h3> ${reviewerName}</h3>
        <p> ${reviewText}</p>

        `;
  }

  document.querySelector(".detail-container").innerHTML = htmlStr;
  document.querySelector(".review-container").innerHTML = htmlStr2;
}

loadReviewData();
