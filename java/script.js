document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const msg = document.getElementById("ratingMessage");
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!stars.length) return;

  if (loggedUser) {
    const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
    const savedRating = userRatings[loggedUser.email];
    if (savedRating) {
      stars.forEach((s, i) => {
        s.classList.toggle("bi-star", i >= savedRating);
        s.classList.toggle("bi-star-fill", i < savedRating);
        s.style.color = i < savedRating ? "#bb86fc" : "#777";
      });
      msg.textContent = `You rated us ${savedRating} star${savedRating > 1 ? "s" : ""}!`;
      msg.style.color = "#bb86fc";
      msg.style.fontWeight = "bold";
    }
  }

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = parseInt(star.dataset.value);

      stars.forEach((s, i) => {
        s.classList.toggle("bi-star", i >= value);
        s.classList.toggle("bi-star-fill", i < value);
        s.style.color = i < value ? "#bb86fc" : "#777";
      });

      msg.textContent = `You rated us ${value} star${value > 1 ? "s" : ""}!`;
      msg.style.color = "#bb86fc";
      msg.style.fontWeight = "bold";

      if (loggedUser) {
        const userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
        userRatings[loggedUser.email] = value;
        localStorage.setItem("userRatings", JSON.stringify(userRatings));
      } else {
        msg.textContent = "Please log in to save your rating.";
        msg.style.color = "orange";
      }
    });
  });
});


//Task 2
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    const title = item.querySelector(".accordion-title");
    const content = item.querySelector(".accordion-content");
    content.style.maxHeight = "0";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.4s ease";

    title.addEventListener("click", () => {
      items.forEach(other => {
        if (other !== item) {
          const otherContent = other.querySelector(".accordion-content");
          otherContent.style.maxHeight = "0";
        }
      });
      if (content.style.maxHeight === "0px" || !content.style.maxHeight) {
        content.style.maxHeight = content.scrollHeight + "px"; 
      } else {
        content.style.maxHeight = "0"; 
      }
    });
  });
});

//Task 3 
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const content = document.getElementById("popupContent");
  const openBtn = document.getElementById("openPopup");
  const closeBtn = document.getElementById("closePopup");
  const submitBtn = document.getElementById("submitPopup");

  Object.assign(popup.style, {
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999"
  });


  Object.assign(content.style, {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    border: "2px solid #6a0297",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(106,2,151,0.8)",
    padding: "30px",
    textAlign: "center",
    width: "300px",
    position: "relative",
    transition: "transform 0.3s ease"
  });


  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "12px",
    fontSize: "22px",
    cursor: "pointer",
    color: "#bb86fc"
  });


  document.querySelectorAll("#popup input").forEach(input => {
    Object.assign(input.style, {
      display: "block",
      width: "90%",
      margin: "10px auto",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #6a0297",
      backgroundColor: "#222",
      color: "#fff"
    });
  });

  Object.assign(submitBtn.style, {
    backgroundColor: "#6a0297",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  });

  submitBtn.addEventListener("mouseover", () => {
    submitBtn.style.backgroundColor = "#9d4edd";
  });
  submitBtn.addEventListener("mouseout", () => {
    submitBtn.style.backgroundColor = "#6a0297";
  });


  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    content.style.transform = "scale(1.05)";
    setTimeout(() => (content.style.transform = "scale(1)"), 100);
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });


  popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });


  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    if (!name || !email) {
      alert("Please fill in all fields!");
    } else {
      alert(`Thank you, ${name}! Subscription successful.`);
      popup.style.display = "none";
    }
  });
});

//Task 4 
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("colorBtn");
  if (!btn) return;


  const colors = [
    "#0d0d0d",  // black
    "#1a3c1a",  // dark forest green
    "#228B22",  // medium green
    "#32CD32",  // lime
    "#FFD700",  // gold
    "#FFF44F"   // bright yellow
  ];

  let i = 0;

  Object.assign(btn.style, {
    backgroundColor: "#6a0297",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "20px auto",
    display: "block",
    transition: "background 0.3s ease"
  });

  btn.addEventListener("click", () => {
    const next = colors[i];
    document.body.style.backgroundColor = next;
    document.body.style.transition = "background-color 0.8s ease";
    console.log("Background changed to:", next);

    i = (i + 1) % colors.length;
  });
});

//Task 5
document.addEventListener("DOMContentLoaded", () => {
  const dateTimeBlock = document.getElementById("dateTimeBlock");
  if (!dateTimeBlock) return;
  Object.assign(dateTimeBlock.style, {
    marginTop: "30px",
    color: "#bb86fc",
    fontSize: "18px",
    textAlign: "center",
    fontWeight: "bold"
  });

  function updateDateTime() {
    const now = new Date();

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };

    const formatted = now.toLocaleString("en-US", options);
    dateTimeBlock.textContent = formatted;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
//Task-1 Assigment-6
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const msg = document.getElementById("ratingMessage");

  if (!stars.length) return;

  stars.forEach(star => {
    star.style.fontSize = "40px";
    star.style.color = "#777";
    star.style.cursor = "pointer";
    star.style.margin = "5px";
    star.style.transition = "color 0.3s ease, transform 0.2s ease";

    star.addEventListener("mouseover", () => {
      star.style.transform = "scale(1.2)";
    });
    star.addEventListener("mouseout", () => {
      star.style.transform = "scale(1)";
    });

    star.addEventListener("click", () => {
      const value = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        s.classList.toggle("bi-star", i >= value);
        s.classList.toggle("bi-star-fill", i < value);
        s.style.color = i < value ? "#bb86fc" : "#777";
      });
      msg.textContent = `You rated us ${value} star${value > 1 ? "s" : ""}!`;
      msg.style.color = "#bb86fc";
      msg.style.fontWeight = "bold";
    });
  });
});
//Task -2 Assignment - 6
document.addEventListener("DOMContentLoaded", () => {
  const timeBtn = document.getElementById("timeBtn");
  const timeDisplay = document.getElementById("timeDisplay");
  if (!timeBtn || !timeDisplay) return;

  let intervalId = null;

  timeBtn.addEventListener("click", () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      timeBtn.textContent = "Show Live Time";
      timeDisplay.textContent = "";
      return;
    }
    function updateTime() {
      const now = new Date().toLocaleTimeString();
      timeDisplay.textContent = now;
    }

    updateTime();
    intervalId = setInterval(updateTime, 1000); 
    timeBtn.textContent = "Stop Clock";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  if (!navLinks.length) return;

  let currentIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % navLinks.length;
      navLinks[currentIndex].focus();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
      navLinks[currentIndex].focus();
    }
  });
});

//Greetings of day time
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  const hour = new Date().getHours();
  let message;

  switch (true) {
    case (hour >= 5 && hour < 12):
      message = "Good Morning , welcome to TV Lite!";
      break;
    case (hour >= 12 && hour < 18):
      message = "Good Afternoon , enjoy your shows!";
      break;
    case (hour >= 18 && hour < 22):
      message = "Good Evening , relax with your favorite series!";
      break;
    default:
      message = "Good late time of a day , time for some late night TV!";
  }

  greeting.textContent = message;
});

//OBJECTS AND METHODS
document.addEventListener("DOMContentLoaded", () => {
  const appInfo = {
    name: "TV Shows",
    version: "1.0",
    authors: ["Ali", "Damir"],
    getInfo() {
      return `${this.name} v${this.version} — Created by ${this.authors.join(" & ")}`;
    }
  };

  const infoBox = document.createElement("div");
  infoBox.className = "text-center mt-4";
  infoBox.style.color = "#bb86fc";
  infoBox.textContent = appInfo.getInfo();
  document.body.appendChild(infoBox);
});

//PLAY SOUND
document.addEventListener("DOMContentLoaded", () => {
  const soundFile = "Sound/click.mp3";
  const sound = new Audio(soundFile);
  const bgBtn = document.getElementById("colorBtn");
  if (bgBtn) {
    bgBtn.addEventListener("click", () => {
      sound.play().catch(err => console.log("Audio playback failed:", err));
    });
  }
});


//ANIMATION (simple hover animation for all cards)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".show-card, .card");
  cards.forEach(card => {
    card.style.transition = "transform 0.3s ease";
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });
});

