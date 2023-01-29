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
                  </li>
                  <li class="nav-item" id="profile">
                   </li>
                   <li class="nav-item active">
                    <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
                    </li>
                  <li class="nav-item"  id='reviews-per-user'>
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

  const resp = await fetch("/get-username"); // fetch --->app.ts
  resp.json().then((data) => {
    let isLoggedIn = data.result;
    let username = data.username;
    if (isLoggedIn) {
      const userBox = document.createElement("a"); //jacki
      userBox.classList.add("nav-link");
      userBox.href = "index.html";
      userBox.textContent = `${username}`;
      document.querySelector("#profile").appendChild(userBox);
      document.getElementById("log-in").style.display = "none";
      // document.getElementById("sign-up").style.display = "none";

      // let reviewerID = "A3478QRKQDOPQ2"; //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
      const reviewHistoryBox = document.createElement("a");
      reviewHistoryBox.classList.add("nav-link"); //nav-link:  reviewsPerUser.html
      reviewHistoryBox.href = `reviewsPerUser.html`;
      reviewHistoryBox.textContent = "Your Review History";
      document
        .querySelector("#reviews-per-user-loggedin")
        .appendChild(reviewHistoryBox);
      document.getElementById("reviews-per-user").style.display = "none";
      // document.getElementById("reviews-per-user").innerHTML(reviewHistoryBox);
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

///

///

async function loadRecommended() {
  //var url = new URL("http://127.0.0.1:8080/get-username");
  var userResp = await fetch("/get-username");
  userResp = await userResp.json();
  const isLoggedIn = userResp.result;
  const reviewerId = userResp.reviewerId;

  if (!isLoggedIn) {
    return;
  }

  console.log("fetching", `/recommend/${reviewerId}`);
  const recomResp = await fetch(`/recommend/${reviewerId}`);
  const recommendedMovies = (await recomResp.json()).data;

  let recommendStr = "";

  for (const recommendedMovie of recommendedMovies) {
    var imageURL = recommendedMovie.imageURL.slice(2, -2);
    if (imageURL == "") {
      imageURL = "../assets/img/movie.jpg";
    }
    recommendStr += `
    <div class="card">
    <div class="row">
      <div class="col-md-5 wrapthumbnail">
      <a href="detailPage.html?movieId=${recommendedMovie.id}">
       <img class="img-fluid" src="${imageURL}" alt="">
      </a>
      </div>
      <div class="col-md-7">
        <div class="card-block">
          <h2 class="card-title"><a href="detailPage.html?movieId=${
            recommendedMovie.id
          }">Movie Title: ${recommendedMovie.title}</a></h2>
          <h4 class="card-text">${recommendedMovie.description.slice(
            2,
            -2
          )}</h4>
          
        </div>
      </div>
    </div>
  </div>

  `;
  }

  document.querySelector(".recommend-container").innerHTML = recommendStr;
}
loadRecommended();

let loadTime = 0;

async function loadMovieData() {
  // fetch -> HTTP Request (Method: GET + Path: /shops)
  //var url = new URL("http://127.0.0.1:8080/movies");
  //var params = [["index", loadTime]];
  //url.search = new URLSearchParams(params).toString();
  //const resp = await fetch(url);

  const resp = await fetch("/movies?index=" + loadTime);

  const movies = (await resp.json()).data;

  htmlStr = "";
  for (const movie of movies) {
    var imageURL = movie.imageURL.slice(2, -2);
    if (imageURL == "") {
      imageURL = "../assets/img/movie.jpg";
    }

    htmlStr += `<div class="card col-md-12">
  
        <a href="detailPage.html?movieId=${movie.id}">
          <img class="img-fluid" src="${imageURL}" alt="">
        </a>
        <div class="card-block">
          <h2 class="card-title"><a href="detailPage.html?movieId=${
            movie.id
          }">${movie.title}</a></h2>
          <h4 class="card-text">${movie.description.slice(2, -2)}</h4>
        </div>
      </div>`;
  }

  document.querySelector("#movie-container").innerHTML = htmlStr;
  loadTime = loadTime + 1;
}

loadMovieData();

$(window).scroll(async function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    // var url = new URL("http://127.0.0.1:8080/movies");
    // var params = [["index", loadTime]];
    // url.search = new URLSearchParams(params).toString();
    // const resp = await fetch(url);
    const resp = await fetch("/movies?index=" + loadTime);

    const movies = (await resp.json()).data;
    htmlStr = "";
    for (const movie of movies) {
      htmlStr += `<div class="card">
        <a href="detailPage.html?movieId=${movie.id}">
          <img class="img-fluid" src="${movie.imageURL.slice(2, -2)}" alt="">
        </a>
        <div class="card-block">
          <h2 class="card-title"><a href="detailPage.html?movieId=${
            movie.id
          }">${movie.title}</a></h2>
          <h4 class="card-text">${movie.description.slice(2, -2)}</h4>
        </div>
      </div>`;
    }
    document.querySelector("#movie-container").innerHTML += htmlStr;
    loadTime = loadTime + 1;
  }
});
