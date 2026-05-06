(function () {
  "use strict";

  /** Event start: Thursday 28 May 2026, 10:00 AM West Africa Time (Lagos) */
  function getTargetDate() {
    return new Date("2026-05-28T10:00:00+01:00");
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;

    var target = getTargetDate();
    var now = new Date();
    var diff = target.getTime() - now.getTime();

    var daysEl = el.querySelector('[data-unit="days"]');
    var hoursEl = el.querySelector('[data-unit="hours"]');
    var minutesEl = el.querySelector('[data-unit="minutes"]');
    var secondsEl = el.querySelector('[data-unit="seconds"]');

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "0";
      if (hoursEl) hoursEl.textContent = "0";
      if (minutesEl) minutesEl.textContent = "0";
      if (secondsEl) secondsEl.textContent = "0";
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  function initMobileNav() {
    var toggle = document.querySelector(".menu-toggle");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("hidden", "");
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      panel.removeAttribute("hidden");
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu();
    });
  }

  function initRegistrationForm() {
    var form = document.getElementById("registration-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "thank-you.html";
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
  initMobileNav();
  initRegistrationForm();
})();
