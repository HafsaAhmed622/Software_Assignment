

document.addEventListener("DOMContentLoaded", () => {


    const profilePic   = document.getElementById("profile-pic");
    const avatarUpload = document.getElementById("avatar-upload");
    const nameHeader   = document.getElementById("display-name-header");
    const jobHeader    = document.getElementById("display-job-header");
    const fnameInput   = document.getElementById("input-fname");
    const lnameInput   = document.getElementById("input-lname");
    const jobInput     = document.getElementById("input-job");


    function updateNameHeader() {
        const first = fnameInput ? fnameInput.value.trim() : "";
        const last  = lnameInput ? lnameInput.value.trim() : "";
        const full  = [first, last].filter(Boolean).join(" ");
        if (nameHeader && full) nameHeader.textContent = full;
    }

    function updateJobHeader() {
        if (jobHeader && jobInput) {
            jobHeader.textContent = jobInput.value.trim() || "Add your job title";
        }
    }

    if (fnameInput) fnameInput.addEventListener("input", updateNameHeader);
    if (lnameInput) lnameInput.addEventListener("input", updateNameHeader);
    if (jobInput)   jobInput.addEventListener("input", updateJobHeader);


    if (avatarUpload) {
        document.getElementById("change-avatar-btn")
            ?.addEventListener("click", () => avatarUpload.click());

        avatarUpload.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const imgUrl = e.target.result;

                if (profilePic) {
                    profilePic.innerHTML = `<img src="${imgUrl}" alt="Avatar"
                        style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                }

                const navAvatar = document.querySelector(".topbar .avatar");
                if (navAvatar) {
                    navAvatar.innerHTML = `<img src="${imgUrl}" alt="Avatar"
                        style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
                    navAvatar.style.backgroundColor = "transparent";
                }

                
            };
            reader.readAsDataURL(file);
        });
    }


    const closeAccountBtn = document.getElementById("close-account-btn");

    if (closeAccountBtn) {
        closeAccountBtn.addEventListener("click", () => {
            const confirmed = confirm(
                "Are you sure? This will permanently delete your Fintrack account and all budget data."
            );

            if (confirmed) {
             
                const form   = document.createElement("form");
                form.method  = "POST";
                form.action  = "/accounts/delete/"; 

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