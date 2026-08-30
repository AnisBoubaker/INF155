(function () {
  "use strict";

  const currentYear = String(new Date().getFullYear());

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = currentYear;
    element.setAttribute("datetime", currentYear);
  });
})();
