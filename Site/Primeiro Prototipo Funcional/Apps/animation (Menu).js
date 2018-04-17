const slider = document.querySelector(".menu")
let isDown = false;
let startY = 0;
let scrollTop;
slider.scrollTop = 165;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startY    = e.pageY - slider.offsetTop;
    scrollTop = slider.scrollTop;
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y          = e.pageY - slider.offsetTop; 
    const walk       = y - startY;
    slider.scrollTop = scrollTop - walk;
    console.log(slider.scrollTop);
});

function updateProgress() {
    if (slider.scrollTop <= 80) {
        document.getElementById("Progress_Circles").src = "Images/progress1.png";
    }
    if (slider.scrollTop > 80 && slider.scrollTop <= 240) {
        document.getElementById("Progress_Circles").src = "Images/progress2.png";
    }
    if (slider.scrollTop > 240) {
        document.getElementById("Progress_Circles").src = "Images/progress3.png";
    }
}