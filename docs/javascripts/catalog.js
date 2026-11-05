// Layout of the AI Assessment Catalogue: full width, with the navigation shown on hover.
// It runs on every page through Material's document$ (also after instant navigation, when the
// body is kept): it sets the page classes on the catalogue and clears them everywhere else.
document$.subscribe(function () {
  var body = document.body;
  var isCatalog = !!document.querySelector(".catalog-header");
  body.classList.toggle("catalog-page", isCatalog);
  body.classList.remove("catalog-nav-open");
  if (!isCatalog) return;

  var primary = document.querySelector(".md-sidebar--primary");
  var toggle = document.querySelector(".catalog-nav-toggle");
  if (!primary || !toggle) return;

  var inside = false;
  var open = function () { body.classList.add("catalog-nav-open"); };
  var close = function () { if (!inside) body.classList.remove("catalog-nav-open"); };

  toggle.addEventListener("mouseenter", function () { inside = true; open(); });
  toggle.addEventListener("mouseleave", function () { inside = false; setTimeout(close, 120); });
  toggle.addEventListener("click", function () { body.classList.toggle("catalog-nav-open"); });
  primary.addEventListener("mouseenter", function () { inside = true; open(); });
  primary.addEventListener("mouseleave", function () { inside = false; setTimeout(close, 150); });
});
