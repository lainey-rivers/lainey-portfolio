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

const ticketList = document.getElementById("ticket-list");


function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


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

        const row = document.createElement("tr");

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


        // THIS makes the ticket clickable
        row.addEventListener("click", () => {
            openTicket(ticket);
        });


        ticketList.appendChild(row);

    });

}


displayTickets(tickets);

const modal = document.getElementById("ticket-modal");

const modalClose = document.getElementById("modal-close");

let currentTicket = null;

const resolveButton =
    document.getElementById("resolve-ticket");


function openTicket(ticket) {

    currentTicket = ticket;

    document.getElementById("modal-title").textContent =
        ticket.title;

    document.getElementById("modal-customer").textContent =
        `Customer: ${ticket.customer}`;

    document.getElementById("modal-priority").textContent =
        `Priority: ${capitalize(ticket.priority)}`;

    document.getElementById("modal-status").textContent =
        `Status: ${capitalize(ticket.status)}`;

    document.getElementById("modal-description").textContent =
        ticket.description;


    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");
}


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");
}


modalClose.addEventListener("click", closeModal);


modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});

resolveButton.addEventListener("click", () => {

    if (!currentTicket) {
        return;
    }

    currentTicket.status = "resolved";

    displayTickets(tickets);

    closeModal();

});

const mobileMenu =
    document.getElementById("mobile-menu");

const sidebar =
    document.querySelector(".sidebar");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});