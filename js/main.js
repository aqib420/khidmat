/**
 * EDAP Pakistan — Empowering the Differently Abled Persons Pakistan
 * Site-wide JavaScript
 *
 * Responsibilities:
 *   1. Stamp current year in footer
 *   2. Mobile hamburger menu toggle
 *   3. Cross-page query-param routing (?program=computer → preselect)
 *   4. Submit forms to Formspree via fetch with inline success/error states
 *   5. Map iframe recenter helpers
 *
 * Formspree setup:
 *   The form `action` URLs in HTML use the placeholder YOUR_FORMSPREE_ID.
 *   Replace it everywhere after creating the form at https://formspree.io.
 *   See readme.md for the full step-by-step.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initMobileNav();
  initCrossPageRoutings();
  initFormHandlers();
  initLightbox();
});

/* ------------------------------------------------------------------
   Footer · stamp current year
------------------------------------------------------------------ */
function initFooterYear() {
  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ------------------------------------------------------------------
   Mobile navigation · hamburger toggle
------------------------------------------------------------------ */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("primaryNav");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ------------------------------------------------------------------
   Cross-page parameter routing
   If a user clicks "Enroll Now" on programs.html, the contact form
   pre-selects that program option.
------------------------------------------------------------------ */
function initCrossPageRoutings() {
  const interestDropdown = document.getElementById("interestSelect");
  if (!interestDropdown) return;

  const urlParams = new URLSearchParams(window.location.search);
  const programParam = urlParams.get("program");
  if (!programParam) return;

  const allowed = ["computer", "sign", "counseling"];
  if (allowed.includes(programParam)) {
    interestDropdown.value = programParam;
  }
}

/* ------------------------------------------------------------------
   Form handlers · submit to Formspree via fetch
------------------------------------------------------------------ */
function initFormHandlers() {
  initAjaxForm(document.getElementById("homeContactForm"), {
    successMessage:
      "Thank you for contacting EDAP Pakistan. We will review your query and get back to you shortly.",
  });

  initAjaxForm(document.getElementById("mainContactForm"), {
    successMessage:
      "Your message has been sent. The EDAP team will be in touch soon.",
  });

  document.querySelectorAll("#newsletterForm").forEach((form) => {
    initAjaxForm(form, {
      successMessage:
        "You're subscribed. Thanks for supporting EDAP Pakistan.",
      compact: true,
    });
  });
}

function initAjaxForm(form, opts) {
  if (!form) return;

  // Clear a field's error as soon as the user edits it
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.type === "hidden" || field.name === "_gotcha") return;
    const handler = () => {
      if (field.classList.contains("is-invalid")) clearFieldError(field);
    };
    field.addEventListener("input", handler);
    field.addEventListener("change", handler);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot — if filled, it's a bot
    const honeypot = form.querySelector("input[name='_gotcha']");
    if (honeypot && honeypot.value) return;

    // Clear any prior banners + field errors
    form.querySelectorAll(".form-error").forEach((el) => el.remove());
    clearAllFieldErrors(form);

    // Client-side validation — required + valid email
    const errors = validateForm(form);
    if (errors.length > 0) {
      showFieldErrors(form, errors, opts.compact);
      return;
    }

    // If the Formspree ID hasn't been replaced yet, fail loudly in dev
    if (form.action.includes("YOUR_FORMSPREE_ID")) {
      showFormError(
        form,
        "This site isn't connected to a form service yet. Please email us at edap.pakistan@gmail.com."
      );
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending…";
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        const card = buildSuccessCard(form, opts);
        form.parentNode.replaceChild(card, form);
      } else {
        const data = await response.json().catch(() => ({}));
        const reason =
          (data.errors && data.errors.map((e) => e.message).join(", ")) ||
          "Something went wrong. Please try again or email us at edap.pakistan@gmail.com.";
        showFormError(form, reason);
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      showFormError(
        form,
        "We couldn't reach our server. Check your internet connection or email us at edap.pakistan@gmail.com."
      );
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Build the success card shown in place of the form after a successful submit.
 * Includes a summary of what the user sent + a note to screenshot it.
 */
function buildSuccessCard(form, opts) {
  const card = document.createElement("div");
  card.className = opts.compact
    ? "form-success form-success-compact"
    : "form-success form-success-large";
  card.setAttribute("role", "status");

  const heading = document.createElement("div");
  heading.className = "form-success-heading";
  heading.innerHTML =
    '<span class="form-success-icon" aria-hidden="true">✓</span><span>' +
    escapeHtml(opts.successMessage) +
    "</span>";
  card.appendChild(heading);

  // Compact cards (newsletter) skip the summary — just the check + message
  if (opts.compact) return card;

  const summary = buildSubmissionSummary(form);
  if (summary) card.appendChild(summary);

  return card;
}

/**
 * Render a definition-list of what the user submitted, skipping hidden /
 * Formspree-internal fields. SELECT values show their visible label, not the
 * raw value (so "Computer Training (Visually Impaired)" not "computer").
 */
function buildSubmissionSummary(form) {
  const skipFields = ["_subject", "_gotcha", "_replyto", "_next", "_format"];
  const fieldLabels = {
    fullname: "Name",
    email: "Email",
    interest: "Interest",
    message: "Message",
  };

  const entries = [];
  for (const el of form.elements) {
    if (!el.name || skipFields.includes(el.name)) continue;
    if (el.type === "hidden" || el.type === "submit" || el.type === "button") continue;

    let value;
    if (el.tagName === "SELECT") {
      const opt = el.options[el.selectedIndex];
      if (!opt || !opt.value) continue;
      value = opt.text;
    } else if (el.type === "checkbox" || el.type === "radio") {
      if (!el.checked) continue;
      value = el.value;
    } else {
      value = el.value;
    }
    if (!value || !value.toString().trim()) continue;
    const label = fieldLabels[el.name] || el.name;
    entries.push({ label, value: value.toString().trim() });
  }

  if (entries.length === 0) return null;

  const wrap = document.createElement("div");
  wrap.className = "submission-summary";

  const title = document.createElement("h4");
  title.className = "submission-summary-title";
  title.textContent = "Here's what you sent us";
  wrap.appendChild(title);

  const dl = document.createElement("dl");
  dl.className = "submission-summary-list";
  for (const entry of entries) {
    const dt = document.createElement("dt");
    dt.textContent = entry.label;
    const dd = document.createElement("dd");
    dd.textContent = entry.value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
  wrap.appendChild(dl);

  const note = document.createElement("p");
  note.className = "submission-summary-note";
  note.textContent =
    "Please screenshot this confirmation — a copy is not sent to your email.";
  wrap.appendChild(note);

  return wrap;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function showFormError(form, message) {
  const banner = document.createElement("div");
  banner.className = "form-error";
  banner.setAttribute("role", "alert");
  banner.textContent = message;
  form.insertBefore(banner, form.firstChild);
}

/* ------------------------------------------------------------------
   Client-side form validation
------------------------------------------------------------------ */
function validateForm(form) {
  const errors = [];
  const fields = form.querySelectorAll("input, textarea, select");

  fields.forEach((field) => {
    // Skip non-user-visible fields
    if (
      field.type === "hidden" ||
      field.type === "submit" ||
      field.type === "button" ||
      field.name === "_gotcha"
    ) {
      return;
    }

    const value = (field.value || "").trim();

    // Required check (treats whitespace-only input as empty)
    if (field.required && !value) {
      errors.push({
        field,
        message: `${getFieldLabel(field)} is required.`,
      });
      return;
    }

    // Email format check
    if (field.type === "email" && value && !isValidEmail(value)) {
      errors.push({
        field,
        message: "Please enter a valid email address.",
      });
    }
  });

  return errors;
}

function isValidEmail(str) {
  // Pragmatic email regex — catches typos but doesn't try to enforce RFC 5322
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

function getFieldLabel(field) {
  if (field.id) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    if (label && label.textContent.trim()) {
      return label.textContent.trim();
    }
  }
  return field.placeholder || field.name || "This field";
}

function showFieldErrors(form, errors, compact) {
  if (compact) {
    // Single banner under the form (used by the newsletter pill)
    const banner = document.createElement("p");
    banner.className = "form-error-compact";
    banner.setAttribute("role", "alert");
    banner.textContent = errors[0].message;
    form.parentNode.insertBefore(banner, form.nextSibling);
    errors[0].field.classList.add("is-invalid");
    errors[0].field.setAttribute("aria-invalid", "true");
    errors[0].field.focus();
    return;
  }

  // Inline per-field errors for the bigger forms
  errors.forEach(({ field, message }) => {
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");

    const msg = document.createElement("p");
    msg.className = "field-error";
    msg.setAttribute("role", "alert");
    msg.textContent = message;
    field.parentNode.insertBefore(msg, field.nextSibling);
  });

  errors[0].field.focus();
}

function clearAllFieldErrors(form) {
  form.querySelectorAll(".field-error").forEach((el) => el.remove());
  form.querySelectorAll(".is-invalid").forEach((el) => {
    el.classList.remove("is-invalid");
    el.removeAttribute("aria-invalid");
  });
  // Compact error banner sits OUTSIDE the form
  const next = form.nextElementSibling;
  if (next && next.classList && next.classList.contains("form-error-compact")) {
    next.remove();
  }
}

function clearFieldError(field) {
  field.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
  const next = field.nextElementSibling;
  if (next && next.classList && next.classList.contains("field-error")) {
    next.remove();
  }
  // Also clear any compact banner if this is a newsletter form
  const form = field.closest("form");
  if (form) {
    const after = form.nextElementSibling;
    if (after && after.classList && after.classList.contains("form-error-compact")) {
      after.remove();
    }
  }
}

/* ------------------------------------------------------------------
   Lightbox · click a photo in .photo-gallery to enlarge it
------------------------------------------------------------------ */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = document.getElementById("lightboxImage");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || "";
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightbox.hidden = true;
      imgEl.src = "";
    }, 250);
  };

  triggers.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const img = link.querySelector("img");
      open(link.getAttribute("href"), img ? img.alt : "");
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
}

/* ------------------------------------------------------------------
   Map · recenter helpers (reload the iframe)
------------------------------------------------------------------ */
function recenterHomeMap() {
  reloadIframe("homeMapFrame");
}
function recenterContactMap() {
  reloadIframe("contactMapFrame");
}
function reloadIframe(id) {
  const frame = document.getElementById(id);
  if (!frame) return;
  const src = frame.src;
  frame.src = "";
  frame.src = src;
}
