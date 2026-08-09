document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll("#page-content > section");

    function showPage(pageId) {

        pages.forEach((page) => {
            if (page.id === pageId) {
                page.style.display = "";
            } else {
                page.style.display = "none";
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.dataset.page === pageId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const pageId = link.dataset.page;

            showPage(pageId);
        });
    });

    // Show Home when the website first loads
    showPage("home");

});
