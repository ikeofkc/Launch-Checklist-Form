// Write your JavaScript code here!  

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load",function() {
   function getRandomNum(num) {
      return Math.floor(Math.random() * Math.floor(num));
   }
   const fetchPromise = 
      fetch("https://handlers.education.launchcode.org/static/planets.json")
      .then((response) => response.json())
      .then((json) => {
         let missionTarget = document.querySelector('#missionTarget');
         let randomNumber = getRandomNum(json.length);
         missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
               <li>Name: ${json[randomNumber].name}</li>
               <li>Diameter: ${json[randomNumber].diameter}</li>
               <li>Star: ${json[randomNumber].star}</li>
               <li>Distance from Earth: ${json[randomNumber].distance}</li>
               <li>Number of Moons: ${json[randomNumber].moons}</li>
               </ol>
               <img src="${json[randomNumber].image}">`
      });
        
        
        let form = document.getElementById("launchForm")
        
        // Sets up variables for DOM elements with querySelector
        form.addEventListener("submit", function(event) {
           let pilotNameInput = document.querySelector("input[name=pilotName]");
           let copilotNameInput = document.querySelector("input[name=copilotName]");
           let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
           let cargoMassInput = document.querySelector("input[name=cargoMass]");
           const faultyItems = document.getElementById("faultyItems");
           const launchStatus = document.getElementById("launchStatus");
           
           // Sets up validations for 2 name fields. Returns false if it begins or ends with a space or non letter, and allows letters, hyphens, and apostrophies in the middle.
           const nameCheck = /^([a-zA-Z]){1}([a-zA-Z\s\'\-])*([a-zA-z]){1}$/;
           // Sets up number validations, only allows numaerical entries of 5 characters 
           const numCheck = /^[0-9]/;
           const kgLimit = 10000;
           
           
           //Pushes and issues seen into an array of strings
           let entryIssues = [];
           let dataIssues = [];
           
           if (!nameCheck.test(pilotNameInput.value)) {
              entryIssues.push("\n- Pilot name missing or incorrect");
            }
            
            if (!nameCheck.test(copilotNameInput.value)) {
               entryIssues.push("\n- Co-pilot name missing or incorrect");
            }
            
            if (!numCheck.test(fuelLevelInput.value)) {
               entryIssues.push("\n- Fuel level missing or invalid number");
            }
            
            if (!numCheck.test(cargoMassInput.value)) {
               entryIssues.push("\n- Cargo mass level missing or invalid number");
            }
            
            
            // If there is an issue, an alert tells them which fields have problems. 
            if (entryIssues.length > 0) {
               alert(`Oy! Somfin wrong! Looksy hea mate: ${entryIssues} \n \nRemembeh: Top 2 fields got to be NAMES mate... Levels and mass got to be numbas!`);
               event.preventDefault();
            } else {

               // Check if ready to roll
               if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
                  launchStatus.innerHTML = `Shuttle is ready for launch.`
                  launchStatus.style.color = "green"
                  event.preventDefault();
               }

               // Update pilot info
               document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} Ready.`
               document.getElementById("copilotStatus").innerHTML = `Pilot ${copilotNameInput.value} Ready.`

               // Validate if fuel is too low and update info     
               if (fuelLevelInput.value < 10000) {
                  faultyItems.style.visibility = "visible";
                  document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch!`;
                  launchStatus.innerHTML = 'Shuttle not ready for launch.';
                  launchStatus.style.color = "red";
                  event.preventDefault();
               } else {
                  document.getElementById("fuelStatus").innerHTML = 'Fuel good to go!'
               }
               
            
               // Validate if Mass is too high and update info
               if (cargoMassInput.value > 10000) {
                  faultyItems.style.visibility = "visible";
                  document.getElementById("cargoStatus").innerHTML = `Cargo mass is too high for launch.`
                  launchStatus.innerHTML = `Shuttle not ready for launch.`
                  launchStatus.style.color = "red"
                  event.preventDefault();
               } else {
                  document.getElementById("cargoStatus").innerHTML = `Cargo good to go!`
               }
               
            }
         })
   });   