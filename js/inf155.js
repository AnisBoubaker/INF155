(function () {
  "use strict";

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
  });

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
