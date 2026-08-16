/* CUSTOMER SUPPORT DASHBOARD */
/* TICKET DATA */

const tickets = [

    {
        id: "#1042",
        title: "Unable to log into account",
        customer: "Sarah Miller",
        category: "Account",
        priority: "high",
        status: "open",
        updated: "5 min ago",
        description:
            "Customer reports that they are unable to log into their account after resetting their password."
    },

    {
        id: "#1041",
        title: "Question about billing",
        customer: "Michael Chen",
        category: "Billing",
        priority: "medium",
        status: "pending",
        updated: "18 min ago",
        description:
            "Customer is requesting clarification about a charge that appeared on their most recent invoice."
    },

    {
        id: "#1040",
        title: "Unable to connect device",
        customer: "Jessica Brown",
        category: "Technical",
        priority: "high",
        status: "open",
        updated: "32 min ago",
        description:
            "Customer is unable to connect their device to the application."
    },

    {
        id: "#1039",
        title: "How do I change my email?",
        customer: "David Wilson",
        category: "Account",
        priority: "low",
        status: "resolved",
        updated: "1 hour ago",
        description:
            "Customer requested instructions for changing the email address associated with their account."
    },

    {
        id: "#1038",
        title: "Payment method declined",
        customer: "Emily Johnson",
        category: "Billing",
        priority: "high",
        status: "open",
        updated: "2 hours ago",
        description:
            "Customer's payment method was declined while attempting to renew their subscription."
    },

    {
        id: "#1037",
        title: "Feature request",
        customer: "Alex Thompson",
        category: "Product",
        priority: "low",
        status: "pending",
        updated: "3 hours ago",
        description:
            "Customer submitted a request for an additional reporting feature."
    },

    {
        id: "#1036",
        title: "Application loading slowly",
        customer: "Rachel Davis",
        category: "Technical",
        priority: "medium",
        status: "open",
        updated: "4 hours ago",
        description:
            "Customer reports that pages are taking significantly longer than normal to load."
    }

];

/* DOM ELEMENTS */

const ticketList =
    document.getElementById("ticket-list");

const searchInput =
    document.getElementById("search-input");

const statusFilter =
    document.getElementById("status-filter");

const priorityFilter =
    document.getElementById("priority-filter");

const modal =
    document.getElementById("ticket-modal");

const modalClose =
    document.getElementById("modal-close");

const resolveButton =
    document.getElementById("resolve-ticket");

const mobileMenu =
    document.getElementById("mobile-menu");

const sidebar =
    document.querySelector(".sidebar");

/* CURRENT TICKET */

let currentTicket = null;

/* HELPER FUNCTION */

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


        row.className = "ticket-row";


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

                <span class="badge status-${ticket.status}">
                    ${capitalize(ticket.status)}
                </span>

            </td>


            <td>
                ${ticket.updated}
            </td>

        `;


        /* Make ticket clickable */

        row.addEventListener("click", () => {

            openTicket(ticket);

        });


        ticketList.appendChild(row);

    });

}

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


            /* SEARCH */

            const matchesSearch =

                ticket.id
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                ticket.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                ticket.customer
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                ticket.category
                    .toLowerCase()
                    .includes(searchTerm);


            /* STATUS */

            const matchesStatus =

                selectedStatus === "all"

                ||

                ticket.status === selectedStatus;


            /* PRIORITY */

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

/* SEARCH EVENT */

searchInput.addEventListener(
    "input",
    filterTickets
);

/* STATUS FILTER EVENT */

statusFilter.addEventListener(
    "change",
    filterTickets
);

/* PRIORITY FILTER EVENT */

priorityFilter.addEventListener(
    "change",
    filterTickets
);

/* MODAL */

function openTicket(ticket) {

    currentTicket = ticket;


    document.getElementById(
        "modal-title"
    ).textContent = ticket.title;


    document.getElementById(
        "modal-customer"
    ).textContent =
        `Customer: ${ticket.customer}`;


    document.getElementById(
        "modal-priority"
    ).textContent =
        `Priority: ${capitalize(ticket.priority)}`;


    document.getElementById(
        "modal-status"
    ).textContent =
        `Status: ${capitalize(ticket.status)}`;


    document.getElementById(
        "modal-description"
    ).textContent =
        ticket.description;


    modal.classList.add("active");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}

/* CLOSE MODAL */

function closeModal() {

    modal.classList.remove("active");


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);


/* Close modal when clicking outside it */

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            closeModal();

        }

    }
);

/* MARK TICKET RESOLVED */

resolveButton.addEventListener(
    "click",
    () => {

        if (!currentTicket) {

            return;

        }


        currentTicket.status =
            "resolved";


        currentTicket.updated =
            "Just now";


        /* Refresh tickets */

        filterTickets();


        /* Refresh analytics */

        updateAnalytics();


        /* Close modal */

        closeModal();

    }
);

/* ANALYTICS */

function updateAnalytics() {


    /* Total tickets */

    const total =
        tickets.length;


    /* Resolved tickets */

    const resolved =
        tickets.filter(ticket =>
            ticket.status === "resolved"
        ).length;


    /*  High priority tickets */

    const highPriority =
        tickets.filter(ticket =>
            ticket.priority === "high"
        ).length;


    /* Resolution rate */

    const resolutionRate =
        total === 0

            ? 0

            : Math.round(
                (resolved / total) * 100
            );


    /* Update weekly ticket count */

    const weeklyTicketCount =
        document.getElementById(
            "weekly-ticket-count"
        );


    if (weeklyTicketCount) {

        weeklyTicketCount.textContent =
            total;

    }


    /* Update resolution rate */

    const resolutionRateElement =
        document.getElementById(
            "resolution-rate"
        );


    if (resolutionRateElement) {

        resolutionRateElement.textContent =
            `${resolutionRate}%`;

    }

    /* Update High Priority Count */

    const highPriorityElement =
        document.getElementById(
            "high-priority-count"
        );


    if (highPriorityElement) {

        highPriorityElement.textContent =
            highPriority;

    }

}

/* MOBILE MENU */

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);

/* INITIALIZE DASHBOARD */

displayTickets(tickets);

updateAnalytics();