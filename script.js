function register() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    if (user && pass) {
        localStorage.setItem(user, pass);
        alert("Registration Successful!");
    } else {
        alert("Enter username and password!");
    }
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    if (localStorage.getItem(user) === pass) {
        localStorage.setItem("loggedInUser", user);
        showSocialMedia();
    } else {
        alert("Invalid credentials!");
    }
}

function showSocialMedia() {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("socialMediaContainer").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = localStorage.getItem("loggedInUser");
    loadPosts();
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function addPost() {
    let postText = document.getElementById("postInput").value;
    let user = localStorage.getItem("loggedInUser");
    if (postText.trim()) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.push({ user, text: postText });
        localStorage.setItem("posts", JSON.stringify(posts));
        document.getElementById("postInput").value = "";
        loadPosts();
    }
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = "";
    posts.forEach(post => {
        let div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<strong>@${post.user}</strong>: ${post.text}`;
        postContainer.appendChild(div);
    });
}

// Check if user is logged in
if (localStorage.getItem("loggedInUser")) {
    showSocialMedia();
}
