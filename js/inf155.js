(function () {
  "use strict";

  const query = new URLSearchParams(window.location.search);
  const printMode = query.get("print");
  const isPrintView = query.has("print-pdf");
  const copyrightText = "Copyright Anis Boubaker, 2017-" + new Date().getFullYear();

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

    addDeckCopyright();

    if (isPrintView && (printMode === "slides" || printMode === "notes")) {
      preparePrintView(printMode);
    } else if (isPrintView) {
      decoratePrintPages();
    } else {
      addPrintMenu();
      addDeckNavigation();
    }
  });

  function addDeckCopyright() {
    const copyright = document.createElement("small");
    copyright.className = "deck-copyright";
    copyright.textContent = copyrightText;
    document.body.appendChild(copyright);
  }

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

  function addDeckNavigation() {
    const slides = Reveal.getSlides();
    const deckLabel = document.querySelector(".deck-label");

    if (!slides.length || !deckLabel) {
      return;
    }

    const courseTitle = cleanText(deckLabel);
    const sections = collectDeckSections(slides);
    const toggle = document.createElement("button");
    const panel = document.createElement("aside");
    const panelHeader = document.createElement("header");
    const panelTitle = document.createElement("div");
    const panelNav = document.createElement("nav");
    const closeButton = document.createElement("button");
    const slideButtons = [];

    toggle.type = "button";
    toggle.className = "deck-outline-toggle";
    toggle.setAttribute("aria-controls", "deck-outline");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Afficher la liste des diapositives");
    toggle.title = "Liste des diapositives";
    toggle.innerHTML = [
      '<span class="deck-outline-icon" aria-hidden="true">',
      '  <i></i><i></i><i></i>',
      '</span>'
    ].join("");

    panel.id = "deck-outline";
    panel.className = "deck-outline";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Liste des diapositives");

    panelHeader.className = "deck-outline-header";
    panelTitle.innerHTML = [
      "<strong>Diapositives</strong>",
      "<span>" + slides.length + " au total</span>"
    ].join("");
    closeButton.type = "button";
    closeButton.className = "deck-outline-close";
    closeButton.setAttribute("aria-label", "Fermer la liste des diapositives");
    closeButton.textContent = "×";
    panelHeader.append(panelTitle, closeButton);

    panelNav.className = "deck-outline-nav";
    panelNav.setAttribute("aria-label", "Navigation dans le cours");

    sections.forEach(function (section) {
      const group = document.createElement("section");
      const heading = document.createElement("h2");
      const list = document.createElement("ol");

      group.className = "deck-outline-section";
      heading.textContent = section.title;
      list.start = section.startIndex + 1;

      section.slides.forEach(function (slide, localIndex) {
        const slideIndex = slides.indexOf(slide);
        const indices = Reveal.getIndices(slide);
        const item = document.createElement("li");
        const button = document.createElement("button");
        const number = document.createElement("span");
        const title = document.createElement("span");

        button.type = "button";
        button.dataset.slideIndex = String(slideIndex);
        button.dataset.slideH = String(indices.h || 0);
        button.dataset.slideV = String(indices.v || 0);
        number.className = "deck-outline-number";
        number.textContent = String(slideIndex + 1).padStart(2, "0");
        title.className = "deck-outline-title";
        title.textContent = slideTitle(slide, slideIndex);
        button.append(number, title);

        if (localIndex === 0) {
          const start = document.createElement("span");
          button.classList.add("is-section-start");
          start.className = "deck-outline-start";
          start.textContent = "Début";
          button.appendChild(start);
        }

        button.addEventListener("click", function () {
          Reveal.slide(Number(button.dataset.slideH), Number(button.dataset.slideV));
          closeOutline(true);
        });

        item.appendChild(button);
        list.appendChild(item);
        slideButtons.push(button);
      });

      group.append(heading, list);
      panelNav.appendChild(group);
      section.element = group;
    });

    panel.append(panelHeader, panelNav);
    document.body.append(toggle, panel);

    function openOutline() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      syncNavigation(true);
      closeButton.focus();
    }

    function closeOutline(returnFocus) {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) {
        toggle.focus();
      }
    }

    function syncNavigation(scrollToCurrent) {
      const currentSlide = Reveal.getCurrentSlide();
      const currentIndex = slides.indexOf(currentSlide);
      const currentSection = sections.find(function (section) {
        return section.slides.includes(currentSlide);
      });

      slideButtons.forEach(function (button) {
        const isCurrent = Number(button.dataset.slideIndex) === currentIndex;
        button.classList.toggle("is-current", isCurrent);
        if (isCurrent) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });

      sections.forEach(function (section) {
        section.element.classList.toggle("is-current", section === currentSection);
      });

      deckLabel.textContent = currentSection
        ? courseTitle + " — " + currentSection.title
        : courseTitle;
      deckLabel.title = deckLabel.textContent;

      if (scrollToCurrent && !panel.hidden) {
        const currentButton = slideButtons[currentIndex];
        if (currentButton) {
          currentButton.scrollIntoView({ block: "nearest" });
        }
      }
    }

    toggle.addEventListener("click", function () {
      if (panel.hidden) {
        openOutline();
      } else {
        closeOutline(false);
      }
    });

    closeButton.addEventListener("click", function () {
      closeOutline(true);
    });

    document.addEventListener("click", function (event) {
      if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) {
        closeOutline(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) {
        event.preventDefault();
        closeOutline(true);
      }
    });

    Reveal.on("slidechanged", function () {
      syncNavigation(!panel.hidden);
    });
    syncNavigation(false);
  }

  function collectDeckSections(slides) {
    const sections = [];

    slides.forEach(function (slide, index) {
      const startsSection = slide.classList.contains("title-slide") ||
        slide.classList.contains("chapter");
      let section = sections[sections.length - 1];

      if (!section || startsSection) {
        section = {
          startIndex: index,
          slides: []
        };
        sections.push(section);
      }

      section.slides.push(slide);
    });

    sections.forEach(function (section, index) {
      section.title = sectionTitle(section.slides[0], index);
    });

    return sections;
  }

  function sectionTitle(slide, index) {
    const kicker = slide.querySelector(".section-kicker");
    const heading = slide.querySelector("h1, h2");

    if (slide.classList.contains("title-slide")) {
      return "Introduction";
    }

    return cleanText(kicker) || cleanText(heading) || "Section " + (index + 1);
  }

  function slideTitle(slide, index) {
    const heading = slide.querySelector("h1, h2");
    const kicker = slide.querySelector(".section-kicker, .eyebrow");
    return cleanText(heading) || cleanText(kicker) || "Diapositive " + (index + 1);
  }

  function cleanText(element) {
    return element ? element.textContent.replace(/\s+/g, " ").trim() : "";
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

    decoratePrintPages(mode);
  }

  function decoratePrintPages(mode, attempt) {
    const pages = Array.from(document.querySelectorAll(".reveal .slides .pdf-page"));

    if (!pages.length && (attempt || 0) < 120) {
      window.requestAnimationFrame(function () {
        decoratePrintPages(mode, (attempt || 0) + 1);
      });
      return;
    }

    const course = document.body.dataset.course || "INF155";
    const session = document.body.dataset.session || "Cours";

    pages.forEach(function (page, index) {
      if (!page.querySelector(".print-copyright")) {
        const copyright = document.createElement("small");
        copyright.className = "print-copyright";
        copyright.textContent = copyrightText;
        page.appendChild(copyright);
      }

      if (mode !== "notes" || page.querySelector(".handout-notes")) {
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
