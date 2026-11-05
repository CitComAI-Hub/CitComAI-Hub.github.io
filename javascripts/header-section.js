// The header is kept across instant navigation, so its active section is set here on every page,
// from the marker that main.html writes in the content (none on the home: nothing is active).
document$.subscribe(function () {
  var marker = document.querySelector("[data-md-component=container] [data-cc-section]");
  var section = marker ? marker.getAttribute("data-cc-section") : null;
  document.querySelectorAll(".cc-header__links a[data-cc-section]").forEach(function (link) {
    link.classList.toggle("cc-header__link--active", link.getAttribute("data-cc-section") === section);
  });
});
