//carousel

$(document).ready(function() {
    $('#videoCarousel').carousel({
        interval: 3000 // Change the interval if needed
    });
});
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