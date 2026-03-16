const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // IMPORTANT: stops normal submit

    const data = {
        name: form.name.value,
        _replyto: form._replyto.value,
        message: form.message.value
    };

    try {
        const response = await fetch("https://formspree.io/f/mdawajkq", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            status.style.display = "block"; // show success message
            form.reset();                    // clear form fields
            setTimeout(() => status.style.display = "none", 3000);
        } else {
            const result = await response.json();
            alert("Error: " + (result?.errors?.map(e => e.message).join(", ") || "Unknown error"));
        }
    } catch (error) {
        console.error(error);
        alert("Oops! Something went wrong.");
    }
});


const sections = document.querySelectorAll("main section");
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");

// Use Intersection Observer to detect which section is in view
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 // 10% of section visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.sidebar-menu a[href="#${id}"]`);
        if (entry.isIntersecting) {
            sidebarLinks.forEach(a => a.classList.remove("active"));
            link.classList.add("active");
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => observer.observe(section));

const toggle = document.getElementById("toggle-projects");
const additionalProjects = document.getElementById("additional-projects");

toggle.addEventListener("click", () => {

  if (additionalProjects.style.display === "none" || additionalProjects.style.display === "") {
    additionalProjects.style.display = "contents";
    toggle.textContent = "▲ hide additional projects ▲";
  } else {
    additionalProjects.style.display = "none";
    toggle.textContent = "▼ show additional projects ▼";
  }

});

const button = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");

button.addEventListener("click", () => {
  menu.classList.toggle("open");
});