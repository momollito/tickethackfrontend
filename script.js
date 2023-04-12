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
      document.querySelector("#cards_1").innerHTML = `
          <div class="columns">
          <img class="img_card" src="./images/notfound.png" />
          <div id="separator"></div>
          <p id="subscribe_text">No trip</p>
          </div>`;
    }
  };

  fetchTrips();
});
