// AI Assessment Catalogue. It runs on every page through Material's document$ (also after instant
// navigation, when the body is kept): it sets the page classes on the catalogue and clears them
// everywhere else, then wires the navigation on hover, the search and the filters.
document$.subscribe(function () {
  var body = document.body;
  var isCatalog = !!document.querySelector(".catalog-header");
  body.classList.toggle("catalog-page", isCatalog);
  body.classList.remove("catalog-nav-open");
  if (!isCatalog) return;
  initNavOnHover(body);
  initSearchAndFilters();
});

// Full width page: the navigation slides in when the pointer reaches the arrow on the left.
function initNavOnHover(body) {
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
}

// A row is shown when it contains the search text AND matches every filter that is set.
// Filters are built from the table itself: one per column whose values are short labels; a cell
// such as "Fairness, Robustness" counts as two values.
function initSearchAndFilters() {
  var table = document.querySelector(".ai-assessment-table table");
  var search = document.getElementById("catalogSearch");
  var toggle = document.getElementById("catalogFiltersToggle");
  var panel = document.getElementById("catalogFilters");
  var count = document.getElementById("catalogCount");
  if (!table || !search || !toggle || !panel || !count) return;

  var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
  var headers = Array.prototype.slice.call(table.querySelectorAll("thead th"));
  var MAX_LABEL = 40; // longer values are descriptions, not labels: no filter for that column

  var valuesOf = function (cell) {
    return cell.textContent.split(",").map(function (v) { return v.trim(); }).filter(Boolean);
  };

  var selects = [];
  headers.forEach(function (th, col) {
    if (col === 0) return; // the solution name: one value per row, the search covers it
    var values = {};
    var usable = rows.every(function (row) {
      var cell = row.cells[col];
      if (!cell) return true;
      return valuesOf(cell).every(function (v) { values[v] = true; return v.length <= MAX_LABEL; });
    });
    var list = Object.keys(values).filter(function (v) { return v !== "—"; }).sort();
    if (!usable || list.length < 2) return;

    var label = document.createElement("label");
    label.className = "cc-cat-filter";
    var name = document.createElement("span");
    name.textContent = th.textContent.trim();
    var select = document.createElement("select");
    select.dataset.column = col;
    select.appendChild(new Option("All", ""));
    list.forEach(function (v) { select.appendChild(new Option(v, v)); });
    label.appendChild(name);
    label.appendChild(select);
    panel.appendChild(label);
    selects.push(select);
  });

  if (selects.length) {
    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "cc-cat-reset";
    reset.textContent = "Clear filters";
    reset.addEventListener("click", function () {
      selects.forEach(function (s) { s.value = ""; });
      apply();
    });
    panel.appendChild(reset);
  } else {
    toggle.hidden = true;
  }

  function apply() {
    var text = search.value.trim().toLowerCase();
    var active = selects.filter(function (s) { return s.value; });
    var shown = 0;
    rows.forEach(function (row) {
      var ok = !text || row.textContent.toLowerCase().indexOf(text) > -1;
      active.forEach(function (s) {
        var cell = row.cells[s.dataset.column];
        if (ok && (!cell || valuesOf(cell).indexOf(s.value) === -1)) ok = false;
      });
      row.hidden = !ok;
      if (ok) shown++;
    });
    toggle.classList.toggle("cc-cat-toggle--set", active.length > 0);
    count.textContent = shown === rows.length
      ? rows.length + " solutions"
      : shown + " of " + rows.length + " solutions";
  }

  toggle.addEventListener("click", function () {
    var open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  });
  search.addEventListener("input", apply);
  selects.forEach(function (s) { s.addEventListener("change", apply); });
  apply();
}
