const projects = [

    {
        title: "Customer Support Dashboard",

        description: "An interactive dashboard designed to help support teams manage tickets, monitor response times, and track customer satisfaction.",

        image: "Images/project-support.png",

        category: ["frontend", "javascript"],

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ], 

        demo: "Projects/support-dashboard.html",

        github: "#"
    }, 

    {
        title: "WordPress Business Website",

        description:
            "A responsive business website focused on user experience, SEO, lead generation, and modern web design.",

        image: "images/project-wordpress.png",

        category: ["wordpress"],

        technologies: [
            "WordPress",
            "Elementor",
            "CSS"
        ],

        demo: "projects/wordpress-site.html",

        github: "#"
    },

    {
        title: "Game Search Application",

        description:
            "A JavaScript application that uses an API to search and display video game information.",

        image: "images/project-game.png",

        category: ["frontend", "javascript"],

        technologies: [
            "JavaScript",
            "REST API",
            "JSON"
        ],

        demo: "projects/game-search.html",

        github: "#"
    }

];

const projectsGrid = document.getElementById("projects-grid");

function displayProjects (filter = "all") {

    projectsGrid.innerHTML = "";

    const filteredProjects = projects.filter(project => {
        if (filter === "all") {
            return true;
        }

        return project.category.includes(filter);

    });

    filteredProjects.forEach((project, index) => {

        const card = document.createElement("article");

        card.className = "project-card";

        card.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title}"
                class="project-image"
            >

            <div class="project-content">

                <p class="project-number">
                    PROJECT ${String(index + 1).padStart(2, "0")}
                </p>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                <div class="project-tags">

                    ${project.technologies.map(
                        tech => `<span>${tech}</span>`
                    ).join("")}

                </div>

                <div class="project-links">

                    <a
                        href="${project.demo}"
                        class="project-btn">
                        Case Study
                    </a>

                    <a
                        href="${project.github}"
                        class="project-btn outline"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                    </a>

                </div>

            </div>

        `;

        projectsGrid.appendChild(card);

    });

}

displayProjects();

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.add("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        displayProjects(filter);
    });
});

const themeToggle =
    document.getElementById("theme-toggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );


        themeToggle.textContent =
            isDark ? "☀️" : "🌙";

    });

}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const formMessage =
            document.getElementById("form-message");


        if (!name || !email || !message) {

            formMessage.textContent =
                "Please complete all fields.";

            return;

        }


        formMessage.textContent =
            "Thanks! Your message is ready to send.";

        contactForm.reset();

    });

}