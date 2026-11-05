// AI Assessment Catalogue: one card per solution, with search and filters. The Markdown table of
// the page stays the source (partners edit it as usual); this script draws the cards from it and
// hides it. It runs through Material's document$, so it also works after instant navigation.
document$.subscribe(function () {
  var table = document.querySelector(".ai-assessment-table table");
  var cards = document.getElementById("catalogCards");
  if (!table || !cards) return;
  var solutions = drawCards(table, cards);
  table.closest(".ai-assessment-table").hidden = true;
  initSearchAndFilters(table, solutions);
});

// Where each column of the table goes in the card, by its header. A column that is not listed
// (a new one added to the table) goes to the details, so nothing is lost.
var CARD_PLACE = {
  "solution name": "name",
  "provider": "meta",
  "licensing type": "meta",
  "project phase / trl": "meta",
  "domain of application": "lead",
  "ai risk category": "tags",
  "ethical dimensions": "tags"
};

function drawCards(table, container) {
  var headers = Array.prototype.slice.call(table.querySelectorAll("thead th"))
    .map(function (th) { return th.textContent.trim(); });
  var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));

  return rows.map(function (row) {
    var card = document.createElement("article");
    card.className = "cc-cat-card";
    var name = "", meta = [], lead = "", tags = [], details = [];

    Array.prototype.forEach.call(row.cells, function (cell, i) {
      var text = cell.textContent.trim();
      if (!text || text === "—") return;
      var place = CARD_PLACE[(headers[i] || "").toLowerCase()] || "details";
      if (place === "name") name = text;
      else if (place === "meta") meta.push(text);
      else if (place === "lead") lead = text;
      else if (place === "tags") tags = tags.concat(splitValues(text));
      else details.push({ label: headers[i], html: cell.innerHTML });
    });

    var html = '<h3 class="cc-cat-card__name">' + escapeHtml(name) + "</h3>";
    if (meta.length) html += '<p class="cc-cat-card__meta">' + meta.map(escapeHtml).join(" · ") + "</p>";
    if (lead) html += '<p class="cc-cat-card__lead">' + escapeHtml(lead) + "</p>";
    if (tags.length) {
      html += '<ul class="cc-cat-card__tags">' + tags.map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      }).join("") + "</ul>";
    }
    if (details.length) {
      html += '<details class="cc-cat-card__more"><summary>' +
        escapeHtml(details.map(function (d) { return d.label; }).join(", ")) +
        "</summary><dl>" + details.map(function (d) {
          return "<dt>" + escapeHtml(d.label) + "</dt><dd>" + d.html + "</dd>";
        }).join("") + "</dl></details>";
    }
    card.innerHTML = html;
    container.appendChild(card);
    return { card: card, row: row };
  });
}

// A row is shown when it contains the search text AND matches every filter that is set.
// Filters are built from the table: one per column whose values are short labels, with at least
// two different values; a cell such as "Fairness, Robustness" counts as two values.
function initSearchAndFilters(table, solutions) {
  var search = document.getElementById("catalogSearch");
  var toggle = document.getElementById("catalogFiltersToggle");
  var panel = document.getElementById("catalogFilters");
  var count = document.getElementById("catalogCount");
  if (!search || !toggle || !panel || !count) return;

  var headers = Array.prototype.slice.call(table.querySelectorAll("thead th"));
  var MAX_LABEL = 40; // longer values are descriptions, not labels: no filter for that column
  var selects = [];

  headers.forEach(function (th, col) {
    if (col === 0) return; // the solution name: one value per row, the search covers it
    var values = {};
    var usable = solutions.every(function (s) {
      var cell = s.row.cells[col];
      if (!cell) return true;
      return splitValues(cell.textContent).every(function (v) {
        values[v] = true;
        return v.length <= MAX_LABEL;
      });
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
    solutions.forEach(function (s) {
      var ok = !text || s.row.textContent.toLowerCase().indexOf(text) > -1;
      active.forEach(function (sel) {
        var cell = s.row.cells[sel.dataset.column];
        if (ok && (!cell || splitValues(cell.textContent).indexOf(sel.value) === -1)) ok = false;
      });
      s.card.hidden = !ok;
      if (ok) shown++;
    });
    toggle.classList.toggle("cc-cat-toggle--set", active.length > 0);
    count.textContent = shown === solutions.length
      ? solutions.length + " solutions"
      : shown + " of " + solutions.length + " solutions";
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

function splitValues(text) {
  return text.split(",").map(function (v) { return v.trim(); }).filter(Boolean);
}

function escapeHtml(text) {
  return text.replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
