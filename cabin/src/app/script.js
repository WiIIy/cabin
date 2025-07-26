const openAbout = document.getElementById("aboutIcon");
const closeAbout = document.getElementById("aboutClose");
const aboutTab = document.getElementById("aboutTab");

openAbout.addEventListener("click",()=>{
    aboutTab.classList.add("open")
})

closeAbout.addEventListener("click",()=>{
    aboutTab.classList.remove("open")
})