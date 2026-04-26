document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            
            const fullName = document.getElementById("fullname").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            if (password.length < 6) {
                alert("Password should be at least 6 characters long.");
                return;
            }

          
            const userData = {
                name: fullName,
                email: email,
                password: password 
            };

            localStorage.setItem("fintrack_user", JSON.stringify(userData));

            
            alert("Account created successfully!");
            window.location.href = "home-page.html"; 
        });
    }
});