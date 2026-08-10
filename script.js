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

        // Swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    const pageOrder = ["home", "about", "skills", "projects", "contact"];

    document.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;

        // Ignore small movements
        if (Math.abs(swipeDistance) < 80) {
            return;
        }

        const currentPage = [...pages].find(
            (page) => page.style.display !== "none"
        );

        if (!currentPage) {
            return;
        }

        const currentIndex = pageOrder.indexOf(currentPage.id);

        // Swipe left → Previous page
        if (swipeDistance < 0 && currentIndex > 0) {
            showPage(pageOrder[currentIndex - 1]);
        }

        // Swipe right → Next page
        if (swipeDistance > 0 && currentIndex < pageOrder.length - 1) {
            showPage(pageOrder[currentIndex + 1]);
        }
    });

    // Show Home when the website first loads
    showPage("home");

});
