/* CUSTOMER SUPPORT DASHBOARD */
/* TICKET DATA */


const tickets = [

    {
        id: "#1042",
        title: "Unable to log into account",
        customer: "Sarah Miller",
        email: "sarah.miller@example.com",
        category: "Account",
        priority: "high",
        status: "open",
        agent: "Lainey Rivers",
        updated: "5 min ago",
        description:
            "Customer reports that they are unable to log into their account after resetting their password.",
        notes:
            "Customer has already attempted a password reset."
    },

    {
        id: "#1041",
        title: "Question about billing",
        customer: "Michael Chen",
        email: "michael.chen@example.com",
        category: "Billing",
        priority: "medium",
        status: "pending",
        agent: "Jordan Lee",
        updated: "18 min ago",
        description:
            "Customer is requesting clarification about a charge that appeared on their most recent invoice.",
        notes:
            "Reviewing invoice history before responding."
    },

    {
        id: "#1040",
        title: "Unable to connect device",
        customer: "Jessica Brown",
        email: "jessica.brown@example.com",
        category: "Technical",
        priority: "high",
        status: "open",
        agent: "Lainey Rivers",
        updated: "32 min ago",
        description:
            "Customer is unable to connect their device to the application.",
        notes:
            "Customer provided device model and operating system."
    },

    {
        id: "#1039",
        title: "How do I change my email?",
        customer: "David Wilson",
        email: "david.wilson@example.com",
        category: "Account",
        priority: "low",
        status: "resolved",
        agent: "Taylor Morgan",
        updated: "1 hour ago",
        description:
            "Customer requested instructions for changing the email address associated with their account.",
        notes:
            "Provided account settings instructions."
    },

    {
        id: "#1038",
        title: "Payment method declined",
        customer: "Emily Johnson",
        email: "emily.johnson@example.com",
        category: "Billing",
        priority: "high",
        status: "open",
        agent: "Alex Carter",
        updated: "2 hours ago",
        description:
            "Customer's payment method was declined while attempting to renew their subscription.",
        notes:
            "Customer may need to update their billing information."
    },

    {
        id: "#1037",
        title: "Feature request",
        customer: "Alex Thompson",
        email: "alex.thompson@example.com",
        category: "Product",
        priority: "low",
        status: "pending",
        agent: "Jordan Lee",
        updated: "3 hours ago",
        description:
            "Customer submitted a request for an additional reporting feature.",
        notes:
            "Feature request forwarded to product team."
    },

    {
        id: "#1036",
        title: "Application loading slowly",
        customer: "Rachel Davis",
        email: "rachel.davis@example.com",
        category: "Technical",
        priority: "medium",
        status: "open",
        agent: "Lainey Rivers",
        updated: "4 hours ago",
        description:
            "Customer reports that pages are taking significantly longer than normal to load.",
        notes:
            "Investigating possible performance issue."
    }

];

/* LOAD SAVED TICKETS */

const savedTickets =
    localStorage.getItem("supportDeskTickets");

if (savedTickets) {

    tickets.length = 0;

    tickets.push(
        ...JSON.parse(savedTickets)
    );

}

/* SAVE TICKETS */

function saveTickets() {

    localStorage.setItem(
        "supportDeskTickets",
        JSON.stringify(tickets)
    );

}

/* DOM ELEMENTS */

const ticketList =
    document.getElementById("ticket-list");

const searchInput =
    document.getElementById("search-input");

const statusFilter =
    document.getElementById("status-filter");

const priorityFilter =
    document.getElementById("priority-filter");


/* Existing ticket modal */

const ticketModal =
    document.getElementById("ticket-modal");

const modalClose =
    document.getElementById("modal-close");


/* New ticket modal */

const newTicketModal =
    document.getElementById("new-ticket-modal");

const newTicketButton =
    document.getElementById("new-ticket-button");

const newTicketClose =
    document.getElementById("new-ticket-close");

const newTicketCancel =
    document.getElementById("new-ticket-cancel");

const newTicketForm =
    document.getElementById("new-ticket-form");


/* Ticket editing */

const saveTicketButton =
    document.getElementById("save-ticket");

const deleteTicketButton =
    document.getElementById("delete-ticket");

const cancelEditButton =
    document.getElementById("cancel-edit");


/*  Mobile menu */

const mobileMenu =
    document.getElementById("mobile-menu");

const sidebar =
    document.querySelector(".sidebar");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");

let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* CURRENT TICKET */

let currentTicket = null;

/* HELPER */

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}

/* DISPLAY TICKETS */

function displayTickets(ticketData) {

    ticketList.innerHTML = "";


    if (ticketData.length === 0) {

        ticketList.innerHTML = `

            <tr>

                <td colspan="6">

                    No tickets found.

                </td>

            </tr>

        `;

        return;
    }


    ticketData.forEach(ticket => {

        const row =
            document.createElement("tr");


        row.className =
            "ticket-row";


        row.innerHTML = `

            <td>

                <div class="ticket-id">
                    ${ticket.id}
                </div>

                <div class="ticket-title">
                    ${ticket.title}
                </div>

            </td>


            <td>

                <span class="customer-name">
                    ${ticket.customer}
                </span>

            </td>


            <td>

                <span class="category">
                    ${ticket.category}
                </span>

            </td>


            <td>

                <span class="priority-${ticket.priority}">
                    ${capitalize(ticket.priority)}
                </span>

            </td>


            <td>

                <select
                   class="status-quick-change"
                   data-ticket-id="${ticket.id}">

                <option
                   value="open"
                   ${ticket.status === "open" ? "selected" : ""}>
                   Open
                </option>

                <option
                    value="pending"
                    ${ticket.status === "pending" ? "selected" : ""}>
                     Pending
                 </option>

                <option
                    value="resolved"
                    ${ticket.status === "resolved" ? "selected" : ""}>
                    Resolved
                </option>

        </select>

            </td>


            <td>
                ${ticket.updated}
            </td>

        `;


        row.addEventListener(
            "click",
            () => openTicket(ticket)
        );


        ticketList.appendChild(row);



    });

}

document
    .querySelectorAll(".status-quick-change")
    .forEach(select => {

        select.addEventListener(
            "click",
            event => {

                event.stopPropagation();
            }
        );

        select.addEventListener(
            "change",
            event => {

                event.stopPropagation();

                const ticketId =
                    event.target.dataset.ticketId;

                const ticket =
                    tickets.find(
                        ticket =>
                            ticket.id === ticketId
                    );

                if (!ticket) {
                    return;
                }
            ticket.status =
                    event.target.value;


                ticket.updated =
                    "Just now";


                saveTickets();

                updateAnalytics();

                showToast(
                    `${ticket.id} marked ${ticket.status}`
                );

            }
        );

    });

/* SEARCH + FILTERS */


function filterTickets() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedStatus =
        statusFilter.value;


    const selectedPriority =
        priorityFilter.value;


    const filteredTickets =
        tickets.filter(ticket => {


            const searchableText = `

                ${ticket.id}
                ${ticket.title}
                ${ticket.customer}
                ${ticket.email}
                ${ticket.category}

            `.toLowerCase();


            const matchesSearch =
                searchableText
                    .includes(searchTerm);


            const matchesStatus =
                selectedStatus === "all"
                ||
                ticket.status === selectedStatus;

            const matchesPriority =
                selectedPriority === "all"
                ||
                ticket.priority === selectedPriority;


            return (

                matchesSearch
                &&
                matchesStatus
                &&
                matchesPriority

            );

        });


    displayTickets(filteredTickets);

}


searchInput.addEventListener(
    "input",
    filterTickets
);


statusFilter.addEventListener(
    "change",
    filterTickets
);


priorityFilter.addEventListener(
    "change",
    filterTickets
);

/* OPEN EXISTING TICKET */


function openTicket(ticket) {

    currentTicket = ticket;


    document.getElementById(
        "modal-title"
    ).textContent =
        `${ticket.id} — ${ticket.title}`;


    document.getElementById(
        "edit-customer"
    ).value =
        ticket.customer;


    document.getElementById(
        "edit-email"
    ).value =
        ticket.email;


    document.getElementById(
        "edit-category"
    ).value =
        ticket.category;


    document.getElementById(
        "edit-priority"
    ).value =
        ticket.priority;


    document.getElementById(
        "edit-status"
    ).value =
        ticket.status;


    document.getElementById(
        "edit-agent"
    ).value =
        ticket.agent;


    document.getElementById(
        "edit-description"
    ).value =
        ticket.description;


    document.getElementById(
        "edit-notes"
    ).value =
        ticket.notes;


    ticketModal.classList.add(
        "active"
    );


    ticketModal.setAttribute(
        "aria-hidden",
        "false"
    );

}

/* CLOSE EXISTING TICKET */

function closeTicketModal() {

    ticketModal.classList.remove(
        "active"
    );


    ticketModal.setAttribute(
        "aria-hidden",
        "true"
    );


    currentTicket = null;

}


modalClose.addEventListener(
    "click",
    closeTicketModal
);


cancelEditButton.addEventListener(
    "click",
    closeTicketModal
);

/* SAVE TICKET CHANGES */

saveTicketButton.addEventListener(
    "click",
    () => {

        if (!currentTicket) {
            return;
        }


        currentTicket.customer =
            document.getElementById(
                "edit-customer"
            ).value.trim();


        currentTicket.email =
            document.getElementById(
                "edit-email"
            ).value.trim();


        currentTicket.category =
            document.getElementById(
                "edit-category"
            ).value;


        currentTicket.priority =
            document.getElementById(
                "edit-priority"
            ).value;


        currentTicket.status =
            document.getElementById(
                "edit-status"
            ).value;


        currentTicket.agent =
            document.getElementById(
                "edit-agent"
            ).value;


        currentTicket.description =
            document.getElementById(
                "edit-description"
            ).value.trim();


        currentTicket.notes =
            document.getElementById(
                "edit-notes"
            ).value.trim();


        currentTicket.updated =
            "Just now";

        saveTickets();

        filterTickets();

        updateAnalytics();

        closeTicketModal();

        showToast(
            `${currentTicket.id} updated successfully`
        );
    }
);

/* DELETE TICKET */

deleteTicketButton.addEventListener(
    "click",
    () => {

        if (!currentTicket) {
            return;
        }


        const confirmed =
            confirm(
                `Delete ${currentTicket.id}?`
            );


        if (!confirmed) {
            return;
        }


        const index =
            tickets.indexOf(
                currentTicket
            );


        if (index !== -1) {

            tickets.splice(
                index,
                1
            );

            saveTickets ();

        showToast(
            "Ticket deleted successfully"
        );
    }


        filterTickets();

        updateAnalytics();

        closeTicketModal();

    }
);

/* NEW TICKET MODAL */

function openNewTicketModal() {

    newTicketModal.classList.add(
        "active"
    );


    newTicketModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.getElementById(
        "new-customer"
    ).focus();

}


function closeNewTicketModal() {

    newTicketModal.classList.remove(
        "active"
    );


    newTicketModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


newTicketButton.addEventListener(
    "click",
    openNewTicketModal
);


newTicketClose.addEventListener(
    "click",
    closeNewTicketModal
);


newTicketCancel.addEventListener(
    "click",
    closeNewTicketModal
);

/* CREATE NEW TICKET */

newTicketForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const customer =
            document.getElementById(
                "new-customer"
            ).value.trim();


        const email =
            document.getElementById(
                "new-email"
            ).value.trim();


        const title =
            document.getElementById(
                "new-title"
            ).value.trim();


        const category =
            document.getElementById(
                "new-category"
            ).value;


        const priority =
            document.getElementById(
                "new-priority"
            ).value;


        const description =
            document.getElementById(
                "new-description"
            ).value.trim();


        const agent =
            document.getElementById(
                "new-agent"
            ).value;


        // Generate next ticket number

        const numbers =
            tickets.map(ticket => {

                return parseInt(
                    ticket.id.replace("#", "")
                );

            });


        const nextNumber =
            Math.max(...numbers, 1042) + 1;


        const newTicket = {

            id: `#${nextNumber}`,

            title: title,

            customer: customer,

            email: email,

            category: category,

            priority: priority,

            status: "open",

            agent: agent,

            updated: "Just now",

            description: description,

            notes: ""

        };


        // Add ticket

        tickets.unshift(
            newTicket
        );

        saveTickets();


        // Reset form

        newTicketForm.reset();


        // Close form

        closeNewTicketModal();

        filterTickets();

        updateAnalytics();

        showToast(
            `${newTicket.id} created successfully`
        );

     }
);

/* ANALYTICS */

function updateAnalytics() {

    const total =
        tickets.length;


    const resolved =
        tickets.filter(ticket =>
            ticket.status === "resolved"
        ).length;


    const highPriority =
        tickets.filter(ticket =>
            ticket.priority === "high"
        ).length;


    const resolutionRate =
        total === 0

            ? 0

            : Math.round(
                (resolved / total) * 100
            );


    const weeklyCount =
        document.getElementById(
            "weekly-ticket-count"
        );


    if (weeklyCount) {

        weeklyCount.textContent =
            total;

    }


    const resolutionElement =
        document.getElementById(
            "resolution-rate"
        );


    if (resolutionElement) {

        resolutionElement.textContent =
            `${resolutionRate}%`;

    }


    const priorityElement =
        document.getElementById(
            "high-priority-count"
        );


    if (priorityElement) {

        priorityElement.textContent =
            highPriority;

    }


    const totalTickets =
        document.getElementById(
            "total-tickets"
        );


    if (totalTickets) {

        totalTickets.textContent =
            total;

    }


    const openTickets =
        document.getElementById(
            "open-tickets"
        );


    if (openTickets) {

        openTickets.textContent =
            tickets.filter(ticket =>
                ticket.status === "open"
            ).length;

    }

}

/* CLOSE MODALS BY CLICKING OUTSIDE */

ticketModal.addEventListener(
    "click",
    event => {

        if (
            event.target === ticketModal
        ) {

            closeTicketModal();

        }

    }
);


newTicketModal.addEventListener(
    "click",
    event => {

        if (
            event.target === newTicketModal
        ) {

            closeNewTicketModal();

        }

    }
);

/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        closeTicketModal();

        closeNewTicketModal();

    }
);

/* MOBILE MENU */

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);

/* INITIALIZE */

displayTickets(tickets);

updateAnalytics();

const themeToggle =
    document.getElementById (
        "theme-toggle"
    );

const savedTheme =
    localStorage.getItem (
        "supportDeskTheme"
    );

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );
    }

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "supportDeskTheme",
            isDark
                ? "dark"
                : "light"
        );


        themeToggle.textContent =
            isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }
);

/* LOADING SCREEN */

window.addEventListener(
    "load",
    () => {

        const loadingScreen =
            document.getElementById(
                "loading-screen"
            );


        setTimeout(() => {

            loadingScreen.style.opacity =
                "0";


            setTimeout(() => {

                loadingScreen.remove();

            }, 300);

        }, 400);

    }
);