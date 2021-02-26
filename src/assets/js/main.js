const themeButton = document.querySelector(".theme-btn");
const heroRight = document.querySelector(".hero-right");
const contactForm = document.querySelector(".contact-form");

themeButton.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme;
  const icon = themeButton.querySelector("img");
  const illustration = heroRight.querySelector("img");

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    illustration.src = "./assets/images/illustration-dark.svg";
    icon.src = "./assets/images/sun.svg";
  } else if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    illustration.src = "./assets/images/illustration-light.svg";
    icon.src = "./assets/images/moon.svg";
  }
});

function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  e.target.querySelector("fieldset").disabled = true;
  const email = formData.get("email");
  const name = formData.get("name");
  const message = formData.get("message");

  await wait(2000);
  e.target.querySelector("fieldset").disabled = false;

  console.log({ name, email, message });
});
