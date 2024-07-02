//carousel//
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++){
        slides[i].computedStyleMap.display = "none";
    }
slideIndex++;
if (slideIndex > slides.length) {
    slideIndex = 1;
}
slides[slideIndex - 1].style.display = "block";
setTimeout(showSlides,2000);
}

//registration form

document.getElementById("registrationForm").addEventListener("submit", function(event) {
event.preventDefault();
let email = document.getElementById("email").value;
let passowrd = document.getElementById("password").value;
if (email && password) {
    alert("Registration Successful!");
} else {
    alert("Please fill in all fields");
}
});

// product gallery

let products = document.getElementsByClassName("product");
for (let product of products) {
    product.addEventListener("click", function() {
        alert("product selected: " + this.alt);
    });
}