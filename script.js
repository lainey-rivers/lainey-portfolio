const projects = [
  {
    title: "SupportDesk",
    description: "A full customer-support dashboard concept for managing tickets, priorities, statuses, agents, conversations, analytics, and customer activity.",
    image: "Images/supportdesk-preview.png",
    categories: ["frontend", "javascript"],
    technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    demo: "Additional-projects/supportdesk/support.html",
    github: "https://github.com/lainey-rivers/lainey-portfolio/tree/main/additional-projects/support-dashboard",
    featured: true
  },
  {
    title: "WordPress Business Website",
    description: "A responsive business website focused on clear messaging, user experience, SEO, lead generation, and modern visual design.",
    image: "Images/project-wordpress.png",
    categories: ["wordpress"],
    technologies: ["WordPress", "Elementor", "CSS"],
    demo: "projects/wordpress-site.html",
    github: "https://github.com/lainey-rivers"
  },
  {
    title: "Game Search Application",
    description: "An API-powered JavaScript application that lets users search for video games and dynamically display useful game information.",
    image: "Images/project-game.png",
    categories: ["frontend", "javascript"],
    technologies: ["JavaScript", "REST API", "JSON"],
    demo: "projects/game-search.html",
    github: "https://github.com/lainey-rivers"
  }
];

const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function safeImage(image, title) {
  return `
    <img class="project-image" src="${image}" alt="${title} preview" loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
    <div class="image-fallback" hidden><span>${title.toUpperCase()}</span></div>
  `;
}

function displayProjects(filter = "all") {
  if (!projectsGrid) return;

  const filtered = projects.filter(project => filter === "all" || project.categories.includes(filter));

  projectsGrid.innerHTML = filtered.map((project, index) => `
    <article class="project-card ${project.featured ? "featured" : ""} reveal visible">
      <div class="project-image-wrap">
        ${safeImage(project.image, project.title)}
      </div>
      <div class="project-content">
        <p class="project-number">PROJECT ${String(projects.indexOf(project) + 1).padStart(2, "0")} · ${project.featured ? "FEATURED" : "SELECTED WORK"}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
        </div>
        <div class="project-links">
          <a class="project-btn" href="${project.demo}">View project ↗</a>
          <a class="project-btn outline" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>
    </article>
  `).join("");
}

displayProjects();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    displayProjects(button.dataset.filter);
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon() {
  if (themeIcon) themeIcon.textContent = document.body.classList.contains("light") ? "☀" : "☾";
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(anchor => anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  formMessage.textContent = "Opening your email app…";
  contactForm.reset();
});
