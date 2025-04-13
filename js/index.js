const linkButton = document.getElementById("linkButton");

// Add a click event listener to the button
linkButton.addEventListener("click", function () {
    // Scroll to the top-restaurant div when the button is clicked
    const topRestaurantDiv = document.querySelector(".top-restaurant");
    topRestaurantDiv.scrollIntoView({ behavior: "smooth" });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Loading effect

var preloader = document.getElementById('loading');
function myLoader(){
    preloader.style.display = 'none';
}