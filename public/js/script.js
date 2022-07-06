document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Eazy-HUB JS imported successfully!");
  },
  false
);


const btn =  document.getElementById('add-driver-btn');

 btn.addEventListener("click", () => {
  console.log("hello eworld")
  const form = document.getElementById("add-driver").style.display = "block";
  
 })
