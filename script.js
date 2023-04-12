
console.log('Start');


document.querySelector('#departure').addEventListener('click',
 function (){
   console.log('Click detected!');
 }
);


console.log('End');


document.querySelector('#btn-search').addEventListener('click', 
      function () {
        let departCompare = document.getElementById('departure').value;
        let arrivalCompare = document.getElementById('arrival').value;


        console.log(departCompare, arrivalCompare)
      })
