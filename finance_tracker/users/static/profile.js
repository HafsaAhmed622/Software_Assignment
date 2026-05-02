document.addEventListener("DOMContentLoaded", () => {
    const profilePic   = document.getElementById("profile-pic");
    const avatarUpload = document.getElementById("avatar-upload");
    const nameHeader   = document.getElementById("display-name-header");
    const jobHeader    = document.getElementById("display-job-header");
    const fnameInput   = document.getElementById("input-fname");
    const lnameInput   = document.getElementById("input-lname");
    const jobInput     = document.getElementById("input-job");

    // Live update for Name Header
    function updateNameHeader() {
        const first = fnameInput ? fnameInput.value.trim() : "";
        const last  = lnameInput ? lnameInput.value.trim() : "";
        const full  = [first, last].filter(Boolean).join(" ");
        if (nameHeader && full) nameHeader.textContent = full;
    }

    // Live update for Job Header
    function updateJobHeader() {
        if (jobHeader && jobInput) {
            jobHeader.textContent = jobInput.value.trim() || "Add your job title";
        }
    }

    if (fnameInput) fnameInput.addEventListener("input", updateNameHeader);
    if (lnameInput) lnameInput.addEventListener("input", updateNameHeader);
    if (jobInput)   jobInput.addEventListener("input", updateJobHeader);

    // Avatar Upload Logic
    if (avatarUpload) {
        document.getElementById("change-avatar-btn")
            ?.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent accidental form submission
                avatarUpload.click();
            });

        avatarUpload.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const imgUrl = e.target.result;

                // Function to update image without destroying container structure
                const updateImgTag = (container) => {
                    if (!container) return;
                    let img = container.querySelector("img");
                    if (!img) {
                        container.innerHTML = ""; // Clear initial/text
                        img = document.createElement("img");
                        img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:50%;";
                        container.appendChild(img);
                    }
                    img.src = imgUrl;
                    container.style.backgroundColor = "transparent";
                };

                updateImgTag(profilePic);
                updateImgTag(document.querySelector(".topbar .avatar"));
            };
            reader.readAsDataURL(file);
        });
    }

    // Close Account Logic
    const closeAccountBtn = document.getElementById("close-account-btn");
    if (closeAccountBtn) {
        closeAccountBtn.addEventListener("click", () => {
            const confirmed = confirm(
                "Are you sure? This will permanently delete your Fintrack account and all budget data."
            );

            if (confirmed) {
                const form   = document.createElement("form");
                form.method  = "POST";
                form.action  = "/users/delete/"; // Adjust to your actual URL name

                const csrf   = document.createElement("input");
                csrf.type    = "hidden";
                csrf.name    = "csrfmiddlewaretoken";
                csrf.value   = getCookie("csrftoken");

                form.appendChild(csrf);
                document.body.appendChild(form);
                form.submit();
            }
        });
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : "";
    }
});