document.addEventListener("DOMContentLoaded", function () {
  const submit = document.getElementById("submit-btn");

  submit.onclick = function () {
    const nameInput = document.querySelector("#Company-name");
    const ProsInput = document.querySelector("#pros");
    const ConsInput = document.querySelector("#cons");

    const stars = document.querySelectorAll(".rating input");
    let rating;

    stars.forEach((star, index) => {
      if (star.checked) {
        rating = index + 1;
      }
    });

    const name = nameInput.value;
    const pros = ProsInput.value;
    const cons = ConsInput.value;

    nameInput.value = "";
    ProsInput.value = "";
    ConsInput.value = "";

    fetch("http://localhost:8080/insert", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        pros: pros,
        cons: cons,
        rating: rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  const searchBtn = document.querySelector("#search-btn");

  searchBtn.onclick = function () {
    const searchValue = document.querySelector("#search-input").value;
    fetch("http://localhost:8080/search/" + searchValue)
      .then((response) => response.json())
      .then((data) => loadHTML(data["data"]));
  };

  function loadHTML(data) {
    const display = document.querySelector("#search-display");
    const OverAll = calculateOverallRating(data);
    let displayHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      displayHTML = "<h1>NO REVIEWS</h1>";
    } else {
      displayHTML += `<h1>Overall Rating: ${OverAll}</h1>`;

      data.forEach(function ({ name, pros, cons, rating }, index) {
        displayHTML += `
          <div class="review">
            <h3>Review : ${index + 1}</h3>
            <div class="pros">Pros: ${pros}</div>
            <div class="cons">Cons: ${cons}</div>
            <div class="rating">Rating: ${rating}</div>
          </div>
        `;
      });
    }

    display.innerHTML = displayHTML;

    function calculateOverallRating(data) {
      let totalRating = 0;
      let numberOfReviews = 0;

      if (Array.isArray(data)) {
        data.forEach((review) => {
          if (review.rating > 0) {
            totalRating += review.rating;
            numberOfReviews++;
          }
        });
      }

      if (numberOfReviews > 0) {
        const overallRating = totalRating / numberOfReviews;
        return overallRating;
      } else {
        return 0;
      }
    }
  }
});
