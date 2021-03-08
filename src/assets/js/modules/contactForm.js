export default (doc) => {
  const contactForm = doc.querySelector(".contact-form form");
  if (!contactForm) return;

  const fieldSet = contactForm.querySelector("fieldset");
  contactForm.addEventListener("submit", handleSubmit);

  function wait(ms = 500) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let values = { errors: {} };

    resetForm(e);

    const formData = new FormData(e.currentTarget);
    values = [...formData.entries()].reduce(checkForFormValuesOrErrors, values);

    checkForErrors(values.errors);

    if (values.errors.length > 0) {
      return;
    }

    fieldSet.disabled = true;

    await wait(2000);

    fieldSet.disabled = false;

    console.log(values);
  }

  function createErrorMessage(message) {
    const span = document.createElement("span");
    span.classList.add("error-message", "fs-100");
    span.textContent = message;
    return span;
  }

  function resetForm(e) {
    const errorMessages = e.currentTarget.querySelectorAll(".error-message");
    const inputs = e.currentTarget.querySelectorAll("input");
    const textAreas = e.currentTarget.querySelectorAll("textarea");

    errorMessages?.length > 0 &&
      errorMessages.forEach((message) => message.remove());

    inputs.forEach((input) => input.classList.remove("error"));
    textAreas.forEach((textarea) => textarea.classList.remove("error"));
  }

  function renderErrorToDom(selector, message) {
    const el = contactForm.querySelector(selector);
    el.classList.add("error");
    el.insertAdjacentElement("afterend", createErrorMessage(message));
  }

  function checkForErrors(errors) {
    if ("name" in errors) {
      renderErrorToDom("input#name", errors.name);
    }

    if ("email" in errors) {
      renderErrorToDom("input#email", errors.email);
    }

    if ("message" in errors) {
      renderErrorToDom("textarea#message", errors.message);
    }
  }

  function checkForFormValuesOrErrors(acc, [key, value]) {
    if (value.length === 0) {
      acc.errors = {
        ...acc.errors,
        [key]: `Please enter a valid ${key}`,
        length: acc.errors.length + 1 || 1,
      };
    } else {
      acc[key] = value;
    }
    return acc;
  }
};
