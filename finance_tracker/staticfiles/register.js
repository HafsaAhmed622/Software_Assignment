document.addEventListener("DOMContentLoaded", () => {

    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            const password        = document.getElementById("password1").value;
            const confirmPassword = document.getElementById("password2").value;

            if (password !== confirmPassword) {
                e.preventDefault();
                showInlineError("password2", "Passwords do not match. Please try again.");
                return;
            }

            if (password.length < 8) {
                e.preventDefault();
                showInlineError("password1", "Password must be at least 8 characters.");
                return;
            }

            
        });
    }


    function showInlineError(fieldId, message) {
        // Remove any existing error for this field first
        const existing = document.getElementById(`err-${fieldId}`);
        if (existing) existing.remove();

        const input = document.getElementById(fieldId);
        if (!input) return;

        const errorSpan = document.createElement("span");
        errorSpan.id = `err-${fieldId}`;
        errorSpan.className = "field-error";
        errorSpan.textContent = message;

        input.insertAdjacentElement("afterend", errorSpan);
        input.focus();
    }
});
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

