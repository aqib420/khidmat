/**
 * EDAP Pakistan - Core Architecture Script
 * Logic-mapping, cross-page initialization, and form orchestration.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initCrossPageRoutings();
  initFormHandlers();
});

/**
 * Automatically Highlights the active nav link based on the current URL path
 */
function initNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    // Check if the link matches the current path or its anchor variations
    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
      link.style.color = "var(--green-dark)";
      link.style.borderBottom = "2px solid var(--primary)";
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Cross-Page Parameter Routing
 * If a user clicks 'Enroll Now' from services.html, it auto-selects that specific option on contact.html
 */
function initCrossPageRoutings() {
  // Check if we are on the contact page
  const interestDropdown = document.getElementById("interestSelect");
  if (!interestDropdown) return;

  // Parse URL query parameters (e.g., contact.html?program=computer)
  const urlParams = new URLSearchParams(window.location.search);
  const programParam = urlParams.get("program");

  if (programParam) {
    // Match query parameters to select values
    switch (programParam) {
      case "computer":
        interestDropdown.value = "computer";
        break;
      case "sign":
        interestDropdown.value = "sign";
        break;
      case "mobility":
        interestDropdown.value = "mobility";
        break;
      case "crafts":
        interestDropdown.value = "crafts";
        break;
      case "counseling":
        interestDropdown.value = "counseling";
        break;
      default:
        interestDropdown.value = "";
    }
  }
}

/**
 * Form Validation and Event Interception
 * Replaces default submission actions with clean custom feedback loops
 */
function initFormHandlers() {
  // 1. Home Page Contact Form
  const homeForm = document.getElementById("homeContactForm");
  if (homeForm) {
    homeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmission(
        homeForm,
        "Thank you for contacting EDAP Pakistan! We will review your query and get back to you shortly.",
      );
    });
  }

  // 2. Main Contact Page Form
  const mainForm = document.getElementById("mainContactForm");
  if (mainForm) {
    mainForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmission(
        mainForm,
        "Your message has been sent successfully! Our campus coordinator at Ida Rieu will contact you soon.",
      );
    });
  }

  // 3. Global Newsletter Forms
  const newsletterForms = document.querySelectorAll("#newsletterForm");
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      alert(
        `Success! ${emailInput.value} has been subscribed to EDAP Pakistan updates.`,
      );
      form.reset();
    });
  });
}

/**
 * Generic Submission Processor
 * Displays confirmation styling and resets form UI components
 */
function handleFormSubmission(formElement, successMessage) {
  // Create an elegant inline status message overlay
  const originalButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = originalButton.innerText;

  // Provide an immediate processing state indicator
  originalButton.innerText = "Processing...";
  originalButton.disabled = true;

  setTimeout(() => {
    // Reset button states
    originalButton.innerText = originalButtonText;
    originalButton.disabled = false;

    // Show elegant browser message banner
    alert(successMessage);

    // Clear inputs safely
    formElement.reset();
  }, 1000); // Simulated network delay for professional presentation
}

/**
 * Map Reset Trigger Engine - Home Window Viewport
 */
function recenterHomeMap() {
  const mapFrame = document.getElementById("homeMapFrame");
  if (mapFrame) {
    const frameSrc = mapFrame.src;
    mapFrame.src = "";
    mapFrame.src = frameSrc;
  }
}

/**
 * Map Reset Trigger Engine - Contact Layout Context
 */
function recenterContactMap() {
  const mapFrame = document.getElementById("contactMapFrame");
  if (mapFrame) {
    const frameSrc = mapFrame.src;
    mapFrame.src = "";
    mapFrame.src = frameSrc;
  }
}
