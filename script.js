




document.querySelector("#btn-search").addEventListener("click", async function () {
  console.log("Click Search detected!");

  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector('#calendar').value;

  console.log(departure, arrival, date)

  const rowres = await fetch('http://localhost:3000/trips', {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({departure, arrival, date})
  })
  const resjson = await rowres.json()
  console.log('fetch res:', resjson)

});
