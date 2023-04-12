function missingData() {
  document.querySelector("#cards_1").innerHTML = `
<div class="columns">
<img class="img_card" src="./images/notfound.png" />
<div id="separator"></div>
<p id="subscribe_text">Missing data, please fill the form correctly.</p>
</div>`;
}

function noTrips() {
  document.querySelector("#cards_1").innerHTML = `
          <div class="columns">
          <img class="img_card" src="./images/notfound.png" />
          <div id="separator"></div>
          <p id="subscribe_text">No trips were found, you can walk to your destination.</p>
          </div>`;
}

document.querySelector("#btn-search").addEventListener("click", function () {
  console.log("Click Search detected!");

  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const rowdate = document.querySelector("#calendar").value;
  const date = new Date(rowdate).toLocaleDateString("en-GB");

  const fetchTrips = async () => {
    const rowres = await fetch("http://localhost:3000/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departure, arrival, date }),
    });
    const resjson = await rowres.json();
    console.log("response", resjson);
    if (resjson["trips"] === "Missing data") {
      missingData();
    } else if (resjson["trips"] === "No trips were found") {
      noTrips()
    } else {
      document.querySelector("#train").remove();

      for (trip of resjson["trips"]) {
        let departureRes = trip.departure;
        let arrivalRes = trip.arrival;
        let hourRes = trip.date;
        let priceRes = trip.price;
        console.log(departureRes, arrivalRes, hourRes);

        document.querySelector("#result").innerHTML += `
        <div class="row">
        <div class="text_container">
            <p>${departureRes} 🔜 ${arrivalRes}</p>
            <p>${hourRes}</p>
            <p>${priceRes}€</p>
            <span class="delete">Add</span>
        </div>
      </div>`;
      }
    }
  };

  fetchTrips();
});

// Journey not found - HMTL

{
  /* <div class="card_model" id="cards_1">
<div class="columns_train">
    <img class="img_card" src="./images/notfound.png" />
    <div id="separator"></div>
    <p id="subscribe_text">No trip</p>
</div> */
}
