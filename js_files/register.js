document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // --- SIGN UP LOGIC ---
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

            // Save user to localStorage
            localStorage.setItem("fintrack_user", JSON.stringify(userData));

            alert("Account created successfully!");
            window.location.href = "home-page.html"; 
        });
    }

    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("email").value;
            const passwordInput = document.getElementById("password").value;

            // Get the saved user from localStorage
            const savedUser = JSON.parse(localStorage.getItem("fintrack_user"));

            if (savedUser) {
                // Check if credentials match
                if (emailInput === savedUser.email && passwordInput === savedUser.password) {
                    alert(`Welcome back, ${savedUser.name}!`);
                    window.location.href = "home-page.html";
                } else {
                    alert("Invalid email or password.");
                }
            } else {
                alert("No account found. Please register first.");
            }
        });
    }
});