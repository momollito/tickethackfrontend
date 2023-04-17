function missingData() {
  document.querySelector("#cards_1").innerHTML = `
  <div class="columns" id="result">
<img class="img_card" src="./images/notfound.png" />
<div id="separator"></div>
<p id="subscribe_text">Missing data, please fill the form correctly.</p>
</div>`;
}

function noTrips() {
  document.querySelector("#cards_1").innerHTML = `
  <div class="columns" id="result">
          <img class="img_card" src="./images/notfound.png" />
          <div id="separator"></div>
          <p id="subscribe_text">No trips were found, you can walk to your destination.</p>
          </div>`;
}

//Array with trips to export to cart.html

let tripAdded = [];

//Search for Trains

document.querySelector("#btn-search").addEventListener("click", function () {
  console.log("Click Search detected!");

  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const rowdate = document.querySelector("#calendar").value;
  const date = new Date(rowdate).toLocaleDateString("en-GB");
  //console.log('Data requested =>', departure, arrival,date)

  //Fetch trips from BackEnd
  const fetchTrips = async () => {
    const rowres = await fetch("http://localhost:3000/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departure, arrival, date }),
    });
    const resjson = await rowres.json();
    document.querySelector("#result").remove();

    if (resjson["trips"] === "Missing data") {
      missingData();
    } else if (resjson["trips"] === "No trips were found") {
      noTrips();
    } else {
      //ADD trips in front page for selection
      document.querySelector("#cards_1").innerHTML = `
        <div class="columns" id="result"></div>`;

      for (trip of resjson["trips"]) {
        let departureRes = trip.departure;
        let arrivalRes = trip.arrival;
        let hourRes = trip.date;
        let priceRes = trip.price;

        console.log(
          "Data from DB =>",
          departureRes,
          arrivalRes,
          hourRes,
          priceRes
        );
        document.querySelector("#result").innerHTML += `
        <div class="row">
        <div class="text_container">
            <p>${departureRes} 🔜 ${arrivalRes}</p>
            <p>${hourRes}</p>
            <p>${priceRes}€</p>
            <span class="add"  >Add</span>
        </div>
      </div>
      </div>`;

        let allAddButton = document.querySelectorAll(".add");
        
        for (let addButton of allAddButton)
          addButton.addEventListener("click", function () {
            console.log("Click ADD detected!");
            

            tripAdded.push(trip)
            console.log(tripAdded)
          });
      }
    }
  };
  fetchTrips();
});

// add.addEventListener("click", function () {
//   console.log("Click ADD detected!");
//   tripAdded.push(trip);
//   console.log(tripAdded)
// });

//   //Use ADD BUTTON to add to cart
//   const allAddButton = document.querySelectorAll(".add");
//   console.log(allAddButton);
//   for (let addButton of allAddButton)
//     addButton.addEventListener("click", function () {
//       console.log("Click ADD detected!");
//       tripAdded.push()
// });
