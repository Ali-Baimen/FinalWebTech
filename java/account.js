document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const nameInput = document.getElementById("signName");
    const emailInput = document.getElementById("signEmail");
    const passwordInput = document.getElementById("signPassword");
    const confirmPasswordInput = document.getElementById("signConfirmPassword");
    const termsInput = document.getElementById("signTerms");
    const msg = document.getElementById("formMsg");

    function showError(inputId, errorId, message) {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      input.classList.add("is-invalid");
      error.textContent = message;
      error.classList.remove("d-none");
    }

    function hideAllErrors() {
      document.querySelectorAll(".text-danger").forEach(el => el.classList.add("d-none"));
      document.querySelectorAll(".form-control").forEach(el => el.classList.remove("is-invalid"));
      msg.textContent = "";
      msg.classList.remove("text-success", "text-danger");
    }

    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      hideAllErrors();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const terms = termsInput.checked;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      let isValid = true;

      if (!name || name.length < 2) {
        showError("signName", "nameError", "Please enter your full name");
        isValid = false;
      }

      if (!email) {
        showError("signEmail", "emailError", "Please enter your email");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError("signEmail", "emailError", "Invalid email format");
        isValid = false;
      }

      if (!password || password.length < 6) {
        showError("signPassword", "passwordError", "Password must be at least 6 characters");
        isValid = false;
      }

      if (!confirmPassword) {
        showError("signConfirmPassword", "confirmPasswordError", "Please confirm your password");
        isValid = false;
      } else if (password !== confirmPassword) {
        showError("signConfirmPassword", "confirmPasswordError", "Passwords do not match");
        isValid = false;
      }

      if (!terms) {
        const termsError = document.getElementById("termsError");
        termsError.classList.remove("d-none");
        termsError.textContent = "Please confirm the terms and conditions";
        isValid = false;
      }

      if (isValid) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(u => u.email === email)) {
          showError("signEmail", "emailError", "This email is already registered");
          return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        msg.textContent = `Sign Up successful! Welcome, ${name}!`;
        msg.classList.add("text-success");
        signupForm.reset();
        setTimeout(() => window.location.href = "signin.html", 2000);
      } else {
        msg.textContent = "Please fix the errors above";
        msg.classList.add("text-danger");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signinForm");
  if (signinForm) {
    const emailInput = document.getElementById("signinEmail");
    const passwordInput = document.getElementById("signinPassword");
    const msg = document.getElementById("formMsg");

    function showMessage(message, isError = true) {
      msg.textContent = message;
      msg.classList.remove("text-success", "text-danger");
      msg.classList.add(isError ? "text-danger" : "text-success");
    }

    signinForm.addEventListener("submit", e => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email);

      if (!email && !password) {
        showMessage("Please enter your email and password.");
        return;
      }

      if (!email) {
        showMessage("Please enter your email.");
        return;
      }

      if (!password) {
        showMessage("Please enter your password.");
        return;
      }

      if (!user) {
        showMessage("Sorry, this email is not registered.");
        return;
      }

      if (user.password !== password) {
        showMessage("Invalid password. Please try again.");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      msg.textContent = "Sign In successful!";
      msg.classList.add("text-success");
      setTimeout(() => {
        location.reload();
        window.location.href = "profile.html";
      }, 1000);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  navLinks.innerHTML = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="shows.html">Shows</a></li>
    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
    <li class="nav-item"><a class="nav-link" href="support.html">Support</a></li>
  `;

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedUser) {
    const accountDropdown = document.createElement("li");
    accountDropdown.classList.add("nav-item", "dropdown");
    accountDropdown.innerHTML = `
      <a class="nav-link dropdown-toggle text-purple" href="#" id="accountDropdown" role="button"
         data-bs-toggle="dropdown" aria-expanded="false">
        ${loggedUser.name.split(" ")[0] || "Account"}
      </a>
      <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" style="background-color:#222;">
        <li><a class="dropdown-item" href="profile.html" id="profileLink">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutLink">Logout</a></li>
      </ul>
    `;
    navLinks.appendChild(accountDropdown);

    const logoutLink = accountDropdown.querySelector("#logoutLink");
    logoutLink.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.href = "signin.html";
    });

    const profileLink = accountDropdown.querySelector("#profileLink");
    profileLink.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "profile.html";
    });

   
    const dropdownMenu = accountDropdown.querySelector(".dropdown-menu");
    dropdownMenu.addEventListener("click", e => e.stopPropagation());

  } else {
    const loginNav = document.createElement("li");
    loginNav.classList.add("nav-item");
    loginNav.innerHTML = `<a class="nav-link" href="signin.html">Sign In</a>`;
    navLinks.appendChild(loginNav);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const profileInfo = document.getElementById("profileInfo");
  if (!profileInfo) return;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "signin.html";
    return;
  }

  profileInfo.innerHTML = `
    <div class="text-center">
      <h3 class="text-purple mb-3">Welcome, ${user.name}!</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <button id="logoutBtn" class="btn btn-danger mt-3">Logout</button>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "signin.html";
  });
});
