// Open links to other sites in a new tab, so readers do not lose their place in the docs.
function openExternalLinksInNewTab() {
  document.querySelectorAll("a[href]").forEach(function (link) {
    if (link.hostname && link.hostname !== window.location.hostname && !link.target) {
      link.target = "_blank";
      link.rel = "noopener";
      link.classList.add("cc-external");
    }
  });
}

if (window.document$) {
  // Material's observable: also runs after instant navigation
  window.document$.subscribe(openExternalLinksInNewTab);
} else {
  document.addEventListener("DOMContentLoaded", openExternalLinksInNewTab);
}
