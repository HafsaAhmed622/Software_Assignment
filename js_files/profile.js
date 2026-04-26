document.addEventListener("DOMContentLoaded", () => {
    const userRepository = {
        getUser: () => JSON.parse(localStorage.getItem("fintrack_user")) || {},
        saveUser: (data) => localStorage.setItem("fintrack_user", JSON.stringify(data))
    };

    let user = userRepository.getUser();

    // Selectors
    const jobInput = document.getElementById("input-job");
    const jobHeader = document.getElementById("display-job-header");
    const nameHeader = document.getElementById("display-name-header");
    const profilePic = document.getElementById("profile-pic");

    function init() {
        if (user.avatar) {
            profilePic.innerHTML = `<img src="${user.avatar}" alt="Avatar">`;
        }
        
  
        nameHeader.textContent = user.name || "User Name";
        jobHeader.textContent = user.job || "Add your job title";
        
     
        document.getElementById("input-fname").value = (user.name || "").split(" ")[0] || "";
        document.getElementById("input-lname").value = (user.name || "").split(" ").slice(1).join(" ") || "";
        document.getElementById("input-email").value = user.email || "";
        document.getElementById("input-phone").value = user.phone || "";
        document.getElementById("input-country").value = user.country || "";
        document.getElementById("input-city").value = user.city || "";
        
   
        jobInput.value = user.job || "";
    }

    init();


    document.getElementById("save-general-btn").addEventListener("click", (e) => {
        e.preventDefault();
        
        const updatedUser = {
            ...user,
            name: `${document.getElementById("input-fname").value} ${document.getElementById("input-lname").value}`.trim(),
            email: document.getElementById("input-email").value,
            phone: document.getElementById("input-phone").value,
            country: document.getElementById("input-country").value,
            city: document.getElementById("input-city").value,
            job: jobInput.value 
        };

        userRepository.saveUser(updatedUser);
        user = updatedUser;

      
        nameHeader.textContent = updatedUser.name;
        jobHeader.textContent = updatedUser.job || "Add your job title";
        
        alert("Profile updated successfully!");
    });

    
    const avatarUpload = document.getElementById("avatar-upload");
    document.getElementById("change-avatar-btn").addEventListener("click", () => avatarUpload.click());
    avatarUpload.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                user.avatar = e.target.result;
                userRepository.saveUser(user);
            }
            reader.readAsDataURL(file);
        }
        reader.onload = function(e) {
    const imgUrl = e.target.result;
    
    
    profilePic.innerHTML = `<img src="${imgUrl}" alt="Avatar">`;
    
  
    const navAvatar = document.querySelector(".topbar .avatar");
    if (navAvatar) {
        navAvatar.innerHTML = `<img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        navAvatar.style.backgroundColor = "transparent";
    }

    
    user.avatar = imgUrl;
    userRepository.saveUser(user);
}
    });
}
);
// Add this at the bottom of your profile.js
const closeAccountBtn = document.getElementById("close-account-btn");

if (closeAccountBtn) {
    closeAccountBtn.addEventListener("click", () => {
        console.log("Close account clicked"); // To check in F12 console
        
        const confirmDelete = confirm("Are you sure? This will permanently delete your Fintrack account and all budget data.");
        
        if (confirmDelete) {
            // 1. Data Access: Remove the user from storage
            localStorage.removeItem("fintrack_user");
            
            // 2. Redirect: Send them back to the sign-up page
            window.location.href = "sign-up.html";
        }
    });
}