(function () {
  "use strict";

  const query = new URLSearchParams(window.location.search);
  const printMode = query.get("print");
  const isPrintView = query.has("print-pdf");

  if (isPrintView && printMode === "slides") {
    document.documentElement.classList.add("print-slides");
  }

  if (isPrintView && printMode === "notes") {
    document.documentElement.classList.add("print-handout");
  }

  const plugins = [
    window.RevealMarkdown,
    window.RevealHighlight,
    window.RevealNotes,
    window.RevealSearch,
    window.RevealZoom
  ].filter(Boolean);

  Reveal.initialize({
    width: 1280,
    height: 720,
    margin: 0.055,
    minScale: 0.2,
    maxScale: 2,
    controls: true,
    controlsTutorial: false,
    progress: true,
    hash: true,
    history: true,
    center: true,
    slideNumber: "c/t",
    showSlideNumber: "all",
    transition: "fade",
    transitionSpeed: "fast",
    backgroundTransition: "fade",
    navigationMode: "linear",
    pdfSeparateFragments: false,
    plugins
  });

  Reveal.on("ready", function () {
    document.documentElement.classList.add("reveal-ready");

    document.querySelectorAll("a[href^='http']").forEach(function (link) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    if (isPrintView && (printMode === "slides" || printMode === "notes")) {
      preparePrintView(printMode);
    } else {
      addPrintMenu();
    }
  });

  function courseUrl() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  function printUrl(mode) {
    const url = new URL(courseUrl());
    url.searchParams.set("print-pdf", "");
    url.searchParams.set("print", mode);
    return url.href;
  }

  function addPrintMenu() {
    const homeLink = document.querySelector(".deck-home");
    if (homeLink) {
      homeLink.title = "Retour à la liste des cours";
    }

    const menu = document.createElement("details");
    menu.className = "print-menu";
    menu.innerHTML = [
      '<summary aria-label="Options d’impression" title="Imprimer le cours">',
      '  <span class="print-menu-icon" aria-hidden="true"></span>',
      '  <span>Imprimer</span>',
      '</summary>',
      '<div class="print-menu-options">',
      '  <strong>Format d’impression</strong>',
      '  <a class="print-option" data-print-mode="slides" target="_blank" rel="noopener">',
      '    <span>2 diapositives par page</span>',
      '    <small>Format compact · Lettre portrait</small>',
      '  </a>',
      '  <a class="print-option" data-print-mode="notes" target="_blank" rel="noopener">',
      '    <span>Cahier de notes</span>',
      '    <small>Diapositive à gauche · Notes à droite</small>',
      '  </a>',
      '</div>'
    ].join("");

    menu.querySelector('[data-print-mode="slides"]').href = printUrl("slides");
    menu.querySelector('[data-print-mode="notes"]').href = printUrl("notes");
    document.body.appendChild(menu);

    document.addEventListener("click", function (event) {
      if (menu.open && !menu.contains(event.target)) {
        menu.removeAttribute("open");
      }
    });
  }

  function preparePrintView(mode) {
    const pageStyle = document.createElement("style");
    pageStyle.id = "inf155-print-page-size";
    pageStyle.textContent = mode === "notes"
      ? "@page { size: 11in 8.5in; margin: 0; }"
      : "@page { size: 8.5in 11in; margin: 0; }";
    document.head.appendChild(pageStyle);

    const toolbar = document.createElement("nav");
    toolbar.className = "print-toolbar";
    toolbar.setAttribute("aria-label", "Commandes d’impression");
    toolbar.innerHTML = [
      '<a class="print-toolbar-back">← Retour au cours</a>',
      '<span>' + (mode === "notes" ? "Cahier de notes" : "2 diapositives par page") + '</span>',
      '<button type="button">Imprimer</button>'
    ].join("");
    toolbar.querySelector("a").href = courseUrl();
    toolbar.querySelector("button").addEventListener("click", function () {
      window.print();
    });
    document.body.appendChild(toolbar);

    if (mode === "notes") {
      addNoteAreas();
    }
  }

  function addNoteAreas(attempt) {
    const pages = Array.from(document.querySelectorAll(".reveal .slides .pdf-page"));

    if (!pages.length && (attempt || 0) < 120) {
      window.requestAnimationFrame(function () {
        addNoteAreas((attempt || 0) + 1);
      });
      return;
    }

    const course = document.body.dataset.course || "INF155";
    const session = document.body.dataset.session || "Cours";

    pages.forEach(function (page, index) {
      if (page.querySelector(".handout-notes")) {
        return;
      }

      const notes = document.createElement("aside");
      notes.className = "handout-notes";
      notes.setAttribute("aria-label", "Zone de notes");
      notes.innerHTML = [
        '<header>',
        '  <strong>Notes</strong>',
        '  <span>' + course + ' · ' + session + ' · ' + (index + 1) + '/' + pages.length + '</span>',
        '</header>',
        '<div class="handout-note-lines" aria-hidden="true"></div>'
      ].join("");
      page.appendChild(notes);
    });
  }

  document.addEventListener("keydown", function (event) {
    const tag = document.activeElement && document.activeElement.tagName;
    if (event.key.toLowerCase() === "h" && tag !== "INPUT" && tag !== "TEXTAREA") {
      window.location.href = "../../";
    }
  });

  if (window.location.protocol === "file:") {
    const hint = document.createElement("p");
    hint.className = "local-file-hint";
    hint.textContent = "Les fichiers Markdown doivent être servis par HTTP. Consultez le README pour lancer l’aperçu local.";
    document.body.appendChild(hint);
  }
})();
