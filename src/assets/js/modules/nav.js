export default (doc) => {
  const body = doc.querySelector("body");

  const openNavButton = body.querySelector(".open-nav-btn");
  const sideNav = body.querySelector(".side-nav");
  const closeSideNavButton = sideNav.querySelector(".close-side-nav");
  const overlay = body.querySelector(".overlay");

  openNavButton.addEventListener("click", handleOpenNavClick);

  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      handleCloseNavClick();
    }
  }

  function handleOpenNavClick() {
    sideNav.classList.add("open");
    overlay.classList.add("visible");

    closeSideNavButton.focus();

    closeSideNavButton.addEventListener("click", handleCloseNavClick);
    sideNav.addEventListener("keyup", handleEscapeKey);
    overlay.addEventListener("click", handleCloseNavClick);

    openNavButton.removeEventListener("click", handleOpenNavClick);
  }

  function handleCloseNavClick() {
    sideNav.classList.remove("open");
    overlay.classList.remove("visible");

    openNavButton.focus();
    openNavButton.addEventListener("click", handleOpenNavClick);
    overlay.addEventListener("click", handleCloseNavClick);

    closeSideNavButton.removeEventListener("click", handleCloseNavClick);
    sideNav.removeEventListener("keyup", handleEscapeKey);
  }
};
